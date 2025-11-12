import { motion } from 'framer-motion';

const StatsCard = ({ label, value, trend = null, accent = 'primary' }) => {
  const trendColor = trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-rose-500' : 'text-slate-400';
  const accentClass =
    accent === 'secondary'
      ? 'from-secondary/20 via-white/50 to-primary/10 text-secondary'
      : 'from-primary/20 via-white/50 to-secondary/10 text-primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-3xl border border-white/20 bg-gradient-to-br ${accentClass} p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:text-white`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      {trend !== null && (
        <p className={`mt-2 text-xs font-medium ${trendColor}`}>
          {trend > 0 ? `▲ ${trend}% vs last week` : trend < 0 ? `▼ ${Math.abs(trend)}% vs last week` : '— steady'}
        </p>
      )}
    </motion.div>
  );
};

export default StatsCard;
