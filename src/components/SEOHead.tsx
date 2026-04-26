import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
}

const BASE_URL = "https://thecreativeguy.vercel.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

const SEOHead = ({
  title = "theCreativeGuy | Creative Design & Branding Agency",
  description = "We help ambitious brands stand out with conversion-driven design, strategic branding, and modern web experiences that drive real business results.",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterCard = "summary_large_image",
  article,
  structuredData,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes("theCreativeGuy") ? title : `${title} | theCreativeGuy`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const absoluteOgImage = ogImage?.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:site_name" content="theCreativeGuy" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Article meta */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
