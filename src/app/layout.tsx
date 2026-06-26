import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Osman | Software Engineer & Mobile Developer",
  description: "Professional portfolio and admin dashboard of Ahmed Osman, specializing in Full-Stack Mobile Development and Software Engineering.",
  icons: {
    icon: "/uploads/icon.png?v=3",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}