import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Hexagon } from 'lucide-react';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { resetPassword } = useAuth();
  const { theme } = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
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
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="New Password"
                {...register('password', { required: true, minLength: 6 })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm New Password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (val) => val === watch('password') || "Passwords do not match"
                })}
              />
            </div>
          </div>

          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Password
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;