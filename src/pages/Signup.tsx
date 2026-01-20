import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import { getRedirectPath } from '@/lib/auth';
import { Check } from 'lucide-react';

function Signup() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated, user } = useAuth();
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

    const result = signup(
      data.fullName,
      data.email,
      data.password,
      data.role
    );
    setIsLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user) {
      navigate(getRedirectPath(result.user.role));
    }
  }

  // features list
  const features = [
    'Role-based access control',
    'Secure patient data management',
    'Real-time appointment scheduling',
    'Comprehensive health records',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-primary-foreground max-w-md"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-5xl font-bold mb-4">CURADOCS</h2>
            <div className="w-24 h-1 bg-primary-foreground/30 rounded-full" />
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-primary-foreground/80 mb-10"
          >
            Join our healthcare platform and experience seamless medical management.
          </motion.p>
          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {features.map(function(feature, i) {
              return (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-primary-foreground/90">{feature}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
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
              Create your account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Get started with CURADOCS today
            </motion.p>
          </div>

          <AuthForm
            type="signup"
            onSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6 text-sm text-muted-foreground"
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-foreground font-medium hover:underline"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
