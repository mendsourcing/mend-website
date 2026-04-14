"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-black tracking-tight mt-10 mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold tracking-tight mt-8 mb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mt-6 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-[#ccc] leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[#03ACED] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 space-y-1 text-[#ccc]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-1 text-[#ccc]">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#03ACED] pl-4 my-4 text-[#bbb] italic">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-[#03ACED]">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-white/[0.05] border border-white/10 rounded-lg p-4 mb-4 overflow-x-auto text-sm">
            {children}
          </pre>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),
        hr: () => <hr className="border-white/10 my-8" />,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ""}
            className="rounded-xl my-6 w-full"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
