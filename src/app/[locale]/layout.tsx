import HtmlLangSetter from "@/components/HtmlLangSetter";

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
      {children}
    </>
  );
}
