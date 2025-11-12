import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { NAV_LINKS } from '../../utils/constants.js';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileOpen(false);

  const navItems = (
    <ul className="flex flex-col gap-6 text-lg font-medium text-slate-600 dark:text-slate-200 md:flex-row md:items-center md:gap-10">
      {NAV_LINKS.map(({ label, href }) => (
        <li key={href}>
          <a href={href} className="hover:text-primary dark:hover:text-accent" onClick={closeMenu}>
            {label}
          </a>
        </li>
      ))}
      {isAuthenticated && (
        <li>
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            onClick={closeMenu}
            className="rounded-full bg-primary px-6 py-2 text-white shadow-lg shadow-primary/40 transition hover:-translate-y-0.5 hover:shadow-primary/50 dark:bg-secondary"
          >
            {isAdmin ? 'Admin Portal' : 'My Planner'}
          </Link>
        </li>
      )}
      {isAuthenticated ? (
        <li>
          <button
            type="button"
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="text-sm font-semibold text-slate-500 hover:text-secondary dark:text-slate-400"
          >
            Log out
          </button>
        </li>
      ) : (
        <li className="flex items-center gap-4">
          <Link
            to="/login"
            onClick={closeMenu}
            className="text-sm font-semibold text-slate-500 hover:text-primary dark:text-slate-300"
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:-translate-y-0.5 hover:shadow-primary/50 dark:bg-secondary"
          >
            Get Started
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-2xl transition dark:border-white/10 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 font-display text-xl font-semibold text-primary dark:text-accent">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
            PS
          </span>
          PlanSync
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/70 text-primary transition hover:shadow-lg dark:border-white/10 dark:bg-slate-800 dark:text-accent md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-4 mb-4 rounded-3xl border border-white/30 bg-white/80 p-6 shadow-glass dark:border-white/10 dark:bg-slate-900/80 md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <ThemeToggle />
              <span className="text-sm text-slate-500 dark:text-slate-300">{location.pathname}</span>
            </div>
            {navItems}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
