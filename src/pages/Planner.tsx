import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, TrendingUp, Sparkles, ArrowRight, Clock, Users, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { plannerCities, PLANNER_YEAR, type PlannerCity, type Holiday } from "@/data/plannerCities";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const QUARTERS = [
  { id: "Q1", label: "Q1", months: [0, 1, 2], note: "New Year · Reset" },
  { id: "Q2", label: "Q2", months: [3, 4, 5], note: "Spring · Eid Window" },
  { id: "Q3", label: "Q3", months: [6, 7, 8], note: "Back-to-School" },
  { id: "Q4", label: "Q4", months: [9, 10, 11], note: "BFCM · Mega Sales" },
] as const;

const typeColor = (t: Holiday["type"]) => {
  switch (t) {
    case "local":
      return "bg-primary text-primary-foreground";
    case "international":
      return "bg-blue-500 text-white";
    case "shopping":
      return "bg-amber-500 text-black";
  }
};

const typeDot = (t: Holiday["type"]) => {
  switch (t) {
    case "local":
      return "bg-primary";
    case "international":
      return "bg-blue-500";
    case "shopping":
      return "bg-amber-500";
  }
};

const buildMonthGrid = (year: number, monthIndex: number) => {
  const first = new Date(year, monthIndex, 1);
  const startDay = (first.getDay() + 6) % 7; // Mon = 0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const MonthCard = ({
  monthIndex,
  city,
}: {
  monthIndex: number;
  city: PlannerCity;
}) => {
  const cells = useMemo(() => buildMonthGrid(PLANNER_YEAR, monthIndex), [monthIndex]);
  const monthHolidays = city.holidays.filter((h) => {
    const dt = new Date(h.date);
    return dt.getMonth() === monthIndex;
  });
  const holidayMap = new Map<number, Holiday>();
  monthHolidays.forEach((h) => holidayMap.set(new Date(h.date).getDate(), h));

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur p-4 sm:p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-serif italic text-lg sm:text-xl text-foreground">
          {MONTHS[monthIndex]}
        </h4>
        {monthHolidays.length > 0 && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
            {monthHolidays.length} event{monthHolidays.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div
            key={i}
            className="text-[10px] font-mono text-muted-foreground/60 text-center"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="aspect-square" />;
          const h = holidayMap.get(day);
          return (
            <div
              key={i}
              title={h ? `${h.name} (${h.type})` : undefined}
              className={`aspect-square rounded-md flex items-center justify-center text-[11px] sm:text-xs transition-all ${
                h
                  ? `${typeColor(h.type)} font-semibold shadow-lg shadow-primary/20 hover:scale-110`
                  : "text-muted-foreground/70 hover:bg-muted/40"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Holiday list */}
      {monthHolidays.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-border/40 pt-3">
          {monthHolidays.map((h) => (
            <li key={h.date} className="flex items-center gap-2 text-xs">
              <span className={`w-1.5 h-1.5 rounded-full ${typeDot(h.type)}`} />
              <span className="text-muted-foreground tabular-nums w-6">
                {new Date(h.date).getDate()}
              </span>
              <span className="text-foreground truncate">{h.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ROIPanel = ({ city }: { city: PlannerCity }) => {
  const [budget, setBudget] = useState<number[]>([5000]);
  const b = budget[0];

  // ROI logic: baselineRoas dampened slightly at very low / very high spend
  const efficiency = b < 1000 ? 0.75 : b < 5000 ? 1 : b < 20000 ? 1.12 : 1.05;
  const projectedRevenue = Math.round(b * city.baselineRoas * efficiency);
  const profit = projectedRevenue - b;
  const roas = (projectedRevenue / b).toFixed(2);
  const reach = Math.round((b / 0.012) / 1000); // CPM ≈ $12 -> impressions in thousands
  const leads = Math.round(b / 8); // ~$8 per qualified lead avg

  return (
    <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 via-card/60 to-background p-6 sm:p-10 backdrop-blur">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="text-primary" size={20} />
        <span className="text-xs font-mono tracking-widest text-primary uppercase">
          ROI Visualizer · {city.name}
        </span>
      </div>
      <h3 className="text-3xl sm:text-5xl font-serif italic text-foreground leading-tight mb-2">
        What ${b.toLocaleString()} <span className="text-primary">could return.</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-8">
        Based on a baseline {city.baselineRoas}x ROAS benchmark for {city.name} ({city.country}).
        Real numbers depend on offer, creative, and timing — we engineer for all three.
      </p>

      {/* Slider */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Monthly Marketing Budget
          </span>
          <span className="text-2xl sm:text-3xl font-serif italic text-primary tabular-nums">
            ${b.toLocaleString()}
          </span>
        </div>
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={500}
          max={50000}
          step={500}
        />
        <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-muted-foreground/60">
          <span>$500</span>
          <span>$25K</span>
          <span>$50K</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Projected Revenue", value: `$${projectedRevenue.toLocaleString()}`, accent: true },
          { label: "Net Profit", value: `$${profit.toLocaleString()}` },
          { label: "Effective ROAS", value: `${roas}x` },
          { label: "Est. Reach", value: `${reach.toLocaleString()}K` },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl p-4 sm:p-5 border ${
              s.accent
                ? "border-primary/40 bg-primary/10"
                : "border-border/50 bg-background/40"
            }`}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              {s.label}
            </div>
            <div
              className={`text-xl sm:text-2xl font-serif italic tabular-nums ${
                s.accent ? "text-primary" : "text-foreground"
              }`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground max-w-md">
          With this budget, you can realistically expect ~{leads.toLocaleString()} qualified
          leads or {Math.round(b / 25).toLocaleString()} new customers in {city.name}.
        </p>
        <Button variant="hero" size="lg" asChild>
          <a
            href={`https://wa.me/923214472719?text=${encodeURIComponent(
              `Hi, I want to launch in ${city.name} with a $${b.toLocaleString()}/mo budget. Let's plan it.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lock My Launch Plan <ArrowRight size={16} className="ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
};

const Planner = () => {
  const [activeId, setActiveId] = useState(plannerCities[0].id);
  const city = plannerCities.find((c) => c.id === activeId)!;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${city.map.bbox}&layer=mapnik&marker=${city.map.marker}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Launch Planner — Year Calendar, Holidays & ROI"
        description="Plan your product launch by city. See the full 2026 calendar, local & international holidays, market insights, and project ROI with a budget slider."
      />
      <Navigation />

      {/* HERO */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <RevealOnScroll>
            <span className="text-xs font-mono tracking-widest text-primary uppercase mb-4 block">
              The Launch Planner · {PLANNER_YEAR}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-foreground leading-[1.05] mb-5">
              Pick a city. <span className="text-primary">See the year.</span>
              <br /> Map the money.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              A live, interactive launch planner. Switch between target markets to instantly
              see the quarter-by-quarter calendar, the holidays that actually move the needle,
              and the ROI you can realistically expect.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CITY TABS */}
      <section className="px-6 sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-y border-border/40 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {plannerCities.map((c) => {
              const active = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="city-pill"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <MapPin size={14} />
                    {c.name}
                    <span className="hidden sm:inline opacity-60 text-xs">
                      · {c.country}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CITY INFO STRIP */}
      <AnimatePresence mode="wait">
        <motion.section
          key={city.id + "-info"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="px-6 py-10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-serif italic text-foreground">
                  {city.name}, <span className="text-primary">{city.country}</span>
                </h2>
                <p className="text-muted-foreground mt-1">{city.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {city.timezone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={12} /> {city.population}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 size={12} /> {city.marketSize}
                </span>
                <span className="flex items-center gap-1.5 text-primary">
                  <Sparkles size={12} /> Best: {city.bestQuarter}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-muted-foreground">Local / Cultural</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-muted-foreground">International</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-amber-500" />
                <span className="text-muted-foreground">Shopping / Sales</span>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* QUARTER CALENDAR */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={city.id + "-cal"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-10"
            >
              {QUARTERS.map((q) => (
                <div key={q.id}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-lg sm:text-xl font-serif italic text-foreground">
                        {q.label}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        · {q.note}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border via-border/40 to-transparent" />
                    {q.id === city.bestQuarter && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                        Peak Quarter
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {q.months.map((m) => (
                      <MonthCard key={m} monthIndex={m} city={city} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MAP TRANSITION */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-mono tracking-widest text-primary uppercase">
                  On The Ground
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif italic text-foreground">
                  Launching in <span className="text-primary">{city.name}</span>
                </h3>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Map */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden border border-border/60 bg-muted/20 relative aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={city.id + "-map"}
                  src={mapSrc}
                  title={`${city.name} map`}
                  className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-110"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur text-xs font-mono uppercase tracking-widest text-foreground flex items-center gap-1.5 border border-border/60">
                <MapPin size={12} className="text-primary" /> {city.name}, {city.country}
              </div>
            </div>

            {/* Insights */}
            <AnimatePresence mode="wait">
              <motion.div
                key={city.id + "-insights"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur p-6"
              >
                <span className="text-xs font-mono tracking-widest text-primary uppercase mb-3 block">
                  Market Notes
                </span>
                <ul className="space-y-4">
                  {city.insights.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground">
                      <span className="text-primary font-serif italic shrink-0">
                        0{i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ROI VISUALIZER */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <AnimatePresence mode="wait">
              <motion.div
                key={city.id + "-roi"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ROIPanel city={city} />
              </motion.div>
            </AnimatePresence>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Planner;
