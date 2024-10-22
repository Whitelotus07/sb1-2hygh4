import React, { useState } from 'react';
import { DollarSign, PieChart, AlertCircle } from 'lucide-react';

const BudgetManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'operations', name: 'Operations' },
    { id: 'it', name: 'IT' },
    { id: 'hr', name: 'Human Resources' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budget Management</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Department</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <BudgetCard
            title="Total Budget"
            value="$1,200,000"
            icon={<DollarSign className="text-blue-500" />}
          />
          <BudgetCard
            title="Spent"
            value="$780,000"
            icon={<PieChart className="text-green-500" />}
          />
          <BudgetCard
            title="Remaining"
            value="$420,000"
            icon={<AlertCircle className="text-yellow-500" />}
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Budget Breakdown</h3>
          <div className="space-y-2">
            <BudgetBar category="Salaries" percentage={40} amount="$480,000" />
            <BudgetBar category="Equipment" percentage={25} amount="$300,000" />
            <BudgetBar category="Marketing" percentage={15} amount="$180,000" />
            <BudgetBar category="Operations" percentage={12} amount="$144,000" />
            <BudgetBar category="Miscellaneous" percentage={8} amount="$96,000" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Budget Insights</h3>
          <ul className="list-disc pl-5">
            <li>Current spending is at 65% of the total budget, which is on track for this time of year.</li>
            <li>The marketing department has used 80% of its allocated budget, consider reviewing for potential overruns.</li>
            <li>IT department has 40% of its budget remaining, potential for reallocation or investment in new projects.</li>
            <li>Overall, the company is operating within budgetary constraints with room for strategic investments.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BudgetCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const BudgetBar = ({ category, percentage, amount }) => {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{category}</span>
        <span>{amount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetManagement;