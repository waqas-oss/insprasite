import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inspra.ai | AI Voice Agents for Modern Teams",
  description:
    "Premium AI voice agents, chat automation, CRM sync, and customer support workflows for service businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
