import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full border-border transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(46,91,255,0.1)]">
        <CardContent className="pt-6">
          <h3 className="flex items-center justify-between text-lg font-bold uppercase">
            {title}
            <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
