import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MedicalRecordCard({ title, doctor, date, type, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-subtle transition-all group"
    >
      <div className="flex-shrink-0 p-3 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors">
        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{title}</h4>
        <p className="text-sm text-muted-foreground">Dr. {doctor}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /><span>{date}</span>
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">{type}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Download className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

export default MedicalRecordCard;
