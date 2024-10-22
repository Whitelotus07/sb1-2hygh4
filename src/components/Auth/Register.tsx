import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Hexagon } from 'lucide-react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: authRegister } = useAuth();
  const { theme } = useTheme();
  const [accountType, setAccountType] = useState('individual');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authRegister(data.email, data.password, data.name, accountType);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`max-w-md w-full space-y-8 p-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}
      >
        <div className="flex flex-col items-center">
          <Hexagon className={`w-16 h-16 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Full name"
                {...register('name', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                {...register('password', { required: true, minLength: 6 })}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Account Type</label>
            <div className="mt-2 flex justify-center">
              <div className="flex items-center mr-4">
                <input
                  id="individual"
                  name="accountType"
                  type="radio"
                  checked={accountType === 'individual'}
                  onChange={() => setAccountType('individual')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="individual" className={`ml-3 block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Individual
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="corporate"
                  name="accountType"
                  type="radio"
                  checked={accountType === 'corporate'}
                  onChange={() => setAccountType('corporate')}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="corporate" className={`ml-3 block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Corporate
                </label>
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </motion.button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className={`font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
            Already have an account? Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;