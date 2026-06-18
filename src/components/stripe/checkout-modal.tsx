"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  tierId: string;
  tierName: string;
  tierPrice: number;
  tierBillingAmount: number;
}

function CheckoutForm({
  tierName,
  tierPrice,
  tierBillingAmount,
  tierId,
  onSuccess,
}: {
  tierName: string;
  tierPrice: number;
  tierBillingAmount: number;
  tierId: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setError(submitErr.message || "Payment failed.");
      setLoading(false);
      return;
    }

    const { error: paymentErr, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pricing?success=true`,
        payment_method_data: {
          billing_details: {
            name,
            email,
            phone,
          },
        },
      },
      redirect: "if_required",
    });

    if (paymentErr) {
      setError(paymentErr.message || "Payment failed.");
    } else {
      fetch("/api/notify-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId,
          paymentIntentId: paymentIntent?.id,
          name,
          email,
          phone,
        }),
      }).catch(() => {});
      onSuccess();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="rounded-sm border border-border bg-card p-4">
        <p className="text-sm font-bold uppercase">{tierName}</p>
        <p className="text-xl font-bold">${tierPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
          ${tierBillingAmount} billed today
        </p>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />
      </div>

      <PaymentElement />

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={!stripe || loading}>
        {loading ? "PROCESSING..." : `PAY $${tierBillingAmount}`}
      </Button>
    </form>
  );
}

export function CheckoutModal({
  open,
  onClose,
  tierId,
  tierName,
  tierPrice,
  tierBillingAmount,
}: CheckoutModalProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError(null);
      setComplete(false);
      setClientSecret(null);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);
          setClientSecret(data.clientSecret);
        })
        .catch((err) => {
          setError(
            err instanceof Error ? err.message : "Failed to load checkout."
          );
        })
        .finally(() => setLoading(false));
    }
  }, [open, tierId]);

  function handleClose() {
    setClientSecret(null);
    setComplete(false);
    setError(null);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase">
            {complete ? "WELCOME ABOARD" : "CHECKOUT"}
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading checkout…
          </p>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-destructive">{error}</p>
        )}

        {complete && (
          <div className="py-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Payment successful. Evan will reach out within 24 hours to get you
              started on the {tierName} plan.
            </p>
            <Button onClick={handleClose}>CLOSE</Button>
          </div>
        )}

        {clientSecret && stripePromise && !complete && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#4a6fff",
                  colorBackground: "#1c1b1c",
                  colorText: "#ffffff",
                  colorDanger: "#ef4444",
                  fontFamily: "Archivo Narrow, sans-serif",
                  borderRadius: "4px",
                },
              },
            }}
          >
            <CheckoutForm
              tierName={tierName}
              tierPrice={tierPrice}
              tierBillingAmount={tierBillingAmount}
              tierId={tierId}
              onSuccess={() => setComplete(true)}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
