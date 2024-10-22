import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FinancialReports from './components/FinancialReports';
import Forecasting from './components/Forecasting';
import BudgetManagement from './components/BudgetManagement';
import TeamManagement from './components/TeamManagement';
import Settings from './components/Settings';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import PrivateRoute from './components/Auth/PrivateRoute';
import AIAssistant from './components/AIAssistant';
import ContactSupport from './components/ContactSupport';
import SubscriptionPlans from './components/SubscriptionPlans';

function App() {
  const { theme } = useTheme();
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        {user && <Navbar />}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/reports" element={
              <PrivateRoute>
                <FinancialReports />
              </PrivateRoute>
            } />
            <Route path="/forecasting" element={
              <PrivateRoute>
                <Forecasting />
              </PrivateRoute>
            } />
            <Route path="/budget" element={
              <PrivateRoute>
                <BudgetManagement />
              </PrivateRoute>
            } />
            <Route path="/team" element={
              <PrivateRoute>
                <TeamManagement />
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
            <Route path="/ai-assistant" element={
              <PrivateRoute>
                <AIAssistant />
              </PrivateRoute>
            } />
            <Route path="/contact-support" element={
              <PrivateRoute>
                <ContactSupport />
              </PrivateRoute>
            } />
            <Route path="/subscription-plans" element={
              <PrivateRoute>
                <SubscriptionPlans />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <ToastContainer position="bottom-right" theme={theme} />
      </div>
    </Router>
  );
}

export default App;