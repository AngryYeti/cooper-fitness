import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
};

export function Section({
  id,
  label,
  title,
  description,
  children,
  className,
  muted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        muted && "bg-muted/30",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(label || title || description) && (
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              {label && <p className="section-label">{label}</p>}
              {title && (
                <h2 className="text-balance text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {title}
                </h2>
              )}
            </div>
            {description && (
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
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
