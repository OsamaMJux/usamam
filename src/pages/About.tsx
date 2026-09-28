import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  CloudOff,
  PenLine,
  Sparkles,
  ArrowRight,
  BookOpen,
  Trash2,
  Coffee,
} from "lucide-react";

const LEAFIST_URL = "https://leafist.lovable.app/";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

const painPoints = [
  {
    icon: Search,
    title: "You can't search paper",
    copy: "That idea from six months ago is somewhere in notebook #4. Good luck finding it before the meeting starts.",
  },
  {
    icon: CloudOff,
    title: "One notebook, one place",
    copy: "Left it at the office, in the other bag, on the train. Your notes are only useful when the notebook is with you.",
  },
  {
    icon: Trash2,
    title: "No undo, no backup",
    copy: "Water, coffee, a torn page — everything you wrote is gone forever. Paper never had a Ctrl+Z.",
  },
];

const wins = [
  {
    icon: PenLine,
    title: "Capture in seconds",
    copy: "Open Leaf, type, done. No pages to number, no dividers to flip, no friction between the thought and the note.",
  },
  {
    icon: Search,
    title: "Find anything instantly",
    copy: "Every note is searchable the moment you write it. A decade of thinking, one search box away.",
  },
  {
    icon: Sparkles,
    title: "Distraction-free by design",
    copy: "No feeds, no clutter, no features you'll never use. Just you and a clean page — the calm of paper, minus the paper.",
  },
  {
    icon: BookOpen,
    title: "Never lost again",
    copy: "Your notes live in one place, always backed up, available wherever you open your browser.",
  },
];

const LeafistLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Leafist — The Minimalist Digital Notebook"
        description="Leafist replaces the paper notebooks you lose, can't search, and can't back up. Capture in seconds, find anything instantly, never lose a note."
        canonical="/about"
      />
      <Navigation />

      {/* 1 — Hero */}
      <section className="relative flex items-center min-h-[88vh] pt-24 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl">
            <motion.p
              className="text-xs font-medium tracking-[0.25em] text-primary uppercase mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Leafist — a minimalist digital notebook
            </motion.p>
            <motion.h1
              className="font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Write it once.
              <br />
              <span className="text-gradient">Find it forever.</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Leafist replaces the stack of physical notebooks you carry, lose
              and never re-read. Everything you write is captured in seconds,
              searchable in milliseconds, and with you on any device.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button variant="hero" size="lg" asChild>
                <a href={LEAFIST_URL} target="_blank" rel="noopener noreferrer">
                  Open Leafist <ArrowRight size={18} />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2 — The problem: paper fails */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase mb-4">
              The problem
            </p>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight">
              Paper notebooks were built to be written in —
              <span className="font-serif italic font-normal"> not to be found again.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <item.icon className="text-primary mb-4" size={22} strokeWidth={1.5} />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeUp}
            className="mt-10 max-w-2xl text-muted-foreground flex items-start gap-3"
          >
            <Coffee size={18} className="text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
            <span>
              Every replacement attempt — sticky notes, scattered apps, three
              different note tools — created more clutter than the notebook it
              was supposed to fix.
            </span>
          </motion.p>
        </div>
      </section>

      {/* 3 — The fix + CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase mb-4">
              The fix
            </p>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight">
              One clean page. Everything in it stays yours.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            {wins.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 2) * 0.1 }}
                className="flex gap-4 p-6 rounded-lg border border-border bg-card"
              >
                <item.icon className="text-primary shrink-0 mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="rounded-xl border border-border bg-card p-8 sm:p-12 text-center"
          >
            <h3 className="font-bold text-2xl sm:text-3xl mb-3">
              Your next idea deserves better than notebook #5.
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Open Leafist and start writing — no setup, no learning curve,
              nothing to install.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href={LEAFIST_URL} target="_blank" rel="noopener noreferrer">
                Open Leafist <ArrowRight size={18} />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeafistLanding;
