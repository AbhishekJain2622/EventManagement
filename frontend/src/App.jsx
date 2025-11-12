import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/layout/Footer.jsx';
import Navbar from './components/layout/Navbar.jsx';
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';
import ForgotPasswordPage from './pages/ForgotPassword.jsx';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import UserDashboard from './pages/dashboard/UserDashboard.jsx';

const App = () => (
  <div className="min-h-screen bg-surface-light/80 text-slate-800 transition dark:bg-surface-dark/95 dark:text-slate-100">
    <Navbar />
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-lg font-semibold">
          Loading PlanSync...
        </div>
      }
    >
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Suspense>
    <Footer />
  </div>
);

export default App;
