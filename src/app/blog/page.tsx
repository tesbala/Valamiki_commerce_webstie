import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getBlogPosts } from "@/lib/firestore/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, updates, and stories from Valmiki Online Service — Salem's favourite grocery & stationery store.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <Container className="py-10 sm:py-14 text-center">
          <span className="eyebrow mb-3 block">From the Store</span>
          <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">Our Blog</h1>
          <div className="mx-auto mt-4 h-px w-14 bg-gradient-gold" aria-hidden />
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-500">
            Tips, updates, and stories from Valmiki Online Service.
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <FileText className="mx-auto mb-4 size-10 text-ink-300" />
            <p className="font-display text-lg font-semibold text-ink-500">No posts yet</p>
            <p className="mt-1 text-sm text-ink-300">Check back soon — we&apos;re writing something for you.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-medium overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 bg-primary-100 overflow-hidden">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-ink-300">
                      <FileText className="size-10" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-base font-bold text-ink-900 leading-snug line-clamp-2 group-hover:text-secondary-700 transition-colors">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 text-sm text-ink-500 leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-300">{post.dateLabel}</span>
                    <span className="text-xs font-semibold text-secondary-600 group-hover:text-secondary-700 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
