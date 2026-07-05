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
    <html lang="en" suppressHydrationWarning className="bg-stone-50 dark:bg-stone-950">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme');
            if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (t === 'dark') document.documentElement.classList.add('dark');
          } catch(e) {}
        `}} />
      </head>
      <body className="bg-stone-50 dark:bg-stone-950 text-slate-800 dark:text-stone-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
