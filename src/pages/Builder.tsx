import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Copy, Download, Eye, FileDown, Globe, Loader2, MoreVertical, Palette, Plus, Sparkles, Trash2, Type, Upload, Wand2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Booklet, Page, PAGE_LABELS, PageType, Theme } from "@/lib/booklet/types";
import { PRESET_THEMES, STORAGE_KEY, buildDefaultPages, createBooklet } from "@/lib/booklet/defaultBooklet";
import { renderPageHTML } from "@/lib/booklet/pageTemplates";
import { exportBookletToPDF } from "@/lib/booklet/exportPdf";

type Stage = "intake" | "generating" | "editor";

const LOADING_STEPS = [
  "Analyzing website",
  "Extracting branding",
  "Building profile",
  "Designing booklet",
  "Finalizing pages",
];

const Builder = () => {
  const [stage, setStage] = useState<Stage>("intake");
  const [booklet, setBooklet] = useState<Booklet | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const b = JSON.parse(saved) as Booklet;
        setBooklet(b);
        setStage("editor");
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (booklet) localStorage.setItem(STORAGE_KEY, JSON.stringify(booklet));
  }, [booklet]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Profile Builder — Generate a Company Booklet from any URL</title>
        <meta name="description" content="Turn any website into a premium company profile and client onboarding booklet in seconds. AI-powered, brand-matched, instantly editable." />
      </Helmet>
      <Navigation />
      <AnimatePresence mode="wait">
        {stage === "intake" && (
          <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Intake onStart={async (input) => {
              setStage("generating");
              try {
                const { data, error } = await supabase.functions.invoke("generate-booklet", { body: input });
                if (error) throw error;
                const ai = data?.ai || {};
                const meta = data?.meta || {};
                const theme: Theme = {
                  primary: ai.theme?.primary || "#111827",
                  secondary: ai.theme?.secondary || "#6366f1",
                  accent: ai.theme?.accent || "#f59e0b",
                  background: ai.theme?.background || "#ffffff",
                  text: ai.theme?.text || "#111827",
                  headingFont: ai.theme?.headingFont || "Instrument Serif",
                  bodyFont: ai.theme?.bodyFont || "Inter",
                  logoUrl: meta.logo,
                  heroImageUrl: meta.heroImage,
                };
                const partial: Partial<Booklet> = {
                  companyName: ai.companyName || input.companyName || "Your Company",
                  tagline: ai.tagline || "Excellence in every detail",
                  websiteUrl: input.websiteUrl,
                };
                const pages = buildDefaultPages(partial);
                // Patch AI data into pages
                const find = (t: PageType) => pages.find(p => p.type === t)!;
                if (ai.welcomeMessage) find("welcome").content.message = ai.welcomeMessage;
                if (ai.about) find("about").content = { overview: ai.about.overview, history: ai.about.history, values: ai.about.values || [] };
                if (ai.mission || ai.vision) find("mission").content = { mission: ai.mission || find("mission").content.mission, vision: ai.vision || find("mission").content.vision };
                if (ai.services?.length) find("services").content.items = ai.services;
                if (ai.process?.length) find("process").content.steps = ai.process;
                if (ai.testimonials?.length) find("testimonials").content.items = ai.testimonials;
                if (ai.contact) find("contact").content = { ...find("contact").content, ...ai.contact };

                const b = createBooklet({ websiteUrl: input.websiteUrl, companyName: partial.companyName, industry: input.industry, tagline: partial.tagline, theme, pages });
                setBooklet(b);
                setTimeout(() => setStage("editor"), 600);
              } catch (e: any) {
                toast({ title: "Generation failed", description: e.message || "Please try again", variant: "destructive" });
                setStage("intake");
              }
            }} />
          </motion.div>
        )}
        {stage === "generating" && <Generating key="loading" />}
        {stage === "editor" && booklet && (
          <Editor
            key="editor"
            booklet={booklet}
            onChange={setBooklet}
            onReset={() => { localStorage.removeItem(STORAGE_KEY); setBooklet(null); setStage("intake"); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Builder;

/* ============== Intake ============== */
function Intake({ onStart }: { onStart: (i: { websiteUrl: string; companyName?: string; industry?: string }) => void }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> AI Profile Builder
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            From URL to <span className="italic text-primary">premium booklet</span> in seconds.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Drop in any company website. We scrape, analyze, and assemble a fully branded company profile and client onboarding kit — ready to edit and export as PDF.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onSubmit={(e) => { e.preventDefault(); if (!url.trim()) return; onStart({ websiteUrl: url.trim(), companyName: name.trim() || undefined, industry: industry.trim() || undefined }); }}
          className="max-w-2xl mx-auto bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 shadow-card text-left space-y-4"
        >
          <div>
            <Label htmlFor="url" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Website URL</Label>
            <div className="relative mt-2">
              <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourcompany.com" required className="h-14 pl-12 text-lg rounded-2xl" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Company name (optional)</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Studio" className="mt-2 h-12 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Industry (optional)</Label>
              <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Design agency" className="mt-2 h-12 rounded-xl" />
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full h-14 text-base rounded-2xl group">
            <Wand2 className="mr-2 group-hover:rotate-12 transition" /> Generate Company Profile
          </Button>
          <div className="text-xs text-muted-foreground text-center">15 pages · brand-matched · editable · PDF export</div>
        </motion.form>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto opacity-70 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <div>Canva-grade design</div><div>Notion-grade editing</div><div>Pitch-grade export</div>
        </div>
      </div>
    </section>
  );
}

/* ============== Generating ============== */
function Generating() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => Math.min(s + 1, LOADING_STEPS.length)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="pt-32 pb-20 px-6 min-h-screen flex items-center">
      <div className="container mx-auto max-w-xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-10 shadow-card text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
              <Sparkles className="text-primary-foreground" />
            </div>
          </div>
          <h2 className="font-serif text-3xl mb-2">Crafting your booklet</h2>
          <p className="text-sm text-muted-foreground mb-8">Hand-tuned by AI · brand-matched · 15 pages</p>
          <ul className="text-left space-y-3">
            {LOADING_STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/30 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <Check size={14} /> : i === step ? <Loader2 size={14} className="animate-spin" /> : i + 1}
                </span>
                <span className={`text-sm ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ============== Editor ============== */
function Editor({ booklet, onChange, onReset }: { booklet: Booklet; onChange: (b: Booklet) => void; onReset: () => void; }) {
  const [activeId, setActiveId] = useState(booklet.pages[0]?.id);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const activeIndex = Math.max(0, booklet.pages.findIndex(p => p.id === activeId));
  const active = booklet.pages[activeIndex];

  const update = (fn: (b: Booklet) => Booklet) => onChange({ ...fn(booklet), updatedAt: new Date().toISOString() });

  const updatePage = (id: string, patch: Partial<Page> | ((p: Page) => Page)) => {
    update(b => ({ ...b, pages: b.pages.map(p => p.id === id ? (typeof patch === "function" ? patch(p) : { ...p, ...patch, content: { ...p.content, ...(patch.content || {}) } }) : p) }));
  };

  const movePage = (id: string, dir: -1 | 1) => {
    update(b => {
      const i = b.pages.findIndex(p => p.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= b.pages.length) return b;
      const np = [...b.pages];
      [np[i], np[j]] = [np[j], np[i]];
      return { ...b, pages: np };
    });
  };

  const duplicatePage = (id: string) => update(b => {
    const i = b.pages.findIndex(p => p.id === id);
    if (i < 0) return b;
    const copy: Page = { ...b.pages[i], id: Math.random().toString(36).slice(2, 10), content: JSON.parse(JSON.stringify(b.pages[i].content)), title: b.pages[i].title + " (copy)" };
    const np = [...b.pages]; np.splice(i + 1, 0, copy);
    return { ...b, pages: np };
  });

  const deletePage = (id: string) => update(b => ({ ...b, pages: b.pages.filter(p => p.id !== id) }));

  const addPage = (type: PageType) => update(b => {
    const tmpl = buildDefaultPages({ companyName: b.companyName, tagline: b.tagline, websiteUrl: b.websiteUrl }).find(p => p.type === type)!;
    return { ...b, pages: [...b.pages, { ...tmpl, id: Math.random().toString(36).slice(2, 10) }] };
  });

  const onExport = async () => {
    setExporting(true); setExportProgress(0);
    try {
      await exportBookletToPDF(booklet, (c, t) => setExportProgress(Math.round((c / t) * 100)));
      toast({ title: "Exported", description: "Your booklet PDF is downloading." });
    } catch (e: any) {
      toast({ title: "Export failed", description: e.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="pt-20 h-screen flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-xl px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-2"><ArrowLeft size={14} /> New</Button>
          <div className="h-6 w-px bg-border" />
          <Input value={booklet.companyName} onChange={(e) => update(b => ({ ...b, companyName: e.target.value }))} className="h-8 max-w-[240px] border-0 bg-transparent text-base font-serif" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:inline">Page {activeIndex + 1} / {booklet.pages.length}</span>
          <Button variant="ghost" size="icon" onClick={() => setActiveId(booklet.pages[Math.max(0, activeIndex - 1)].id)} disabled={activeIndex === 0}><ArrowLeft size={16} /></Button>
          <Button variant="ghost" size="icon" onClick={() => setActiveId(booklet.pages[Math.min(booklet.pages.length - 1, activeIndex + 1)].id)} disabled={activeIndex >= booklet.pages.length - 1}><ArrowRight size={16} /></Button>
          <div className="h-6 w-px bg-border" />
          <Button variant="hero" size="sm" onClick={onExport} disabled={exporting} className="gap-2">
            {exporting ? <><Loader2 size={14} className="animate-spin" /> {exportProgress}%</> : <><FileDown size={14} /> Export PDF</>}
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[260px_1fr_320px] min-h-0">
        {/* Left: Pages */}
        <aside className="border-r border-border bg-card/40 overflow-y-auto p-3 space-y-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pages</span>
            <AddPageMenu onAdd={addPage} />
          </div>
          {booklet.pages.map((p, i) => (
            <PageThumb
              key={p.id}
              page={p}
              index={i}
              total={booklet.pages.length}
              active={p.id === activeId}
              theme={booklet.theme}
              booklet={booklet}
              onSelect={() => setActiveId(p.id)}
              onMoveUp={() => movePage(p.id, -1)}
              onMoveDown={() => movePage(p.id, 1)}
              onDuplicate={() => duplicatePage(p.id)}
              onDelete={() => deletePage(p.id)}
            />
          ))}
        </aside>

        {/* Center: Preview */}
        <main className="bg-background/40 overflow-auto p-8 flex items-start justify-center">
          {active && (
            <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-[1100px]">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-card border border-border bg-white">
                <iframe
                  title={active.title}
                  srcDoc={renderPageHTML(active, booklet.theme, booklet)}
                  className="w-full h-full block"
                  sandbox=""
                />
              </div>
              <div className="text-center mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {PAGE_LABELS[active.type]} · Page {activeIndex + 1}
              </div>
            </motion.div>
          )}
        </main>

        {/* Right: Properties */}
        <aside className="border-l border-border bg-card/40 overflow-y-auto">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-2 m-3 mb-0">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="p-4">
              {active && <PageContentEditor page={active} onChange={(p) => updatePage(active.id, p)} booklet={booklet} onBookletChange={onChange} />}
            </TabsContent>
            <TabsContent value="theme" className="p-4">
              <ThemeEditor booklet={booklet} onChange={(t) => update(b => ({ ...b, theme: { ...b.theme, ...t } }))} />
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  );
}

function PageThumb({ page, active, index, total, theme, booklet, onSelect, onMoveUp, onMoveDown, onDuplicate, onDelete }: {
  page: Page; active: boolean; index: number; total: number; theme: Theme; booklet: Booklet;
  onSelect: () => void; onMoveUp: () => void; onMoveDown: () => void; onDuplicate: () => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`group relative rounded-xl border transition cursor-pointer overflow-hidden ${active ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"}`} onClick={onSelect}>
      <div className="aspect-[16/9] bg-white overflow-hidden">
        <div style={{ width: 1280, height: 720, transform: "scale(0.18)", transformOrigin: "top left" }}>
          <iframe srcDoc={renderPageHTML(page, theme, booklet)} className="w-[1280px] h-[720px] block pointer-events-none" sandbox="" />
        </div>
      </div>
      <div className="px-2.5 py-1.5 flex items-center justify-between text-xs bg-card/80">
        <span className="truncate"><span className="text-muted-foreground mr-1.5">{String(index + 1).padStart(2, "0")}</span>{PAGE_LABELS[page.type]}</span>
        <button onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }} className="opacity-60 hover:opacity-100"><MoreVertical size={12} /></button>
      </div>
      {open && (
        <div onClick={(e) => e.stopPropagation()} className="absolute right-2 bottom-8 z-10 bg-popover border border-border rounded-lg shadow-card p-1 w-40 text-xs">
          {[
            { label: "Move up", icon: ArrowLeft, disabled: index === 0, onClick: onMoveUp },
            { label: "Move down", icon: ArrowRight, disabled: index === total - 1, onClick: onMoveDown },
            { label: "Duplicate", icon: Copy, onClick: onDuplicate },
            { label: "Delete", icon: Trash2, danger: true, onClick: onDelete },
          ].map(it => (
            <button key={it.label} disabled={it.disabled} onClick={() => { it.onClick(); setOpen(false); }} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-secondary disabled:opacity-40 ${it.danger ? "text-destructive" : ""}`}>
              <it.icon size={12} /> {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AddPageMenu({ onAdd }: { onAdd: (t: PageType) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button size="sm" variant="ghost" onClick={() => setOpen(v => !v)} className="h-7 px-2 gap-1"><Plus size={12} /> Add</Button>
      {open && (
        <div className="absolute right-0 top-8 z-20 bg-popover border border-border rounded-lg shadow-card p-1 w-44 text-xs max-h-72 overflow-auto">
          {(Object.keys(PAGE_LABELS) as PageType[]).map(t => (
            <button key={t} onClick={() => { onAdd(t); setOpen(false); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-secondary">{PAGE_LABELS[t]}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============== Editors ============== */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function PageContentEditor({ page, onChange, booklet, onBookletChange }: { page: Page; onChange: (p: Partial<Page>) => void; booklet: Booklet; onBookletChange: (b: Booklet) => void }) {
  const c = page.content;
  const set = (k: string, v: any) => onChange({ content: { [k]: v } as any });
  const setNested = (next: any) => onChange({ content: next });

  switch (page.type) {
    case "cover":
      return (
        <div className="space-y-3">
          <Field label="Company Name"><Input value={booklet.companyName} onChange={(e) => onBookletChange({ ...booklet, companyName: e.target.value })} /></Field>
          <Field label="Tagline"><Input value={booklet.tagline} onChange={(e) => onBookletChange({ ...booklet, tagline: e.target.value })} /></Field>
          <Field label="Year"><Input value={c.year} onChange={(e) => set("year", e.target.value)} /></Field>
        </div>
      );
    case "welcome":
      return <Field label="Welcome message"><Textarea rows={8} value={c.message} onChange={(e) => set("message", e.target.value)} /></Field>;
    case "about":
      return (
        <div className="space-y-3">
          <Field label="Overview"><Textarea rows={4} value={c.overview} onChange={(e) => set("overview", e.target.value)} /></Field>
          <Field label="History"><Textarea rows={3} value={c.history} onChange={(e) => set("history", e.target.value)} /></Field>
          <ListEditor label="Core Values" items={c.values || []} onChange={(v) => set("values", v)} render={(item, on) => <Input value={item} onChange={(e) => on(e.target.value)} />} create={() => "New value"} />
        </div>
      );
    case "mission":
      return (
        <div className="space-y-3">
          <Field label="Mission"><Textarea rows={4} value={c.mission} onChange={(e) => set("mission", e.target.value)} /></Field>
          <Field label="Vision"><Textarea rows={4} value={c.vision} onChange={(e) => set("vision", e.target.value)} /></Field>
        </div>
      );
    case "services":
      return <ListEditor label="Services" items={c.items || []} onChange={(v) => set("items", v)} render={(it, on) => (
        <div className="space-y-1.5"><Input value={it.title} onChange={(e) => on({ ...it, title: e.target.value })} placeholder="Title" /><Textarea rows={2} value={it.description} onChange={(e) => on({ ...it, description: e.target.value })} placeholder="Description" /></div>
      )} create={() => ({ title: "New Service", description: "Description" })} />;
    case "process":
      return <ListEditor label="Process Steps" items={c.steps || []} onChange={(v) => set("steps", v)} render={(it, on) => (
        <div className="space-y-1.5"><Input value={it.title} onChange={(e) => on({ ...it, title: e.target.value })} /><Textarea rows={2} value={it.description} onChange={(e) => on({ ...it, description: e.target.value })} /></div>
      )} create={() => ({ title: "Step", description: "Description" })} />;
    case "portfolio":
      return <ListEditor<{ title: string; description: string; image?: string }> label="Projects" items={c.items || []} onChange={(v) => set("items", v)} render={(it, on) => (
        <div className="space-y-1.5"><Input value={it.title} onChange={(e) => on({ ...it, title: e.target.value })} placeholder="Title" /><Input value={it.description} onChange={(e) => on({ ...it, description: e.target.value })} placeholder="Description" /><Input value={it.image || ""} onChange={(e) => on({ ...it, image: e.target.value })} placeholder="Image URL" /></div>
      )} create={() => ({ title: "New Project", description: "Brief description", image: "" })} />;
    case "team":
      return <ListEditor<{ name: string; role: string; bio: string; photo?: string }> label="Team Members" items={c.members || []} onChange={(v) => set("members", v)} render={(it, on) => (
        <div className="space-y-1.5"><Input value={it.name} onChange={(e) => on({ ...it, name: e.target.value })} placeholder="Name" /><Input value={it.role} onChange={(e) => on({ ...it, role: e.target.value })} placeholder="Role" /><Input value={it.bio} onChange={(e) => on({ ...it, bio: e.target.value })} placeholder="Bio" /><Input value={it.photo || ""} onChange={(e) => on({ ...it, photo: e.target.value })} placeholder="Photo URL" /></div>
      )} create={() => ({ name: "New Member", role: "Role", bio: "", photo: "" })} />;
    case "testimonials":
      return <ListEditor label="Testimonials" items={c.items || []} onChange={(v) => set("items", v)} render={(it, on) => (
        <div className="space-y-1.5"><Textarea rows={3} value={it.quote} onChange={(e) => on({ ...it, quote: e.target.value })} /><Input value={it.author} onChange={(e) => on({ ...it, author: e.target.value })} placeholder="Author" /><Input value={it.role || ""} onChange={(e) => on({ ...it, role: e.target.value })} placeholder="Role" /></div>
      )} create={() => ({ quote: "Great work!", author: "Client", role: "Role" })} />;
    case "contact":
      return (
        <div className="space-y-3">
          {["email", "phone", "website", "address"].map(k => (
            <Field key={k} label={k}><Input value={c[k] || ""} onChange={(e) => set(k, e.target.value)} /></Field>
          ))}
        </div>
      );
    case "client-welcome":
      return (
        <div className="space-y-3">
          <Field label="Welcome"><Textarea rows={3} value={c.welcome} onChange={(e) => set("welcome", e.target.value)} /></Field>
          {(["expect", "needFromYou", "channels"] as const).map(k => (
            <ListEditor key={k} label={k} items={c[k] || []} onChange={(v) => set(k, v)} render={(it, on) => <Input value={it} onChange={(e) => on(e.target.value)} />} create={() => "New item"} />
          ))}
        </div>
      );
    case "kickoff":
      return (
        <div className="space-y-3">
          {(["services", "purpose", "agenda"] as const).map(k => (
            <ListEditor key={k} label={k} items={c[k] || []} onChange={(v) => set(k, v)} render={(it, on) => <Input value={it} onChange={(e) => on(e.target.value)} />} create={() => "New item"} />
          ))}
        </div>
      );
    case "invoice":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Invoice #"><Input value={c.invoiceNumber} onChange={(e) => set("invoiceNumber", e.target.value)} /></Field>
            <Field label="Due Date"><Input type="date" value={c.dueDate} onChange={(e) => set("dueDate", e.target.value)} /></Field>
            <Field label="Method"><Input value={c.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value)} /></Field>
            <Field label="Tax rate"><Input type="number" step="0.01" value={c.taxRate} onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)} /></Field>
          </div>
          <ListEditor label="Line items" items={c.items || []} onChange={(v) => set("items", v)} render={(it, on) => (
            <div className="grid grid-cols-2 gap-1.5"><Input value={it.service} onChange={(e) => on({ ...it, service: e.target.value })} placeholder="Service" /><Input type="number" value={it.amount} onChange={(e) => on({ ...it, amount: +e.target.value })} placeholder="Amount" /><Textarea rows={2} className="col-span-2" value={it.description} onChange={(e) => on({ ...it, description: e.target.value })} placeholder="Description" /></div>
          )} create={() => ({ service: "New", description: "", amount: 0 })} />
        </div>
      );
    case "agreement":
      return (
        <div className="space-y-3">
          <Field label="Agency name"><Input value={c.agencyName} onChange={(e) => set("agencyName", e.target.value)} /></Field>
          <Field label="Agency address"><Input value={c.agencyAddress} onChange={(e) => set("agencyAddress", e.target.value)} /></Field>
          <Field label="Client name"><Input value={c.clientName} onChange={(e) => set("clientName", e.target.value)} /></Field>
          <Field label="Client address"><Input value={c.clientAddress} onChange={(e) => set("clientAddress", e.target.value)} /></Field>
          <ListEditor label="Clauses" items={c.clauses || []} onChange={(v) => set("clauses", v)} render={(it, on) => <Textarea rows={2} value={it} onChange={(e) => on(e.target.value)} />} create={() => "New clause"} />
        </div>
      );
    case "thankyou":
      return (
        <div className="space-y-3">
          <Field label="Message"><Input value={c.message} onChange={(e) => set("message", e.target.value)} /></Field>
          <Field label="CTA"><Input value={c.cta} onChange={(e) => set("cta", e.target.value)} /></Field>
        </div>
      );
    default:
      return null;
  }
}

function ListEditor<T>({ label, items, onChange, render, create }: { label: string; items: T[]; onChange: (v: T[]) => void; render: (item: T, on: (next: T) => void, idx: number) => React.ReactNode; create: () => T }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
        <Button size="sm" variant="ghost" className="h-6 px-2 gap-1" onClick={() => onChange([...items, create()])}><Plus size={12} /></Button>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-lg border border-border p-2 space-y-1.5 relative bg-background/40">
            {render(it, (next) => onChange(items.map((x, j) => j === i ? next : x)), i)}
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="absolute top-1 right-1 opacity-50 hover:opacity-100 text-destructive"><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeEditor({ booklet, onChange }: { booklet: Booklet; onChange: (t: Partial<Theme>) => void }) {
  const t = booklet.theme;
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 block">Presets</Label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(PRESET_THEMES).map(([name, th]) => (
            <button key={name} onClick={() => onChange(th)} className="rounded-lg overflow-hidden border border-border hover:border-primary transition group">
              <div className="h-12 flex" style={{ background: `linear-gradient(135deg, ${th.primary}, ${th.secondary})` }}>
                <div className="flex-1" /><div className="w-3 h-full" style={{ background: th.accent }} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.15em] py-1.5 px-2 bg-card text-center">{name}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(["primary", "secondary", "accent", "background", "text"] as const).map(k => (
          <Field key={k} label={k}>
            <div className="flex items-center gap-1.5">
              <input type="color" value={t[k]} onChange={(e) => onChange({ [k]: e.target.value } as any)} className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer" />
              <Input value={t[k]} onChange={(e) => onChange({ [k]: e.target.value } as any)} className="h-8 text-xs" />
            </div>
          </Field>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Heading font"><Input value={t.headingFont} onChange={(e) => onChange({ headingFont: e.target.value })} /></Field>
        <Field label="Body font"><Input value={t.bodyFont} onChange={(e) => onChange({ bodyFont: e.target.value })} /></Field>
      </div>
      <Field label="Logo URL"><Input value={t.logoUrl || ""} onChange={(e) => onChange({ logoUrl: e.target.value })} placeholder="https://…/logo.png" /></Field>
    </div>
  );
}
