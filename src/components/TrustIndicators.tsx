import { motion } from "framer-motion";
import { Shield, Star, Clock, Users, Award, Zap } from "lucide-react";

interface TrustBadgeProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay?: number;
}

const TrustBadge = ({ icon: Icon, label, value, delay = 0 }: TrustBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/60 border border-border/50 backdrop-blur-sm"
  >
    <Icon size={14} className="text-primary" />
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-xs font-semibold text-foreground">{value}</span>
  </motion.div>
);

interface AvailabilityIndicatorProps {
  isAvailable?: boolean;
  message?: string;
}

export const AvailabilityIndicator = ({ 
  isAvailable = true, 
  message = "Available for Q1 2026" 
}: AvailabilityIndicatorProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border backdrop-blur-sm"
  >
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-green-400' : 'bg-amber-400'}`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${isAvailable ? 'bg-green-500' : 'bg-amber-500'}`} />
    </span>
    <span className="text-xs font-medium text-foreground">{message}</span>
  </motion.div>
);

export const LinkedInFollowers = ({ count = "12K+" }: { count?: string }) => (
  <motion.a
    href="https://www.linkedin.com/in/usamajm/"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 1 }}
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/20 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors cursor-pointer"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
    <span className="text-xs font-semibold">{count} followers</span>
  </motion.a>
);

interface CredentialBadgesProps {
  className?: string;
}

export const CredentialBadges = ({ className = "" }: CredentialBadgesProps) => (
  <motion.div 
    className={`flex flex-wrap gap-2 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <TrustBadge icon={Award} label="" value="5+ Years Experience" delay={0.7} />
    <TrustBadge icon={Users} label="" value="50+ Clients" delay={0.8} />
    <TrustBadge icon={Star} label="" value="100% Satisfaction" delay={0.9} />
  </motion.div>
);

interface RecentActivityProps {
  activities?: Array<{
    name: string;
    action: string;
    time: string;
  }>;
}

export const RecentActivity = ({ activities = [
  { name: "Ahmed K.", action: "started a project", time: "2 hours ago" },
  { name: "Sarah M.", action: "booked a call", time: "5 hours ago" },
  { name: "Fatima R.", action: "launched their site", time: "1 day ago" },
] }: RecentActivityProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="p-4 rounded-xl bg-card border border-border"
  >
    <div className="flex items-center gap-2 mb-3">
      <Zap size={14} className="text-primary" />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</span>
    </div>
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 text-sm"
        >
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
            {activity.name.charAt(0)}
          </div>
          <span className="text-foreground font-medium">{activity.name}</span>
          <span className="text-muted-foreground">{activity.action}</span>
          <span className="text-muted-foreground/60 text-xs ml-auto">{activity.time}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

interface ResponseTimeGuaranteeProps {
  hours?: number;
}

export const ResponseTimeGuarantee = ({ hours = 24 }: ResponseTimeGuaranteeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
  >
    <Clock size={14} className="text-primary" />
    <span className="text-xs font-medium text-foreground">
      <span className="text-primary font-bold">{hours}h</span> response guarantee
    </span>
  </motion.div>
);

interface LimitedSpotsProps {
  spots?: number;
  month?: string;
}

export const LimitedSpots = ({ spots = 2, month = "January" }: LimitedSpotsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Shield size={14} className="text-amber-500" />
    </motion.div>
    <span className="text-xs font-medium text-foreground">
      Only <span className="text-amber-500 font-bold">{spots} spots</span> left for {month}
    </span>
  </motion.div>
);

export const SatisfactionGuarantee = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
      <Shield size={24} className="text-primary" />
    </div>
    <div>
      <h4 className="text-sm font-bold text-foreground">100% Satisfaction Guarantee</h4>
      <p className="text-xs text-muted-foreground">Not happy? Full refund within 14 days, no questions asked.</p>
    </div>
  </motion.div>
);

export default TrustBadge;
