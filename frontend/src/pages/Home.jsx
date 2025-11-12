import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CalendarCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import GlassCard from '../components/common/GlassCard.jsx';
import api from '../utils/api.js';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'Coordinate tasks, vendors, and timelines in one collaborative hub with automated reminders.',
    icon: CalendarCheck,
  },
  {
    title: 'Team Collaboration',
    description: 'Invite teammates and stakeholders, assign responsibilities, and share progress in real time.',
    icon: Users,
  },
  {
    title: 'AI Suggestions',
    description: 'Receive intelligent recommendations for vendors, budgets, and contingency planning powered by insights.',
    icon: Sparkles,
  },
];

const testimonials = [
  {
    quote: 'PlanSync transformed the way our agency coordinates conferences. We launch flawlessly every time!',
    name: 'Amelia Rivers',
    role: 'Director, Horizon Events',
  },
  {
    quote: 'The collaborative dashboard keeps everyone aligned. No more chaotic chats or lost spreadsheets.',
    name: 'Jordan Blake',
    role: 'Operations Lead, Gather & Glow',
  },
  {
    quote: 'Switching between client and team views is seamless. PlanSync is our secret weapon for stress-free events.',
    name: 'Priya Desai',
    role: 'Founder, Crafted Occasions',
  },
];

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      setIsLoadingEvents(true);
      try {
        const { data } = await api.get('/events/');
        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        console.error('Failed to load events', error);
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestEvents = events.slice(0, 6);

  return (
    <div className="space-y-24">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-white to-secondary/20 p-10 text-center shadow-xl dark:from-primary/10 dark:via-slate-900 dark:to-secondary/10">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
          PlanSync – Smart Planning for Stress-Free Events
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Plan, orchestrate, and celebrate with confidence. PlanSync centralizes your timelines, communication, and analytics so every event feels effortless.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-primary px-10 py-3 text-lg font-semibold text-white shadow-xl shadow-primary/40 transition hover:-translate-y-1 hover:shadow-primary/60 dark:bg-secondary"
          >
            Start Planning Now
          </Link>
          <a
            href="#features"
            className="rounded-full border border-primary/30 px-8 py-3 text-lg font-semibold text-primary transition hover:-translate-y-1 hover:bg-white/60 dark:border-secondary/30 dark:text-secondary"
          >
            Discover Features
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-white/50 blur-3xl dark:bg-slate-800/60"
      />
    </section>

    <section id="features" className="space-y-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Beautifully organized planning</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          PlanSync blends pastel gradients, glass cards, and fluid motion to keep complex events simple and inspiring.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map(({ title, description, icon: Icon }, index) => (
          <GlassCard key={title} delay={index * 0.1} className="flex flex-col gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary dark:bg-secondary/20 dark:text-secondary">
              <Icon className="h-7 w-7" />
            </span>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300">{description}</p>
          </GlassCard>
        ))}
      </div>
    </section>

    <section id="events" className="space-y-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">See what’s coming up</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Explore upcoming events added by the PlanSync community. Sign in to publish your own milestones.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {isLoadingEvents && (
          <GlassCard className="col-span-full flex items-center justify-center text-slate-500 dark:text-slate-300">
            Loading events...
          </GlassCard>
        )}
        {!isLoadingEvents && latestEvents.length === 0 && (
          <GlassCard className="col-span-full flex flex-col items-center gap-2 text-center text-slate-500 dark:text-slate-300">
            <span className="text-lg font-semibold text-slate-700 dark:text-slate-100">No events yet.</span>
            <span>Sign in to be the first to share what you’re planning.</span>
          </GlassCard>
        )}
        {!isLoadingEvents &&
          latestEvents.map((event, index) => (
            <GlassCard key={event.id} delay={index * 0.05} className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-secondary">
                {format(new Date(event.event_date), 'PPPP • p')}
              </span>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{event.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{event.description || 'Stay tuned for details.'}</p>
              <span className="mt-auto text-sm text-slate-500 dark:text-slate-300">
                Hosted by {event.created_by_name || event.created_by_email || 'a PlanSync member'}
              </span>
            </GlassCard>
          ))}
      </div>
    </section>

    <section id="testimonials" className="space-y-10">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Trusted by event teams</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Hear from planners using PlanSync to streamline weddings, conferences, and corporate experiences around the globe.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map(({ quote, name, role }, index) => (
          <GlassCard key={name} delay={index * 0.1} className="flex flex-col gap-4">
            <p className="text-lg text-slate-700 dark:text-slate-200">“{quote}”</p>
            <div className="mt-auto text-sm text-slate-500 dark:text-slate-300">
              <p className="font-semibold text-slate-700 dark:text-slate-100">{name}</p>
              <p>{role}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>

    <section id="contact" className="grid gap-10 rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-xl dark:bg-slate-900/70 md:grid-cols-2">
      <div className="space-y-6">
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Let’s craft something unforgettable</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Share your event goals and our team will reach out within one business day with a tailored walkthrough.
        </p>
        <div className="rounded-2xl border border-white/30 bg-white/50 p-6 text-sm text-slate-600 shadow-inner dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
          <p className="font-semibold">Prefer email?</p>
          <p>hello@plansync.com</p>
          <p className="mt-2 font-semibold">Or call</p>
          <p>+1 (234) 567-890</p>
        </div>
      </div>
      <form className="space-y-4 rounded-3xl border border-white/20 bg-white/70 p-8 shadow-xl dark:border-white/10 dark:bg-slate-900/60">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Name
          <input
            type="text"
            placeholder="How should we address you?"
            className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-slate-900"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Email
          <input
            type="email"
            placeholder="you@company.com"
            className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-slate-900"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Event vision
          <textarea
            placeholder="Tell us about your event and timeline..."
            rows={4}
            className="rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-slate-900"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-secondary px-8 py-3 text-lg font-semibold text-white shadow-xl shadow-secondary/40 transition hover:-translate-y-1 hover:shadow-secondary/60"
        >
          Request a demo
        </button>
      </form>
    </section>
  </div>
  );
};

export default HomePage;
