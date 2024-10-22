import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const SubscriptionPlans = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const plans = [
    {
      name: 'Basic',
      price: { individual: 49.99, corporate: 199.99 },
      features: [
        'Financial dashboard',
        'Basic reporting',
        'Limited forecasting',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: { individual: 99.99, corporate: 399.99 },
      features: [
        'All Basic features',
        'Advanced reporting',
        'Full forecasting capabilities',
        'Team management',
        'Priority email support',
      ],
    },
    {
      name: 'Enterprise',
      price: { individual: 199.99, corporate: 799.99 },
      features: [
        'All Pro features',
        'Custom integrations',
        'Dedicated account manager',
        'On-demand financial consulting',
        '24/7 phone support',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h2 className="text-3xl font-bold mb-6">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.05 }}
            className={`rounded-lg shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className={`p-6 ${index === 1 ? 'bg-blue-600 text-white' : ''}`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">
                ${plan.price[user?.accountType || 'individual']}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check size={20} className="mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2 rounded ${
                  index === 1
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {user?.subscriptionStatus === 'active' && user?.subscriptionPlan === plan.name
                  ? 'Current Plan'
                  : 'Choose Plan'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SubscriptionPlans;