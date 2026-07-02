import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siqi Xu — AI Product Portfolio",
  description: "AI Product Manager & NLP Engineer portfolio",
 };
 
 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-slate-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
