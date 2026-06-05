declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", name, params);
  }
}
