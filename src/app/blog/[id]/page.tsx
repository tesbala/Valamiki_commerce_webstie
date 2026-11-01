import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getBlogPost, getBlogPosts } from "@/lib/firestore/blog";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description?.slice(0, 160) || undefined,
    openGraph: post.imageUrl ? { images: [{ url: post.imageUrl }] } : undefined,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ id: p.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero image */}
      {post.imageUrl && (
        <div className="h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-primary-100">
          <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">

          {/* Back */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Blog
          </Link>

          {/* Post card */}
          <article className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
            {!post.imageUrl && (
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
                <FileText className="size-6 text-ink-300" />
              </div>
            )}

            <h1 className="font-display text-2xl font-bold text-ink-900 leading-snug sm:text-3xl">
              {post.title}
            </h1>

            <div className="mt-3 h-px w-12 bg-gradient-gold" aria-hidden />

            <div className="mt-3 flex items-center gap-2 text-xs text-ink-300">
              <CalendarDays className="size-3.5" />
              <span>{post.dateLabel}</span>
            </div>

            {post.description && (
              <div className="mt-6 text-sm leading-loose text-ink-700 whitespace-pre-wrap">
                {post.description}
              </div>
            )}
          </article>

          {/* Back link bottom */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-colors"
            >
              ← All posts
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
