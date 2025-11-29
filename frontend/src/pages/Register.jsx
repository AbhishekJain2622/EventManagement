import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authError, isAuthenticating } = useAuth();
  const [formState, setFormState] = useState(initialForm);
  const [formError, setFormError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    if (formState.password !== formState.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    try {
      await register({
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        password: formState.password,
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <GlassCard className="w-full max-w-4xl p-0">
        <div className="grid overflow-hidden rounded-3xl bg-white/80 shadow-inner dark:bg-black/80 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden flex-col justify-between bg-gradient-to-br from-secondary/30 via-white/50 to-primary/30 p-10 text-slate-800 backdrop-blur-sm dark:from-secondary/20 dark:via-slate-900/80 dark:to-primary/20 md:flex"
          >
            <div>
              <h2 className="font-display text-3xl font-semibold">Create your planning hub</h2>
              <p className="mt-4 text-sm text-slate-700/80">
                Unlock collaborative timelines, smart task assignments, and analytics that keep your events stress-free.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <li className="rounded-3xl border border-white/30 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-black/70">
                Unlimited events with real-time updates
              </li>
              <li className="rounded-3xl border border-white/30 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-black/70">
                Shareable dashboards for clients and partners
              </li>
              <li className="rounded-3xl border border-white/30 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-black/70">
                Visual analytics to optimize your planning cadence
              </li>
            </ul>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-10"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Join PlanSync</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                Set up your workspace in under a minute.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput label="First name" name="first_name" value={formState.first_name} onChange={handleChange} />
              <FormInput label="Last name" name="last_name" value={formState.last_name} onChange={handleChange} />
            </div>
            <FormInput
              label="Work email"
              type="email"
              name="email"
              value={formState.email}
              placeholder="hello@plansync.com"
              onChange={handleChange}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              <FormInput
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {(formError || authError) && (
              <p className="rounded-3xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary dark:border-secondary/40 dark:bg-secondary/20">
                {formError || authError}
              </p>
            )}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="rounded-full bg-gradient-to-r from-secondary to-primary px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-secondary/70 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {isAuthenticating ? 'Creating account...' : 'Create account'}
            </button>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline dark:text-secondary">
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </GlassCard>
    </div>
  );
};

export default RegisterPage;
