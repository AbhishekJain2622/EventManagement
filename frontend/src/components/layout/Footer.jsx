const Footer = () => (
  <footer className="mt-20 border-t border-white/30 bg-white/40 py-10 text-sm text-slate-500 backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-400">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
      <p>© {new Date().getFullYear()} PlanSync. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="mailto:hello@plansync.com" className="hover:text-primary dark:hover:text-accent">
          hello@plansync.com
        </a>
        <span className="hidden h-3 w-3 rounded-full bg-secondary/60 md:inline-flex" />
        <a href="tel:+123456789" className="hover:text-primary dark:hover:text-accent">
          +1 (234) 567-890
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
