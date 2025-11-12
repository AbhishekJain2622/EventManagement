import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0.05 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`glass-card rounded-3xl border border-white/20 bg-white/50 p-6 dark:border-white/10 dark:bg-slate-900/60 ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
