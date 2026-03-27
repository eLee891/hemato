import { notFound } from "next/navigation";

// 실제로는 여기서 워드프레스 API나 DB에서 데이터를 가져와야 합니다.
async function getPageData(slug: string) {
  // 예시: 워드프레스 REST API 호출 (나중에 설정에 맞춰 수정 가능)
  // const res = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/pages?slug=${slug}`);
  // const data = await res.json();
  // return data[0];
  
  // 지금은 테스트를 위해 임시 데이터를 반환하도록 설정합니다.
  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    content: `This is the content for the ${slug} page.`
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-8">
        {page.title}
      </h1>
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
        {/* dangerouslySetInnerHTML은 워드프레스에서 가져온 HTML을 렌더링할 때 사용합니다. */}
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </main>
  );
}