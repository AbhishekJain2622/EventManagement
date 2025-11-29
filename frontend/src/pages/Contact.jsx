import { useState } from 'react';
import { motion } from 'framer-motion';

import GlassCard from '../components/common/GlassCard.jsx';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate form submission
    setStatus('success');
    setTimeout(() => {
      setStatus(null);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-16">
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <GlassCard className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Get in touch
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you're planning a small gathering or a large corporate event, we're here to help you succeed.
            </p>
            <div className="space-y-6">
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 dark:border-primary/20 dark:from-primary/10 dark:to-secondary/10">
                <p className="font-bold text-primary dark:text-primary mb-2">Email</p>
                <a href="mailto:hello@plansync.com" className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors">
                  hello@plansync.com
                </a>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 dark:border-primary/20 dark:from-primary/10 dark:to-secondary/10">
                <p className="font-bold text-primary dark:text-primary mb-2">Phone</p>
                <a href="tel:+1234567890" className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 dark:border-primary/20 dark:from-primary/10 dark:to-secondary/10">
                <p className="font-bold text-primary dark:text-primary mb-2">Office Hours</p>
                <p className="text-slate-700 dark:text-slate-200">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Name
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="How should we address you?"
                  className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Message
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event and timeline..."
                  rows={6}
                  className="rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-black/90 dark:focus:border-primary dark:focus:ring-primary/30"
                  required
                />
              </label>
              {status === 'success' && (
                <div className="rounded-xl bg-emerald-100/70 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-secondary to-primary px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-secondary/70"
              >
                Send Message
              </button>
            </form>
          </GlassCard>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;

