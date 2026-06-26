import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  headingLevel?: "h1" | "h2";
};

export function Section({
  id,
  label,
  title,
  description,
  children,
  className,
  headingLevel: Heading = "h2",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 relative z-10", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(label || title || description) && (
          <div className="mb-10 md:mb-14">
            {label && <p className="section-label mb-4">{label}</p>}
            {title && (
              <Heading
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "var(--foreground)",
                }}
              >
                {title}
              </Heading>
            )}
            {description && (
              <p className="mt-4 max-w-md" style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
