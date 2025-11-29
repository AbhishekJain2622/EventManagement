import { motion } from 'framer-motion';
import { CalendarCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import GlassCard from '../components/common/GlassCard.jsx';

const features = [
  {
    title: 'Smart Scheduling',
    description: 'Coordinate tasks, vendors, and timelines in one collaborative hub with automated reminders.',
    icon: CalendarCheck,
    details: [
      'Automated timeline generation based on event type',
      'Real-time synchronization across all team members',
      'Smart conflict detection and resolution',
      'Customizable reminder system',
      'Integration with popular calendar apps',
    ],
  },
  {
    title: 'Team Collaboration',
    description: 'Invite teammates and stakeholders, assign responsibilities, and share progress in real time.',
    icon: Users,
    details: [
      'Role-based access control',
      'Real-time collaboration tools',
      'Comment threads on tasks and events',
      'Team activity feed',
      'File sharing and document management',
    ],
  },
  {
    title: 'AI Suggestions',
    description: 'Receive intelligent recommendations for vendors, budgets, and contingency planning powered by insights.',
    icon: Sparkles,
    details: [
      'AI-powered vendor recommendations',
      'Budget optimization suggestions',
      'Risk assessment and mitigation strategies',
      'Timeline optimization based on historical data',
      'Personalized planning insights',
    ],
  },
];

const FeaturesPage = () => {
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
              Features
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Discover how PlanSync transforms event planning with powerful features designed for modern teams.
          </p>
        </motion.div>
      </section>
<section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
  {features.map(({ title, description, icon: Icon, details }, index) => (
    <GlassCard
      key={title}
      delay={index * 0.1}
      className="overflow-hidden h-full p-6 flex flex-col"
    >
      {/* Top: Icon + Title + Description */}
      <div className="flex flex-col items-center text-center mb-6">
        
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl 
          bg-gradient-to-br from-primary/20 to-secondary/20 shadow-md">
          <Icon className="h-10 w-10 text-primary" />
        </span>

        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-slate-300/40 dark:bg-slate-600/40 my-4" />

      {/* Bottom: Key Capabilities */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Key Capabilities
        </h3>

        <ul className="space-y-2">
          {details.map((detail, idx) => (
            <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm">
              <span className="h-2.5 w-2.5 mt-1 rounded-full bg-primary flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  ))}
</section>


      <section className="rounded-3xl bg-gradient-to-br from-primary/20 via-white/90 to-secondary/20 p-8 text-center shadow-2xl backdrop-blur-xl dark:from-primary/10 dark:via-slate-900/90 dark:to-secondary/10 sm:p-12">
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Join thousands of event planners who trust PlanSync for their most important events.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="group rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-primary/70"
          >
            Start Planning Now
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

export default FeaturesPage;

