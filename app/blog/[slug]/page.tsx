import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  content: string;
  author: string;
  tags: string | null;
  published_at: string | null;
  created_at: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${process.env.CRM_URL || "https://services.mendsourcing.com"}/api/blog?site=mend&published=true&slug=${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | MeND Blog`,
    description: post.excerpt || post.title,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="relative">
        {post.cover_image && (
          <div className="relative h-[400px] overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          </div>
        )}
        <div
          className={`${post.cover_image ? "absolute bottom-0 left-0 right-0" : "bg-gradient-to-b from-[#111] to-[#0a0a0a] pt-16"} px-6 md:px-15 pb-12`}
        >
          <div className="max-w-3xl mx-auto">
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="text-[10px] uppercase tracking-wider text-[#03ACED] bg-[#03ACED]/10 px-2.5 py-1 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#999]">
              <span>{post.author}</span>
              <span>&middot;</span>
              <span>
                {formatDate(post.published_at || post.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 px-6 md:px-15">
        <div className="max-w-3xl mx-auto">
          <BlogContent content={post.content} />
        </div>
      </article>

      {/* Back */}
      <div className="px-6 md:px-15 pb-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-[#03ACED] text-sm font-semibold hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
