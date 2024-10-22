import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, Hexagon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/', text: 'Dashboard' },
    { to: '/reports', text: 'Reports' },
    { to: '/forecasting', text: 'Forecasting' },
    { to: '/budget', text: 'Budget' },
    { to: '/team', text: 'Team' },
    { to: '/ai-assistant', text: 'AI Assistant' },
    { to: '/settings', text: 'Settings' },
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Hexagon className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`ml-2 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`}>
                  Beekeeper
                </span>
              </motion.div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} text={item.text} isActive={location.pathname === item.to} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              onClick={logout}
              className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut size={20} />
            </motion.button>
            <div className={`ml-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {user?.name}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text, isActive }) => {
  const { theme } = useTheme();
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-blue-100 text-blue-700'
          : theme === 'dark'
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {text}
    </Link>
  );
};

export default Navbar;