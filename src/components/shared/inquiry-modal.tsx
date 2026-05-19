"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function InquiryModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          goals: data.get("goals"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Your Journey</DialogTitle>
          <DialogDescription>
            Fill out the form below and Evan will be in touch within 24 hours.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground" role="status">
              Thanks — Evan will be in touch within 24 hours.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setSubmitted(false);
                setOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                aria-label="Your name"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                aria-label="Email"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="goals" className="text-sm font-medium">
                Your goals
              </label>
              <Textarea
                id="goals"
                name="goals"
                placeholder="Your goals"
                required
                aria-label="Your goals"
                disabled={loading}
                rows={4}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending…" : "Send inquiry"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
