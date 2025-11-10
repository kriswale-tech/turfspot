import type { Pitch } from "~/types/pitch";

const SITE_URL = "https://turfspotgh.com";

function buildUrlEntry({
  loc,
  lastmod,
  changefreq,
  priority,
}: {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();
  const today = new Date().toISOString().split("T")[0];

  const staticEntries = [
    {
      loc: `${SITE_URL}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
  ];

  let dynamicEntries: Array<{
    loc: string;
    changefreq: string;
    priority: string;
  }> = [];

  try {
    const pitches = await $fetch<Pitch[]>(
      `${runtimeConfig.public.apiUrl}/turfs`,
      {
        query: { page_size: 200 },
      }
    );

    dynamicEntries = (pitches ?? []).map((pitch) => ({
      loc: `${SITE_URL}/turf-details/${pitch.id}`,
      changefreq: "daily",
      priority: "0.8",
    }));
  } catch (error) {
    console.error("[sitemap] Failed to fetch pitches:", error);
  }

  const urlsXml = [...staticEntries, ...dynamicEntries]
    .map((entry) =>
      buildUrlEntry({
        ...entry,
        lastmod: today,
      })
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
});
