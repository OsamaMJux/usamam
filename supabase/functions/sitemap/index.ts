import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const baseUrl = "https://usamam.lovable.app";

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/blog", priority: "0.9", changefreq: "daily" },
    { url: "/products", priority: "0.8", changefreq: "weekly" },
    { url: "/process", priority: "0.7", changefreq: "monthly" },
  ];

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, updated_at")
    .eq("published", true);

  const blogEntries = (blogs || []).map((blog) => ({
    url: `/blog/${blog.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: blog.updated_at?.split("T")[0],
  }));

  const allPages = [...staticPages, ...blogEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { ...corsHeaders, "Content-Type": "application/xml" },
  });
});
