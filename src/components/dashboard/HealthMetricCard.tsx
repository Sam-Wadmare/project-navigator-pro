import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
  delay?: number;
}

function HealthMetricCard({ title, value, unit, icon: Icon, status, lastUpdated, delay = 0 }: HealthMetricCardProps) {
  const statusConfig = {
    normal: { color: 'text-success', bg: 'bg-success/10', label: 'Normal' },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-500/10', label: 'Warning' },
    critical: { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Critical' },
  };
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02 }}
      className="p-5 bg-card rounded-xl border border-border hover:shadow-subtle transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg", config.bg)}><Icon className={cn("h-5 w-5", config.color)} /></div>
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", config.bg, config.color)}>{config.label}</span>
      </div>
      <h4 className="text-sm text-muted-foreground mb-1">{title}</h4>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Updated {lastUpdated}</p>
    </motion.div>
  );
}

export default HealthMetricCard;
