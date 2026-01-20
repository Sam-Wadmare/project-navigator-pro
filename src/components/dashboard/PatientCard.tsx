import { motion } from 'framer-motion';
import { User, Phone, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PatientCard({ name, age, phone, lastVisit, condition, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -2 }}
      className="p-5 bg-card rounded-xl border border-border hover:shadow-subtle transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{age} years old</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="h-5 w-5" /></Button>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" /><span>{phone}</span></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="h-4 w-4" /><span>{condition}</span></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Last visit: {lastVisit}</span>
        <Button variant="secondary" size="sm" className="text-xs">View Profile</Button>
      </div>
    </motion.div>
  );
}

export default PatientCard;
