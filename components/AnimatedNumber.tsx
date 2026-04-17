"use client";

import { useEffect, useRef, useState } from "react";

type Format = "comma" | "dollar" | "decimal";

interface Props {
  /** Target value to count up to */
  to: number;
  /** Optional prefix (e.g. "$") */
  prefix?: string;
  /** Optional suffix (e.g. "+", "M", " hrs/day") */
  suffix?: string;
  /** Display format for the running number */
  format?: Format;
  /** Decimal places (only used with format="decimal") */
  decimals?: number;
  /** Animation duration in ms — default 1800 */
  durationMs?: number;
  /** Delay before starting (ms) */
  delayMs?: number;
  /** IntersectionObserver rootMargin — start slightly before fully in view */
  rootMargin?: string;
  /** Extra className */
  className?: string;
}

/**
 * AnimatedNumber — smoothly counts from 0 to `to` with easeOutQuint,
 * triggering when the element first scrolls into view.
 *
 * Respects prefers-reduced-motion (snaps straight to the value).
 * No dependencies — pure React + requestAnimationFrame + IntersectionObserver.
 */
export default function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
  format = "comma",
  decimals = 1,
  durationMs = 1800,
  delayMs = 0,
  rootMargin = "0px 0px -10% 0px",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(to);
      return;
    }

    const start = () => {
      if (started.current) return;
      started.current = true;
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
      let rafId: number | null = null;
      let startTs: number | null = null;

      const tick = (now: number) => {
        if (startTs === null) startTs = now;
        const elapsed = now - startTs - delayMs;
        if (elapsed < 0) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(elapsed / durationMs, 1);
        setDisplay(to * easeOutQuint(progress));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(to);
        }
      };
      rafId = requestAnimationFrame(tick);

      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.unobserve(entry.target);
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs, delayMs, rootMargin]);

  const formatted = (() => {
    if (format === "dollar") {
      if (to >= 1_000_000) {
        return `${(display / 1_000_000).toFixed(decimals)}M`;
      }
      if (to >= 1_000) {
        return `${(display / 1_000).toFixed(0)}K`;
      }
      return `${Math.round(display)}`;
    }
    if (format === "decimal") {
      return display.toFixed(decimals);
    }
    return new Intl.NumberFormat("en-US").format(Math.round(display));
  })();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
