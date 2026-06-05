"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/shared/section";
import { FAQSchema } from "@/components/seo/schema";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection({
  items,
  title = "FREQUENTLY ASKED QUESTIONS",
  description,
  headingLevel,
}: {
  items: FAQItem[];
  title?: string;
  description?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <Section label="FAQ" title={title} description={description} headingLevel={headingLevel}>
      <FAQSchema items={items} />
      <div className="mx-auto max-w-3xl divide-y divide-border">
        {items.map((item) => (
          <FAQAccordion key={item.question} item={item} />
        ))}
      </div>
    </Section>
  );
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <h3 className="text-lg font-bold uppercase">{item.question}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      )}
    </div>
  );
}
