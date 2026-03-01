import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogData {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  featured_image: string | null;
  author: string;
  category: string;
  tags: string[];
  reading_time: number;
  created_at: string;
  updated_at: string;
}

interface RelatedBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  reading_time: number;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [related, setRelated] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      setBlog(data);
      setLoading(false);

      if (data) {
        const { data: relatedData } = await supabase
          .from("blogs")
          .select("id, title, slug, category, reading_time, created_at")
          .eq("published", true)
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(3);
        setRelated(relatedData || []);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-10 bg-card rounded animate-pulse w-3/4" />
            <div className="h-6 bg-card rounded animate-pulse w-1/2" />
            <div className="h-64 bg-card rounded animate-pulse mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-serif italic mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = `https://usamajamil.com/blog/${blog.slug}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.meta_description || "",
    "image": blog.featured_image || "",
    "author": { "@type": "Person", "name": blog.author },
    "publisher": { "@type": "Person", "name": "Usama Jamil" },
    "datePublished": blog.created_at,
    "dateModified": blog.updated_at,
    "mainEntityOfPage": shareUrl,
    "keywords": blog.tags?.join(", "),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={blog.meta_title || blog.title}
        description={blog.meta_description || blog.content.slice(0, 155)}
        canonical={`/blog/${blog.slug}`}
        ogType="article"
        ogImage={blog.featured_image || undefined}
        article={{
          publishedTime: blog.created_at,
          modifiedTime: blog.updated_at,
          author: blog.author,
          section: blog.category,
          tags: blog.tags,
        }}
        structuredData={articleStructuredData}
      />
      <Navigation />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back link */}
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>

            {/* Category & Meta */}
            <Badge variant="outline" className="mb-4">{blog.category}</Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>{blog.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {blog.reading_time} min read
              </span>
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="rounded-xl overflow-hidden mb-10">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-a:text-primary prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <section className="mt-16 pt-10 border-t border-border">
                <h2 className="text-2xl font-serif italic mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="group block bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all"
                    >
                      <Badge variant="outline" className="text-xs mb-2">{r.category}</Badge>
                      <h3 className="font-serif italic group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {r.reading_time} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
