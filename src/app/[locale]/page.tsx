import HomePage from "@/components/HomePage";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return <HomePage locale={locale as "en" | "zh"} />;
}
