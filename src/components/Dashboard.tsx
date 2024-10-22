import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
];

const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Financial Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Revenue"
          value="$1,234,567"
          icon={<DollarSign className="text-green-500" />}
          change="+8.2%"
        />
        <DashboardCard
          title="Expenses"
          value="$876,543"
          icon={<TrendingUp className="text-red-500" />}
          change="+3.1%"
        />
        <DashboardCard
          title="Net Profit"
          value="$358,024"
          icon={<BarChart2 className="text-blue-500" />}
          change="+12.5%"
        />
        <DashboardCard
          title="Cash Flow"
          value="$152,890"
          icon={<AlertCircle className="text-yellow-500" />}
          change="-2.3%"
        />
      </div>
      <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} rounded-lg shadow-lg p-6 mb-8`}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#ffffff' : '#000000',
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} rounded-lg shadow-lg p-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Key Financial Insights</h3>
        <ul className={`list-disc pl-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
          <li>Revenue growth is outpacing expense growth, indicating improved profitability.</li>
          <li>Cash flow has decreased slightly, consider reviewing accounts receivable processes.</li>
          <li>Net profit margin has increased by 2% compared to the previous quarter.</li>
          <li>The company's debt-to-equity ratio remains within the target range.</li>
        </ul>
      </div>
    </motion.div>
  );
};

const DashboardCard = ({ title, value, icon, change }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change} from last month
      </p>
    </motion.div>
  );
};

export default Dashboard;