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
    <div className="space-y-20 lg:space-y-28">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/30 via-white/90 to-secondary/30 p-8 text-center shadow-2xl backdrop-blur-xl dark:from-primary/20 dark:via-black/90 dark:to-secondary/20 sm:p-12 lg:p-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              PlanSync
            </span>
            <span className="block mt-2 text-slate-800 dark:text-slate-100">Smart Planning for Stress-Free Events</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Plan, orchestrate, and celebrate with confidence. PlanSync centralizes your timelines, communication, and analytics so every event feels effortless.
          </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70"
                >
                  Start Planning Now
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/features"
                  className="rounded-full border-2 border-primary/40 bg-white/80 px-8 py-4 text-lg font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/90 dark:border-secondary/40 dark:bg-black/80 dark:text-secondary dark:hover:bg-black/90"
                >
                  Discover Features
                </Link>
              </div>
        </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl dark:from-primary/20 dark:via-secondary/20 dark:to-primary/20"
            />
          </section>

          {/* <section className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                Beautifully organized planning
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                PlanSync blends modern gradients, glass cards, and fluid motion to keep complex events simple and inspiring.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }, index) => (
                <GlassCard key={title} delay={index * 0.1} className="flex flex-col gap-5 transition-all duration-300 hover:scale-105">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 text-primary shadow-lg dark:from-primary/30 dark:to-secondary/30 dark:text-primary">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
                </GlassCard>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/features"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-white/80 px-8 py-3 font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/90 dark:border-secondary/40 dark:bg-slate-900/80 dark:text-secondary dark:hover:bg-slate-900/90"
              >
                View All Features
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </section> */}

          <section id="events" className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                See what's coming up
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
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
                  <span>Sign in to be the first to share what you're planning.</span>
                </GlassCard>
              )}
              {!isLoadingEvents &&
                latestEvents.map((event, index) => (
                  <GlassCard key={event.id} delay={index * 0.05} className="flex flex-col gap-4 transition-all duration-300 hover:scale-105">
                    <span className="text-xs font-bold uppercase tracking-wide text-primary dark:text-primary">
                      {format(new Date(event.event_date), 'PPPP • p')}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{event.description || 'Stay tuned for details.'}</p>
                    <span className="mt-auto text-sm font-medium text-slate-500 dark:text-slate-400">
                      Hosted by {event.created_by_name || event.created_by_email || 'a PlanSync member'}
                    </span>
                  </GlassCard>
                ))}
            </div>
          </section>

          {/* <section className="space-y-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
                Trusted by event teams
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                Hear from planners using PlanSync to streamline weddings, conferences, and corporate experiences around the globe.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map(({ quote, name, role }, index) => (
                <GlassCard key={name} delay={index * 0.1} className="flex flex-col gap-5 transition-all duration-300 hover:scale-105">
                  <p className="text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed">"{quote}"</p>
                  <div className="mt-auto border-t border-primary/10 pt-4 text-sm dark:border-primary/20">
                    <p className="font-bold text-slate-800 dark:text-slate-100">{name}</p>
                    <p className="text-slate-600 dark:text-slate-400">{role}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-white/80 px-8 py-3 font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/90 dark:border-secondary/40 dark:bg-slate-900/80 dark:text-secondary dark:hover:bg-slate-900/90"
              >
                Read More Testimonials
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </section> */}

          {/* <section className="grid gap-8 rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:bg-black/80 md:grid-cols-2 md:gap-10 md:p-12">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Let's craft something unforgettable
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Share your event goals and our team will reach out within one business day with a tailored walkthrough.
              </p>
              <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 text-sm text-slate-700 shadow-inner dark:border-primary/20 dark:from-primary/10 dark:to-secondary/10 dark:text-slate-200">
                <p className="font-bold text-primary dark:text-primary">Prefer email?</p>
                <p className="mt-1">hello@plansync.com</p>
                <p className="mt-4 font-bold text-primary dark:text-primary">Or call</p>
                <p className="mt-1">+1 (234) 567-890</p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 bg-white/80 px-8 py-3 font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/90 dark:border-secondary/40 dark:bg-slate-900/80 dark:text-secondary dark:hover:bg-slate-900/90"
                >
                  Contact Us
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <div className="glass-card space-y-5 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Quick Contact
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                For detailed inquiries, visit our full contact page.
              </p>
              <Link
                to="/contact"
                className="block w-full rounded-full bg-gradient-to-r from-secondary to-primary px-8 py-4 text-center text-lg font-bold text-white shadow-2xl shadow-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-secondary/70"
              >
                Go to Contact Page
              </Link>
            </div>
          </section> */}
        </div>
  );
};

export default HomePage;
