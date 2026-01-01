import { motion } from "framer-motion";
import { Briefcase, Calendar, Layers, Monitor, Users, Wrench } from "lucide-react";
import { CaseSnapshot as CaseSnapshotType } from "@/data/caseStudies";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface CaseSnapshotProps {
  snapshot: CaseSnapshotType;
}

const CaseSnapshot = ({ snapshot }: CaseSnapshotProps) => {
  const items = [
    { icon: Briefcase, label: "Industry", value: snapshot.industry },
    { icon: Monitor, label: "Platform", value: snapshot.platform },
    { icon: Calendar, label: "Timeline", value: snapshot.timeline },
    { icon: Wrench, label: "Tools", value: snapshot.tools.join(", ") },
    { icon: Layers, label: "Role", value: snapshot.role },
    { icon: Users, label: "Team Size", value: snapshot.teamSize },
  ];

  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                >
                  <item.icon size={20} className="text-primary" />
                </motion.div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CaseSnapshot;
