import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { blogPosts } from "@/lib/blog/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Expert insights on fitness, nutrition, habit formation, and online coaching from Cooper Fitness.",
  path: "/blog",
});

export default function BlogPage() {
  const breadcrumbs = [{ name: "Blog", href: "/blog" }];

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Expert insights on fitness, nutrition, and building lasting habits.
        </p>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {post.category}
                    </Badge>
                    <CardTitle className="mt-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Apply What You've Learned?"
        description="Book a free consultation and get a personalized plan built around your goals."
        buttonText="Book Free Consultation"
      />
    </div>
  );
}
