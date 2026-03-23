// 만약 npm install he 가 가능하다면 라이브러리 사용을 추천하지만, 
// 여기서는 순수 자바스크립트 개선 버전을 드립니다.

export async function getCleanArticles() {
  const WP_API_URL = "https://hematoinstitute.org/graphql";

  const targetSlugs = [
    "a-return-to-ancient-grains", "the-preventative-effects-of-cruciferous-vegetables-on-cancers-dementia-and-their-toxicities",
    "health-effects-of-the-japanese-nuclear-accident", "boosting-immunity-with-green-tea",
    "caffeine-in-green-tea-and-coffee", "30087-2", "green-tea-and-the-kidneys",
    "the-benefits-of-green-tea-and-exercise", "gluten-free-diet-is-this-the-right-solution-to-a-healthier-life",
    "effects-of-green-tea-on-cholesterol", "30063-2", "how-green-tea-affects-blood-pressure",
    "food-additives-and-preservatives", "anomalous-and-unique-properties-of-water"
  ];

  // ✅ 개선: 서버 단계에서 필요한 슬러그만 필터링해서 가져옵니다.
  const query = `
    query GetArticles($slugs: [String]) {
      posts(where: { nameIn: $slugs }, first: 50) {
        nodes {
          title
          slug
          date
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(WP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query,
        variables: { slugs: targetSlugs } // 변수 전달
      }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    const filteredPosts = json.data.posts.nodes;

    // ✅ 텍스트 정제 헬퍼 함수
    const cleanText = (html: string) => {
      if (!html) return "";
      return html
        .replace(/&[#a-zA-Z0-9]+;/g, (entity) => {
          const entities: Record<string, string> = {
            '&#8211;': '–', '&#8217;': '’', '&#8220;': '“', '&#8221;': '”',
            '&amp;': '&', '&nbsp;': ' ', '&#8230;': '...'
          };
          return entities[entity] || entity;
        })
        .replace(/\[\/?[^\]]+\]/g, "") // 쇼트코드 제거
        .replace(/<[^>]*>/g, "")       // HTML 태그 제거
        .replace(/\s+/g, " ")          // 공백 정규화
        .trim();
    };

    return filteredPosts.map((post: any) => {
      const plainContent = cleanText(post.content);
      const plainExcerpt = cleanText(post.excerpt);

      // 요약문이 너무 짧으면 본문에서 추출
      const previewText = plainExcerpt.length > 20 
        ? plainExcerpt 
        : plainContent.slice(0, 250);

      return {
        ...post,
        title: cleanText(post.title),
        excerpt: previewText.slice(0, 200) + "...",
        // 본문은 쇼트코드만 제거하고 HTML 구조는 유지하고 싶을 경우를 대비
        content: post.content.replace(/\[\/?[^\]]+\]/g, "") 
      };
    });
  } catch (error) {
    console.error("WP Error:", error);
    return [];
  }
}