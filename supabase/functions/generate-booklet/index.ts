import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

function extractMeta(html: string) {
  const get = (re: RegExp) => {
    const m = html.match(re);
    return m ? m[1].trim() : "";
  };
  const title = get(/<title[^>]*>([^<]+)<\/title>/i);
  const description = get(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    get(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  const ogImage = get(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  const ogTitle = get(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  const themeColor = get(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i);
  const favicon = get(/<link[^>]+rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]+href=["']([^"']+)["']/i);

  // Try to find logo image
  const logo = get(/<img[^>]+(?:class|alt)=["'][^"']*logo[^"']*["'][^>]+src=["']([^"']+)["']/i) ||
    get(/<img[^>]+src=["']([^"']+)["'][^>]+(?:class|alt)=["'][^"']*logo[^"']*["']/i);

  // Strip scripts/styles and tags for content
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 6000);

  return { title: ogTitle || title, description, ogImage, themeColor, favicon, logo, body: cleaned };
}

function resolveUrl(base: string, rel: string) {
  try { return new URL(rel, base).toString(); } catch { return rel; }
}

async function callAI(meta: ReturnType<typeof extractMeta>, websiteUrl: string, companyName?: string, industry?: string) {
  const system = `You are an expert brand strategist. From a company's website content, extract a structured company profile suitable for a presentation booklet. Output ONLY via the provided tool. Keep all copy crisp, premium, and on-brand. If information is missing, infer reasonable defaults from the industry and existing context.`;

  const user = `Website: ${websiteUrl}
Provided Company Name: ${companyName || "(unknown)"}
Provided Industry: ${industry || "(unknown)"}
Page Title: ${meta.title}
Description: ${meta.description}
Theme Color Hint: ${meta.themeColor}
Raw Content (truncated):
${meta.body}`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      tools: [{
        type: "function",
        function: {
          name: "build_profile",
          description: "Return structured booklet content.",
          parameters: {
            type: "object",
            properties: {
              companyName: { type: "string" },
              tagline: { type: "string" },
              industry: { type: "string" },
              theme: {
                type: "object",
                properties: {
                  primary: { type: "string", description: "hex like #RRGGBB" },
                  secondary: { type: "string" },
                  accent: { type: "string" },
                  background: { type: "string" },
                  text: { type: "string" },
                  headingFont: { type: "string" },
                  bodyFont: { type: "string" },
                },
                required: ["primary", "secondary", "accent", "background", "text", "headingFont", "bodyFont"],
              },
              about: { type: "object", properties: { overview: { type: "string" }, history: { type: "string" }, values: { type: "array", items: { type: "string" } } }, required: ["overview", "history", "values"] },
              mission: { type: "string" },
              vision: { type: "string" },
              services: { type: "array", items: { type: "object", properties: { title: { type: "string" }, description: { type: "string" } }, required: ["title", "description"] } },
              process: { type: "array", items: { type: "object", properties: { title: { type: "string" }, description: { type: "string" } }, required: ["title", "description"] } },
              testimonials: { type: "array", items: { type: "object", properties: { quote: { type: "string" }, author: { type: "string" }, role: { type: "string" } }, required: ["quote", "author"] } },
              contact: { type: "object", properties: { email: { type: "string" }, phone: { type: "string" }, address: { type: "string" } } },
              welcomeMessage: { type: "string" },
            },
            required: ["companyName", "tagline", "theme", "about", "mission", "vision", "services", "process", "welcomeMessage"],
          },
        },
      }],
      tool_choice: { type: "function", function: { name: "build_profile" } },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`AI gateway ${res.status}: ${t}`);
  }
  const data = await res.json();
  const tc = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!tc) throw new Error("AI did not return tool call");
  return JSON.parse(tc.function.arguments);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    const { websiteUrl, companyName, industry } = await req.json();
    if (!websiteUrl) throw new Error("websiteUrl required");

    let url = websiteUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    // Fetch site HTML
    let html = "";
    try {
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; BookletBot/1.0)" } });
      html = await r.text();
    } catch (e) {
      console.warn("fetch site failed", e);
    }

    const meta = extractMeta(html || "");
    if (meta.ogImage) meta.ogImage = resolveUrl(url, meta.ogImage);
    if (meta.favicon) meta.favicon = resolveUrl(url, meta.favicon);
    if (meta.logo) meta.logo = resolveUrl(url, meta.logo);

    const ai = await callAI(meta, url, companyName, industry);

    return new Response(JSON.stringify({
      meta: { logo: meta.logo || meta.favicon, heroImage: meta.ogImage },
      ai,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("generate-booklet error", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = msg.includes("429") ? 429 : msg.includes("402") ? 402 : 500;
    return new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
