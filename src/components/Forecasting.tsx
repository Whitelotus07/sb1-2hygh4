import React, { useState } from 'react';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

const Forecasting = () => {
  const [forecastPeriod, setForecastPeriod] = useState('6months');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Financial Forecasting</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Forecast Period</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
            <option value="2years">2 Years</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ForecastCard
            title="Revenue Forecast"
            value="$1,543,000"
            change="+12.5%"
            icon={<TrendingUp className="text-green-500" />}
          />
          <ForecastCard
            title="Expense Forecast"
            value="$1,102,000"
            change="+5.2%"
            icon={<BarChart2 className="text-red-500" />}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Key Forecast Insights</h3>
          <ul className="list-disc pl-5">
            <li>Revenue is projected to grow faster than expenses, improving profitability.</li>
            <li>Cash flow is expected to remain positive throughout the forecast period.</li>
            <li>The company's debt-to-equity ratio is projected to improve by 5%.</li>
            <li>Market share is forecasted to increase by 2.3% in the next {forecastPeriod}.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Forecast Visualization</h3>
          <div className="bg-gray-100 p-4 rounded flex items-center justify-center">
            <PieChart className="w-16 h-16 text-blue-500" />
            <p className="ml-4">Interactive forecast charts and graphs will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForecastCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change} forecasted growth
      </p>
    </div>
  );
};

export default Forecasting;