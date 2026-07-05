import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowBridge CRM",
  description:
    "Occupation-adaptive CRM for lead-heavy service businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
