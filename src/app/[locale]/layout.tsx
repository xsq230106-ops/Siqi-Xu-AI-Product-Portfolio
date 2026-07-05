import HtmlLangSetter from "@/components/HtmlLangSetter";
import ThemeProvider from "@/components/ThemeProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <HtmlLangSetter lang={locale} />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
