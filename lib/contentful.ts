import { createClient } from "contentful";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export async function getEvents() {
  try {
    const response = await client.getEntries({ 
      content_type: 'event', 
      order: ['fields.date'] as any 
    });

    return response.items.map((item: any) => {
      const f = item.fields;
      const dateObj = new Date(f.date);

      const datePart = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      // 🚨 FIX: Check if 'location' is a string. If it's an object (coordinates), use default.
      const displayLocation = typeof f.location === 'string' ? f.location : "Hemato Institute";

      return {
        id: item.sys.id,
        title: f.title,
        slug: f.slug,
        date: f.date,
        displayDate: `${datePart}, ${f.startTime || ""} – ${f.endTime || ""}`,
        displayLocation: displayLocation, 
        image: f.image?.fields?.file?.url ? `https:${f.image.fields.file.url}` : null,
        price: f.price,
        stripePriceId: f.stripePriceId,
      };
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: 'event',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (!response.items.length) return null;
    
    const f = response.items[0].fields as any;
    const dateObj = new Date(f.date);
    const datePart = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    });

    // 1. Get the Address string (Now that it's a Short Text field)
    const streetAddress = typeof f.address === 'string' ? f.address : "";

    // 2. Decide what the main "Location" title should be
    // If you have a field called 'locationName' in Contentful, use f.locationName.
    // Otherwise, we use "Hemato Institute" as the default.
    const venueName = f.locationName || "Hemato Institute";

    // 3. Modern URL API for the Map Link
// 🚨 UPDATED: Pointing specifically to the Institute entity
    const searchParams = new URLSearchParams({ 
      api: "1", 
      // Using the Business Name + Address for the most accurate pin
      query: "Hemato Institute Inc, 50 Orchard Hill Rd, Katonah, NY 10536",
      // Optional: This is the official Place ID for Hemato Institute Inc
      query_place_id: "ChIJPaLbu5yxwokRHJqakca6E04" 
    });

    const mapUrl = `https://www.google.com/maps/search/?${searchParams.toString()}`;

    return {
      title: f.title || "",
      slug: f.slug || "",
      description: f.description || null,
      price: f.price || "15.00",
      displayDate: `${datePart}, ${f.startTime || ""} – ${f.endTime || ""}`,
      displayLocation: venueName, 
      displayAddress: streetAddress, 
      mapUrl: mapUrl, // Now points directly to Hemato Institute Inc
      image: f.image?.fields?.file?.url ? `https:${f.image.fields.file.url}` : null,
      stripePriceId: f.stripePriceId || "",
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}