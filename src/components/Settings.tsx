import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CreditCard } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    companyName: user?.accountType === 'corporate' ? 'Acme Corp' : '',
    email: user?.email || '',
    currency: 'USD',
    fiscalYearEnd: '12-31',
    notifyOnBudgetExceed: true,
    notifyOnCashflowIssues: true,
    twoFactorAuth: false,
  });

  const [subscription, setSubscription] = useState({
    plan: user?.accountType === 'corporate' ? 'Enterprise' : 'Professional',
    billingCycle: 'Monthly',
    nextBillingDate: '2023-06-01',
  });

  const handleSettingChange = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const subscriptionPrices = {
    individual: {
      monthly: 49.99,
      yearly: 499.99,
    },
    corporate: {
      monthly: 199.99,
      yearly: 1999.99,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Settings</h2>
      <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} p-6 rounded-lg shadow-md`}>
        <form onSubmit={handleSaveSettings}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {user?.accountType === 'corporate' && (
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Company Name</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                  value={settings.companyName}
                  onChange={(e) => handleSettingChange('companyName', e.target.value)}
                />
              </div>
            )}
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</label>
              <input
                type="email"
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Currency</label>
              <select
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Fiscal Year End</label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                value={settings.fiscalYearEnd}
                onChange={(e) => handleSettingChange('fiscalYearEnd', e.target.value)}
              />
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
          <div className="space-y-2 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="budgetExceed"
                checked={settings.notifyOnBudgetExceed}
                onChange={(e) => handleSettingChange('notifyOnBudgetExceed', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="budgetExceed" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Notify when budget is exceeded</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cashflowIssues"
                checked={settings.notifyOnCashflowIssues}
                onChange={(e) => handleSettingChange('notifyOnCashflowIssues', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="cashflowIssues" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Notify on potential cash flow issues</label>
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Security</h3>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="twoFactor"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="twoFactor" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Enable Two-Factor Authentication</label>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </motion.button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Subscription</h3>
          <div className={`bg-gray-50 ${theme === 'dark' ? 'bg-gray-700' : ''} p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{subscription.plan} Plan</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Billed {subscription.billingCycle.toLowerCase()}</p>
              </div>
              <CreditCard className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Next billing date: {subscription.nextBillingDate}</p>
            <p className={`text-lg font-semibold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              ${subscriptionPrices[user?.accountType || 'individual'][subscription.billingCycle.toLowerCase()]} / {subscription.billingCycle === 'Monthly' ? 'month' : 'year'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-4 px-4 py-2 ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-opacity-80`}
            >
              Manage Subscription
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;