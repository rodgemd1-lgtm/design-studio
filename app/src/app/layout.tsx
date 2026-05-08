import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIG Design Studio",
  description: "Design intelligence platform — reverse-engineered from top sites, YouTube, and GitHub",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0c] text-[#faf9f7] antialiased">
        {children}
      </body>
    </html>
  );
}