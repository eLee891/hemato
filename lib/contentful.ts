import { createClient } from 'contentful';

// This initializes the 'client' variable that was missing
export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export async function getEvents() {
  try {
    const response = await client.getEntries({
      content_type: 'event', 
      order: ['fields.date'] as any, 
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled Event",
      date: item.fields.date, 
      // Ensure these match your Contentful field IDs exactly
      time: item.fields.time || "TBD", 
      image: item.fields.image?.fields?.file?.url 
        ? `https:${item.fields.image.fields.file.url}` 
        : null, 
    }));
  } catch (error) {
    console.error("Contentful Fetch Error:", error);
    return [];
  }
}