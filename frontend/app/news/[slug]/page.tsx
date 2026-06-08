import NewsDetail from "@/modules/news/components/NewsDetail";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  return (
    <NewsDetail
      slug={slug}
    />
  );
}