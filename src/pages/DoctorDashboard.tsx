import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import PatientCard from '@/components/dashboard/PatientCard';
import {
  Users,
  Calendar,
  Clock,
  Activity,
  Pill,
  FileText,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function DoctorDashboard() {
  const { user } = useAuth();

  // mock stats data
  const stats = [
    { title: 'Total Patients', value: 248, icon: Users, trend: { value: 12, isPositive: true } },
    { title: 'Appointments Today', value: 8, icon: Calendar },
    { title: 'Pending Reviews', value: 15, icon: Clock, trend: { value: 5, isPositive: false } },
    { title: 'Prescriptions', value: 42, icon: Pill },
  ];

  // mock appointments data
  const todayAppointments: Array<{patientName: string; time: string; date: string; type: 'in-person' | 'video'; status: 'upcoming' | 'completed' | 'cancelled'}> = [
    { patientName: 'Sara jain', time: '09:00 AM', date: 'Today', type: 'in-person', status: 'upcoming' },
    { patientName: 'Mahesh chavan', time: '10:30 AM', date: 'Today', type: 'video', status: 'upcoming' },
    { patientName: 'Esha gavit', time: '11:45 AM', date: 'Today', type: 'in-person', status: 'upcoming' },
    { patientName: 'Jay pardesi', time: '02:00 PM', date: 'Today', type: 'video', status: 'upcoming' },
  ];

  // mock patients data
  const recentPatients = [
    { name: 'Sara jain', age: 34, phone: '+1 234 567 8901', lastVisit: 'Jan 15, 2026', condition: 'Hypertension' },
    { name: 'Mahesh Chavan', age: 45, phone: '+1 234 567 8902', lastVisit: 'Jan 14, 2026', condition: 'Diabetes Type 2' },
    { name: 'Esha gavit', age: 28, phone: '+1 234 567 8903', lastVisit: 'Jan 12, 2026', condition: 'Allergies' },
  ];

  // quick actions
  const quickActions = [
    { icon: FileText, label: 'Write Prescription', color: 'bg-primary/10' },
    { icon: Users, label: 'View All Patients', color: 'bg-secondary' },
    { icon: Calendar, label: 'Schedule Appointment', color: 'bg-secondary' },
    { icon: Activity, label: 'View Reports', color: 'bg-secondary' },
  ];

  // animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // get first name from full name
  const firstName = user?.fullName?.split(' ')[0] || 'Doctor';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Good morning, Dr. {firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your practice today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map(function(stat, i) {
            return (
              <StatCard key={stat.title} {...stat} delay={i * 0.1} />
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Today's Appointments</h2>
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </div>
            <div className="space-y-3">
              {todayAppointments.map(function(apt, i) {
                return (
                  <AppointmentCard key={i} {...apt} delay={0.5 + i * 0.1} />
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map(function(action, i) {
                const IconComponent = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`w-full flex items-center gap-3 p-4 ${action.color} rounded-xl border border-border hover:shadow-subtle transition-all`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Patients</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPatients.map(function(patient, i) {
              return (
                <PatientCard key={i} {...patient} delay={0.8 + i * 0.1} />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
