import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState('income');

  const reports = [
    { id: 'income', name: 'Income Statement' },
    { id: 'balance', name: 'Balance Sheet' },
    { id: 'cashflow', name: 'Cash Flow Statement' },
    { id: 'profitloss', name: 'Profit & Loss' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
      <div className="flex mb-4">
        {reports.map((report) => (
          <button
            key={report.id}
            className={`mr-2 px-4 py-2 rounded ${
              selectedReport === report.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            {report.name}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {reports.find((r) => r.id === selectedReport)?.name}
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Period</label>
          <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Q1 2023</option>
            <option>Q2 2023</option>
            <option>Q3 2023</option>
            <option>Q4 2023</option>
            <option>Full Year 2023</option>
          </select>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <div className="bg-gray-100 p-4 rounded">
            <FileText className="w-16 h-16 text-gray-400 mx-auto" />
            <p className="text-center mt-2">Report preview will be displayed here</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;