import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from './components/ui/sonner';
import LandingPage from './components/LandingPage';
import EmployerOnboarding from './components/EmployerOnboarding';
import EmployerLogin from './components/EmployerLogin';
import ForgotPassword from './components/ForgotPassword';
import EmployerDashboard from './components/EmployerDashboard';
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import UserForgotPassword from './components/UserForgotPassword';
import UserDashboard from './components/UserDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Employer Routes */}
        <Route path="/employer/signup" element={<EmployerOnboarding />} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/forgot-password" element={<ForgotPassword />} />
        <Route path="/employer/dashboard/*" element={<EmployerDashboard />} />

        {/* User/Job Seeker Routes */}
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/forgot-password" element={<UserForgotPassword />} />
        <Route path="/user/dashboard/*" element={<UserDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}