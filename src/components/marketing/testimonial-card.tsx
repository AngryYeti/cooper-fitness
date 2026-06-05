import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  role,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4 flex gap-1" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <blockquote className="mb-4 text-muted-foreground leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <p className="font-bold uppercase">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
