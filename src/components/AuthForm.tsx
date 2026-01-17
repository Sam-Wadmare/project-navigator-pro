import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: {
    fullName?: string;
    email: string;
    password: string;
    role?: UserRole;
  }) => void;
  error?: string;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, error, isLoading }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'signup' && !fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      fullName: type === 'signup' ? fullName : undefined,
      email,
      password,
      role: type === 'signup' ? role : undefined,
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {type === 'signup' && (
        <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
          <Label htmlFor="fullName" className="text-sm font-medium mb-2 block">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={cn(
                "pl-10 h-12 bg-secondary/50 border-border focus:border-primary transition-colors",
                errors.fullName && "border-destructive"
              )}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
          )}
        </motion.div>
      )}

      <motion.div custom={type === 'signup' ? 1 : 0} variants={inputVariants} initial="hidden" animate="visible">
        <Label htmlFor="email" className="text-sm font-medium mb-2 block">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={cn(
              "pl-10 h-12 bg-secondary/50 border-border focus:border-primary transition-colors",
              errors.email && "border-destructive"
            )}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </motion.div>

      <motion.div custom={type === 'signup' ? 2 : 1} variants={inputVariants} initial="hidden" animate="visible">
        <Label htmlFor="password" className="text-sm font-medium mb-2 block">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={cn(
              "pl-10 pr-10 h-12 bg-secondary/50 border-border focus:border-primary transition-colors",
              errors.password && "border-destructive"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive mt-1">{errors.password}</p>
        )}
      </motion.div>

      {type === 'signup' && (
        <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
          <Label className="text-sm font-medium mb-3 block">
            Select Your Role
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Healthcare provider' },
              { value: 'patient', label: 'Patient', icon: Heart, description: 'Seeking care' },
            ].map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value as UserRole)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  role === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30 hover:border-muted-foreground"
                )}
              >
                {role === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
                <option.icon className={cn(
                  "h-8 w-8 transition-colors",
                  role === option.value ? "text-primary" : "text-muted-foreground"
                )} />
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div custom={type === 'signup' ? 4 : 2} variants={inputVariants} initial="hidden" animate="visible">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
            />
          ) : type === 'login' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default AuthForm;
