import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("General");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    supabase.from("blog_categories").select("name").then(({ data }) => {
      setCategories((data || []).map((c) => c.name));
    });

    if (!isNew && id) {
      supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setContent(data.content);
            setMetaTitle(data.meta_title || "");
            setMetaDescription(data.meta_description || "");
            setFocusKeyword(data.focus_keyword || "");
            setFeaturedImage(data.featured_image || "");
            setCategory(data.category);
            setTags(data.tags || []);
            setPublished(data.published);
          }
        });
    }
  }, [id, isNew]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title) setSlug(generateSlug(title));
  }, [title, isNew]);

  const wordCount = useMemo(() => countWords(content), [content]);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // SEO checks
  const seoChecks = useMemo(() => {
    const kw = focusKeyword.toLowerCase();
    return [
      { label: "Keyword in title", ok: kw && title.toLowerCase().includes(kw) },
      { label: "Keyword in first paragraph", ok: kw && content.slice(0, 300).toLowerCase().includes(kw) },
      { label: "Minimum 800 words", ok: wordCount >= 800 },
      { label: "Meta description 120-160 chars", ok: metaDescription.length >= 120 && metaDescription.length <= 160 },
      { label: "Meta title set", ok: metaTitle.length > 0 },
      { label: "Featured image set", ok: featuredImage.length > 0 },
    ];
  }, [focusKeyword, title, content, wordCount, metaDescription, metaTitle, featuredImage]);

  const addTag = () => {
    const tag = tagsInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagsInput("");
  };

  const save = async (asDraft = false) => {
    if (!title.trim() || !slug.trim()) {
      toast({ title: "Missing fields", description: "Title and slug are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      content,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      focus_keyword: focusKeyword || null,
      featured_image: featuredImage || null,
      category,
      tags,
      published: asDraft ? false : published,
      reading_time: readingTime,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("blogs").insert(payload));
    } else {
      ({ error } = await supabase.from("blogs").update(payload).eq("id", id));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: asDraft ? "Saved as draft" : "Saved!", description: `"${title}" has been saved.` });
      navigate("/admin");
    }
  };

  if (authLoading || !user || !isAdmin) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={isNew ? "New Blog Post" : "Edit Blog Post"} noindex />

      {/* Top Bar */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 flex items-center justify-between h-14">
          <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-1" /> {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => save(true)} disabled={saving}>
              Save Draft
            </Button>
            <Button size="sm" onClick={() => { setPublished(true); save(false); }} disabled={saving}>
              <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {showPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h1 className="text-4xl font-serif italic mb-6">{title || "Untitled"}</h1>
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:italic prose-a:text-primary">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              </motion.div>
            ) : (
              <>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your blog post title"
                    className="text-xl bg-card border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                    className="bg-card border-border font-mono text-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <span className="text-xs text-muted-foreground">{wordCount} words · {readingTime} min read</span>
                  </div>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post in Markdown..."
                    className="bg-card border-border font-mono text-sm min-h-[500px]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* SEO Checks */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-sm">SEO Checklist</h3>
              <div className="space-y-2">
                {seoChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2 text-sm">
                    {check.ok ? (
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={check.ok ? "text-foreground" : "text-muted-foreground"}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Fields */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-sm">SEO Settings</h3>
              <div>
                <Label className="text-xs">Focus Keyword</Label>
                <Input
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. marketing strategy"
                  className="bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Meta Title ({metaTitle.length}/60)</Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value.slice(0, 60))}
                  placeholder="SEO title"
                  className="bg-secondary border-border text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Meta Description ({metaDescription.length}/160)</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                  placeholder="SEO description"
                  className="bg-secondary border-border text-sm min-h-[80px]"
                />
              </div>
              <div>
                <Label className="text-xs">Featured Image URL</Label>
                <Input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                  className="bg-secondary border-border text-sm"
                />
              </div>
            </div>

            {/* Category & Tags */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-sm">Organization</h3>
              <div>
                <Label className="text-xs">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add tag"
                    className="bg-secondary border-border text-sm"
                  />
                  <Button variant="outline" size="sm" onClick={addTag}>Add</Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;
