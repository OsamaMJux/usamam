import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  featured_image: string | null;
  author: string;
  category: string;
  tags: string[];
  reading_time: number;
  created_at: string;
}

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id, title, slug, meta_description, featured_image, author, category, tags, reading_time, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setBlogs(data || []);
      setLoading(false);
    };

    const fetchCategories = async () => {
      const { data } = await supabase.from("blog_categories").select("name");
      setCategories((data || []).map((c) => c.name));
    };

    fetchBlogs();
    fetchCategories();
  }, []);

  const filtered = useMemo(() => {
    let result = blogs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => b.title.toLowerCase().includes(q) || b.meta_description?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((b) => b.category === selectedCategory);
    }
    return result;
  }, [blogs, search, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Usama Jamil Blog",
    "description": "Insights on marketing, design, AI, and brand strategy.",
    "url": "https://usamajamil.com/blog",
    "author": { "@type": "Person", "name": "Usama Jamil" },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog - Marketing, Design & AI Insights"
        description="Read the latest insights on marketing strategy, creative design, AI automation, and brand growth from Usama Jamil."
        canonical="/blog"
        structuredData={structuredData}
      />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif italic mb-4">
              The <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights on marketing strategy, creative design, AI automation, and building memorable brands.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant={!selectedCategory ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => { setSelectedCategory(null); setPage(1); }}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl">No articles found.</p>
              <p className="mt-2">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                  >
                    {blog.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {blog.category}
                      </Badge>
                      <h2 className="text-xl font-serif italic mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      {blog.meta_description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {blog.meta_description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.reading_time} min read
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
