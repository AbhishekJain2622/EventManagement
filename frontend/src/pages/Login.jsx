import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authError, isAuthenticating } = useAuth();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState(null);

  const fromPath = location.state?.from?.pathname || '/dashboard';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    try {
      await login(formState);
      navigate(fromPath, { replace: true });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <GlassCard className="w-full max-w-3xl p-0 md:p-0">
        <div className="grid overflow-hidden rounded-3xl bg-white/80 shadow-inner dark:bg-black/80 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden flex-col justify-between bg-gradient-to-br from-primary/30 via-white/50 to-secondary/30 p-10 text-slate-800 backdrop-blur-sm dark:from-primary/20 dark:via-slate-900/80 dark:to-secondary/20 md:flex"
          >
            <div>
              <h2 className="font-display text-3xl font-semibold">Welcome back</h2>
              <p className="mt-4 text-sm text-slate-700/80">
                Your events are synced and waiting. Sign in to continue orchestrating unforgettable experiences with PlanSync.
              </p>
            </div>
            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-sm shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
              <p className="font-semibold text-slate-700 dark:text-slate-200">Admin Login</p>
              <p className="text-slate-600 dark:text-slate-300">admin@plansync.com · admin123</p>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-10"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Sign in to PlanSync</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Enter your credentials to access dashboards, timelines, and reports.
              </p>
            </div>
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formState.email}
              placeholder="you@plansync.com"
              onChange={handleChange}
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formState.password}
              placeholder="********"
              onChange={handleChange}
            />
            {(formError || authError) && (
              <p className="rounded-3xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary dark:border-secondary/40 dark:bg-secondary/20">
                {formError || authError}
              </p>
            )}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {isAuthenticating ? 'Signing in...' : 'Sign in'}
            </button>
            <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-300">
              <Link to="/forgot-password" className="font-semibold text-primary hover:underline dark:text-secondary">
                Forgot your password?
              </Link>
              <span>
                New to PlanSync?{' '}
                <Link to="/register" className="font-semibold text-primary hover:underline dark:text-secondary">
                  Create an account
                </Link>
              </span>
            </div>
          </motion.form>
        </div>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
