import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import GlassCard from '../components/common/GlassCard.jsx';

const testimonials = [
  {
    quote: 'PlanSync transformed the way our agency coordinates conferences. We launch flawlessly every time!',
    name: 'Amelia Rivers',
    role: 'Director, Horizon Events',
    company: 'Horizon Events',
    image: 'AR',
    rating: 5,
  },
  {
    quote: 'The collaborative dashboard keeps everyone aligned. No more chaotic chats or lost spreadsheets.',
    name: 'Jordan Blake',
    role: 'Operations Lead, Gather & Glow',
    company: 'Gather & Glow',
    image: 'JB',
    rating: 5,
  },
  {
    quote: 'Switching between client and team views is seamless. PlanSync is our secret weapon for stress-free events.',
    name: 'Priya Desai',
    role: 'Founder, Crafted Occasions',
    company: 'Crafted Occasions',
    image: 'PD',
    rating: 5,
  },
  {
    quote: 'The analytics dashboard gives us insights we never had before. We can now optimize our planning process based on real data.',
    name: 'Marcus Chen',
    role: 'Event Manager, Corporate Solutions',
    company: 'Corporate Solutions Inc.',
    image: 'MC',
    rating: 5,
  },
  {
    quote: 'PlanSync saved us countless hours on our last major event. The automated reminders alone are worth the subscription.',
    name: 'Sarah Johnson',
    role: 'Wedding Planner, Elegant Affairs',
    company: 'Elegant Affairs',
    image: 'SJ',
    rating: 5,
  },
  {
    quote: 'As someone who manages multiple events simultaneously, PlanSync is a game-changer. The organization tools are incredible.',
    name: 'David Rodriguez',
    role: 'Conference Coordinator, Tech Summit',
    company: 'Tech Summit Events',
    image: 'DR',
    rating: 5,
  },
];

const TestimonialsPage = () => {
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
              Testimonials
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Hear from event planners and teams who have transformed their workflow with PlanSync.
          </p>
        </motion.div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role, company, image, rating }, index) => (
            <GlassCard key={name} delay={index * 0.1} className="flex flex-col gap-5 transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 text-lg font-bold text-primary dark:from-primary/30 dark:to-secondary/30 dark:text-primary">
                  {image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed">"{quote}"</p>
              <div className="mt-auto border-t border-primary/10 pt-4 dark:border-primary/20">
                <p className="font-bold text-slate-800 dark:text-slate-100">{name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{company}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-primary/20 via-white/90 to-secondary/20 p-8 text-center shadow-2xl backdrop-blur-xl dark:from-primary/10 dark:via-slate-900/90 dark:to-secondary/10 sm:p-12">
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Join our satisfied customers
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Experience the difference PlanSync can make for your events.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="group rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70"
          >
            Start Your Free Trial
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/"
            className="rounded-full border-2 border-primary/40 bg-white/80 px-8 py-4 text-lg font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-white/90 dark:border-secondary/40 dark:bg-black/80 dark:text-secondary dark:hover:bg-black/90"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;

