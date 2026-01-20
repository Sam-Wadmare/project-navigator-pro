import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import { getRedirectPath } from '@/lib/auth';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // redirect if already logged in
  useEffect(function() {
    if (isAuthenticated && user) {
      navigate(getRedirectPath(user.role));
    }
  }, [isAuthenticated, user, navigate]);

  // handle form submit
  async function handleSubmit(data) {
    setError('');
    setIsLoading(true);

    // simulate network delay
    await new Promise(function(resolve) {
      setTimeout(resolve, 800);
    });

    const result = login(data.email, data.password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user) {
      navigate(getRedirectPath(result.user.role));
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold mb-2"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Sign in to access your dashboard
            </motion.p>
          </div>

          <AuthForm
            type="login"
            onSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-sm text-muted-foreground"
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-foreground font-medium hover:underline"
            >
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-primary-foreground"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-5xl font-bold mb-4">CURADOCS</h2>
            <div className="w-24 h-1 bg-primary-foreground/30 mx-auto rounded-full" />
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-primary-foreground/80 max-w-sm"
          >
            Your trusted healthcare management platform
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-8 text-center"
          >
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-primary-foreground/60">Patients</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-primary-foreground/60">Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm text-primary-foreground/60">Appointments</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
