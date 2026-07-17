import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

// Visual breadcrumb nav only. The BreadcrumbList JSON-LD lives in
// BreadcrumbSchema (components/seo/schema.tsx) — pages render both, and
// emitting schema here too produced duplicate structured data.
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === allItems.length - 1 ? (
                <span className="text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
