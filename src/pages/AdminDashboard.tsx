import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) fetchBlogs();
  }, [user, isAdmin]);

  const fetchBlogs = async () => {
    const { data } = await supabase
      .from("blogs")
      .select("id, title, slug, category, published, created_at, updated_at")
      .order("created_at", { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  };

  const deleteBlog = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `"${title}" has been deleted.` });
      fetchBlogs();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("blogs")
      .update({ published: !currentStatus })
      .eq("id", id);
    if (!error) fetchBlogs();
  };

  if (authLoading) return <div className="min-h-screen bg-background" />;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Admin Dashboard" noindex />

      {/* Top Bar */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-serif italic text-lg">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">View Site</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Posts", value: blogs.length, icon: FileText },
            { label: "Published", value: blogs.filter((b) => b.published).length, icon: Eye },
            { label: "Drafts", value: blogs.filter((b) => !b.published).length, icon: Edit },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary/50" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif italic">Blog Posts</h1>
          <Link to="/admin/blog/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> New Post
            </Button>
          </Link>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No blog posts yet. Create your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{blog.title}</h3>
                    <Badge variant={blog.published ? "default" : "secondary"} className="text-xs shrink-0">
                      {blog.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {blog.category} · {new Date(blog.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublish(blog.id, blog.published)}
                    title={blog.published ? "Unpublish" : "Publish"}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Link to={`/admin/blog/${blog.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteBlog(blog.id, blog.title)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
