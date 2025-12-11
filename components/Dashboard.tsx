import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Users, Package, AlertCircle } from 'lucide-react';
import { MetricData, ChartDataPoint } from '../types';

const data: ChartDataPoint[] = [
  { name: 'Jan', revenue: 4000, expenses: 2400, efficiency: 70 },
  { name: 'Feb', revenue: 3000, expenses: 1398, efficiency: 65 },
  { name: 'Mar', revenue: 2000, expenses: 5800, efficiency: 40 },
  { name: 'Apr', revenue: 2780, expenses: 3908, efficiency: 55 },
  { name: 'May', revenue: 1890, expenses: 4800, efficiency: 45 },
  { name: 'Jun', revenue: 2390, expenses: 3800, efficiency: 60 },
  { name: 'Jul', revenue: 3490, expenses: 4300, efficiency: 75 },
];

const kpis: MetricData[] = [
  { name: 'Inventory Turnover', value: 4.2, trend: 12, unit: 'x' },
  { name: 'Onboarding Speed', value: 14, trend: 40, unit: 'days' },
  { name: 'OpEx Savings', value: 245, trend: 8.5, unit: '$K' },
  { name: 'Knowledge Retrieval', value: 1.2, trend: 50, unit: 'min' },
];

const MetricCard: React.FC<{ metric: MetricData; icon: React.ReactNode; color: string }> = ({ metric, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {metric.trend >= 0 ? '+' : ''}{metric.trend}%
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.name}</h3>
    <p className="text-2xl font-bold text-slate-800">
      {metric.value}
      <span className="text-sm font-normal text-slate-400 ml-1">{metric.unit}</span>
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Executive Overview</h2>
        <p className="text-slate-500">Real-time operational metrics and AI-driven insights.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard metric={kpis[0]} icon={<Package />} color="bg-blue-500" />
        <MetricCard metric={kpis[1]} icon={<Users />} color="bg-indigo-500" />
        <MetricCard metric={kpis[2]} icon={<TrendingUp />} color="bg-emerald-500" />
        <MetricCard metric={kpis[3]} icon={<AlertCircle />} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue vs Operational Expenses</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Operational Efficiency Index</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{ fill: '#f1f5f9' }}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="efficiency" name="Efficiency Score" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-900 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">AI Implementation Status: 70% Complete</h3>
          <p className="text-indigo-200 max-w-xl">
            Enterprises integrating AI achieve 20-30% inventory reductions. Your current trajectory suggests a full ROI within 4 months.
          </p>
        </div>
        <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-lg">
          Generate Full Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;