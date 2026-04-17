"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface RevealProps {
  children: React.ReactNode;
  /** fade-up direction — default "up" */
  direction?: Direction;
  /** ms delay before starting (useful for stagger) */
  delay?: number;
  /** ms duration of the reveal */
  duration?: number;
  /** pixels to translate from — default 32 */
  distance?: number;
  /** run once then stop (default true) */
  once?: boolean;
  /** IntersectionObserver rootMargin — trigger slightly before fully in view */
  rootMargin?: string;
  /** extra className */
  className?: string;
  /** render as tag — default div */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal — fades + slides child content in when it enters the viewport.
 * Zero dependencies. Pure IntersectionObserver + CSS transforms.
 * Respects prefers-reduced-motion (snaps to final state, no animation).
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 32,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (r) {
      setReduce(true);
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  const offset = (() => {
    if (reduce) return "translate3d(0,0,0)";
    if (visible) return "translate3d(0,0,0)";
    switch (direction) {
      case "up": return `translate3d(0,${distance}px,0)`;
      case "down": return `translate3d(0,-${distance}px,0)`;
      case "left": return `translate3d(${distance}px,0,0)`;
      case "right": return `translate3d(-${distance}px,0,0)`;
      case "fade": default: return "translate3d(0,0,0)";
    }
  })();

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: offset,
    transition: reduce
      ? undefined
      : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: reduce ? undefined : "opacity, transform",
  };

  // TS: cast to the right element type for ref
  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {children}
    </Component>
  );
}
