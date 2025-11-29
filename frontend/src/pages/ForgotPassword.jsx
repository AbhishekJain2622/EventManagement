import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import FormInput from '../components/common/FormInput.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setError(null);
    try {
      await requestPasswordReset(email);
      setStatus('If your email exists in our records, you will receive a reset link shortly.');
      setEmail('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to process your request at this time.');
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GlassCard className="w-full max-w-2xl p-0">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white/80 p-10 shadow-inner dark:bg-black/80"
        >
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Forgot your password?</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          <div className="mt-8">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@plansync.com"
            />
          </div>
          {status && <p className="mt-4 rounded-3xl bg-primary/10 px-4 py-3 text-sm text-primary">{status}</p>}
          {error && <p className="mt-4 rounded-3xl bg-secondary/10 px-4 py-3 text-sm text-secondary">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70"
          >
            Send reset link
          </button>
          <Link to="/login" className="mt-6 block text-center text-sm font-semibold text-primary hover:underline dark:text-secondary">
            Back to login
          </Link>
        </motion.form>
      </GlassCard>
    </div>
  );
};

export default ForgotPasswordPage;
