import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { blogPosts, getBlogPost } from "@/lib/blog/posts";
import { Badge } from "@/components/ui/badge";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);
    if (!post) return {};

    return generatePageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
    });
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Evan Cooper",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-12">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <CTASection />
    </div>
  );
}
