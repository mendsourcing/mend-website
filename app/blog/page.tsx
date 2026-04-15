import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";

export const metadata = {
  title: "Blog | MeND Sourcing Solutions",
  description: "Insights, updates, and resources on government contracting, procurement, and supply chain from MeND Sourcing Solutions.",
};

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  tags: string | null;
  published_at: string | null;
  created_at: string;
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${process.env.CRM_URL || "https://services.mendsourcing.com"}/api/blog?site=mend&published=true`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Hero
        title="Blog"
        subtitle="Insights and updates on government contracting, procurement, and supply chain."
      />

      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-[#bbb]">
                We&apos;re working on bringing you valuable insights on government contracting. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#03ACED]/30 hover:-translate-y-1 transition-all"
                >
                  {post.cover_image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.split(",").slice(0, 3).map((tag) => (
                          <span
                            key={tag.trim()}
                            className="text-[10px] uppercase tracking-wider text-[#03ACED] bg-[#03ACED]/10 px-2 py-0.5 rounded"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-lg font-bold mb-2 group-hover:text-[#03ACED] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[#bbb] leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-[#999]">
                      <span>{post.author}</span>
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
