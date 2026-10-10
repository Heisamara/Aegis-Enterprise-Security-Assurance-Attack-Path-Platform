import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis — Enterprise Security Assurance",
  description: "Continuously map exposure, prove resilience, and close attack paths that matter.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Aegis — Enterprise Security Assurance",
    description: "Enterprise security assurance, made actionable.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis — Enterprise Security Assurance",
    description: "Enterprise security assurance, made actionable.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
