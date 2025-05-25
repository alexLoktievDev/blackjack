export {};

declare global {
  function gtag(type: string, name: string, params?: Record<string, any>): void;

  interface Window {
    dataLayer: any[];
    gtag: typeof gtag;
  }
}
