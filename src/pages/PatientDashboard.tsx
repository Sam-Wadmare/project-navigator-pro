import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import HealthMetricCard from '@/components/dashboard/HealthMetricCard';
import MedicalRecordCard from '@/components/dashboard/MedicalRecordCard';
import {
  Calendar,
  Heart,
  Thermometer,
  Droplets,
  Activity,
  Weight,
  Clock,
  FileText,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function PatientDashboard() {
  const { user } = useAuth();

  // mock stats data
  const stats = [
    { title: 'Upcoming Appointments', value: 3, icon: Calendar },
    { title: 'Active Prescriptions', value: 2, icon: Heart },
    { title: 'Medical Records', value: 15, icon: FileText },
    { title: 'Days Since Last Visit', value: 12, icon: Clock },
  ];

  // mock health metrics data
  const healthMetrics: Array<{title: string; value: string; unit: string; icon: typeof Activity; status: 'normal' | 'warning' | 'critical'; lastUpdated: string}> = [
    { title: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, status: 'normal', lastUpdated: '2 hours ago' },
    { title: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, status: 'normal', lastUpdated: '2 hours ago' },
    { title: 'Temperature', value: '98.6', unit: '°F', icon: Thermometer, status: 'normal', lastUpdated: '1 day ago' },
    { title: 'Blood Sugar', value: '95', unit: 'mg/dL', icon: Droplets, status: 'normal', lastUpdated: '4 hours ago' },
    { title: 'Weight', value: '165', unit: 'lbs', icon: Weight, status: 'normal', lastUpdated: '3 days ago' },
    { title: 'Oxygen Level', value: '98', unit: '%', icon: Activity, status: 'normal', lastUpdated: '2 hours ago' },
  ];

  // mock appointments data
  const upcomingAppointments: Array<{doctorName: string; specialty: string; time: string; date: string; type: 'in-person' | 'video'; status: 'upcoming' | 'completed' | 'cancelled'}> = [
    { doctorName: 'Dr. Emily Carter', specialty: 'Cardiologist', time: '10:00 AM', date: 'Jan 20, 2026', type: 'in-person', status: 'upcoming' },
    { doctorName: 'Dr. Robert Smith', specialty: 'General Physician', time: '02:30 PM', date: 'Jan 22, 2026', type: 'video', status: 'upcoming' },
    { doctorName: 'Dr. Lisa Wong', specialty: 'Dermatologist', time: '11:00 AM', date: 'Jan 25, 2026', type: 'in-person', status: 'upcoming' },
  ];

  // mock medical records data
  const medicalRecords = [
    { title: 'Annual Health Checkup', doctor: 'Robert Smith', date: 'Jan 5, 2026', type: 'Report' },
    { title: 'Blood Test Results', doctor: 'Emily Carter', date: 'Dec 28, 2025', type: 'Lab' },
    { title: 'ECG Report', doctor: 'Emily Carter', date: 'Dec 20, 2025', type: 'Report' },
    { title: 'Prescription - Vitamins', doctor: 'Robert Smith', date: 'Dec 15, 2025', type: 'Rx' },
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
  const firstName = user?.fullName?.split(' ')[0] || 'Patient';

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
            Welcome back, {firstName}! 💪
          </h1>
          <p className="text-muted-foreground">
            Here's your health overview and upcoming appointments
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

        {/* Health Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Health Metrics</h2>
            <Button variant="secondary" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Reading
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {healthMetrics.map(function(metric, i) {
              return (
                <HealthMetricCard key={metric.title} {...metric} delay={0.5 + i * 0.05} />
              );
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Book New
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map(function(apt, i) {
                return (
                  <AppointmentCard key={i} {...apt} delay={0.7 + i * 0.1} />
                );
              })}
            </div>
          </motion.div>

          {/* Medical Records */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Medical Records</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {medicalRecords.map(function(record, i) {
                return (
                  <MedicalRecordCard key={i} {...record} delay={0.8 + i * 0.1} />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Health Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 p-6 bg-card rounded-2xl border border-border"
        >
          <h2 className="text-xl font-semibold mb-4">💡 Daily Health Tip</h2>
          <p className="text-muted-foreground">
            Stay hydrated! Drinking 8 glasses of water daily helps maintain energy levels, 
            supports digestion, and keeps your skin healthy. Consider setting reminders 
            throughout the day to ensure you're meeting your hydration goals.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default PatientDashboard;
