import { SITE_URL, SITE_NAME, INQUIRY_EMAIL } from "@/lib/constants";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema({ campaign = false }: { campaign?: boolean } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/evanactionweb.png`,
        description: campaign
          ? "Individualized strength, nutrition, and accountability coaching for busy adults. Join the Cooper Fitness founding cohort for 12 weeks of coaching at a one-time USD $399 rate."
          : "Online fitness and weight loss coaching for busy parents starting from zero. Simple programs, weekly check-ins, and a coach in your corner.",
        email: INQUIRY_EMAIL,
        founder: {
          "@type": "Person",
          name: "Evan Cooper",
        },
        sameAs: [
          "https://instagram.com/_cooperfitness",
          "https://youtube.com/@cooperfitness",
          "https://twitter.com/cooperfitnessx",
        ],
      }}
    />
  );
}

export function PersonSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Evan Cooper",
        jobTitle: "Online Fitness Coach",
        url: `${SITE_URL}/about`,
        worksFor: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        description:
          "Evan Cooper is an online fitness coach specializing in beginner-friendly strength training, weight loss, and accountability coaching for busy parents.",
        sameAs: [
          "https://instagram.com/_cooperfitness",
          "https://youtube.com/@cooperfitness",
          "https://twitter.com/cooperfitnessx",
        ],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      }}
    />
  );
}

export function FAQSchema({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function ReviewSchema({
  reviews,
}: {
  reviews: { name: string; role: string; quote: string; rating: number }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        review: reviews.map((r) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: r.name,
          },
          reviewBody: r.quote,
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        areaServed: "Worldwide",
        serviceType: "Online Fitness Coaching",
      }}
    />
  );
}
