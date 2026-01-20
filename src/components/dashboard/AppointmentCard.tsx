import { motion } from 'framer-motion';
import { Clock, Calendar, User, Video, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  patientName?: string;
  doctorName?: string;
  time: string;
  date: string;
  type: 'in-person' | 'video';
  status: 'upcoming' | 'completed' | 'cancelled';
  specialty?: string;
  delay?: number;
}

function AppointmentCard({ patientName, doctorName, time, date, type, status, specialty, delay = 0 }: AppointmentCardProps) {
  const statusColors = {
    upcoming: 'bg-primary/10 text-primary border-primary/20',
    completed: 'bg-success/10 text-success border-success/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.01 }}
      className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-subtle transition-all"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{patientName || doctorName}</h4>
        {specialty && <p className="text-sm text-muted-foreground">{specialty}</p>}
        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{time}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border capitalize", statusColors[status])}>{status}</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {type === 'video' ? (<><Video className="h-3.5 w-3.5" /><span>Video Call</span></>) : (<><MapPin className="h-3.5 w-3.5" /><span>In-Person</span></>)}
        </div>
      </div>
    </motion.div>
  );
}

export default AppointmentCard;
