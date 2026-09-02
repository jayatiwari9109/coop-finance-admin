import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const topMetrics = [
    { title: 'Total Customers', value: '12,543', progress: 75, limit: '11,156', change: '+12.5%', color: 'bg-[#0284c7]', route: '/customers' },
    { title: 'Total Products / RD', value: '3,842', progress: 62, limit: '3,551', change: '+8.2%', color: 'bg-emerald-500', route: '/rd' },
    { title: 'Today Collections', value: '9,238', progress: 85, limit: '8,012', change: '+15.3%', color: 'bg-amber-500', route: '/deposits' },
    { title: 'Total Revenue', value: '₹ 2.4M', progress: 90, limit: '₹ 1.95M', change: '+23.1%', color: 'bg-purple-500', route: '/reports' },
  ];

  const quickActions = [
    { label: 'Add Customer', sub: 'Create new profile', bg: 'bg-[#0284c7]', route: '/customers' },
    { label: 'Approve Loans', sub: 'Review pending', bg: 'bg-[#10b981]', route: '/loans' },
    { label: 'View Reports', sub: 'Analyze data', bg: 'bg-[#f97316]', route: '/reports' },
    { label: 'Settings', sub: 'Configure system', bg: 'bg-[#a855f7]', route: '/reconciliation' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Banner Actions */}
      <div className="bg-[#026aa7] text-white p-4 sm:p-6 rounded-2xl shadow-md space-y-4 sm:space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Welcome back, Admin</h1>
            <span className="bg-white/15 backdrop-blur-sm text-sky-100 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium border border-white/10">
              Wednesday, September 2, 2026
            </span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button 
              onClick={() => alert('Exporting report...')}
              className="px-3 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all border border-white/20 cursor-pointer"
            >
              Export
            </button>
            <button 
              onClick={handleRefresh}
              className={`px-3 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all border border-white/20 cursor-pointer ${
                isRefreshing ? 'animate-pulse opacity-70' : ''
              }`}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        <p className="text-xs text-sky-100 font-normal">
          Here's your platform performance overview
        </p>

        {/* Mini Glass Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          <div className="bg-[#014f7c]/50 backdrop-blur-md border border-white/10 p-3 sm:p-3.5 rounded-xl hover:bg-[#014f7c]/70 transition-all cursor-pointer" onClick={() => navigate('/deposits')}>
            <span className="text-[11px] text-sky-200 font-medium block">Today's Collections</span>
            <span className="text-lg sm:text-xl font-extrabold block my-0.5">47</span>
            <span className="text-[10px] text-emerald-300 font-semibold">+12% from yesterday</span>
          </div>

          <div className="bg-[#014f7c]/50 backdrop-blur-md border border-white/10 p-3 sm:p-3.5 rounded-xl hover:bg-[#014f7c]/70 transition-all cursor-pointer" onClick={() => navigate('/customers')}>
            <span className="text-[11px] text-sky-200 font-medium block">New Customers</span>
            <span className="text-lg sm:text-xl font-extrabold block my-0.5">23</span>
            <span className="text-[10px] text-emerald-300 font-semibold">+8% from yesterday</span>
          </div>

          <div className="bg-[#014f7c]/50 backdrop-blur-md border border-white/10 p-3 sm:p-3.5 rounded-xl hover:bg-[#014f7c]/70 transition-all cursor-pointer" onClick={() => navigate('/reports')}>
            <span className="text-[11px] text-sky-200 font-medium block">Revenue Today</span>
            <span className="text-lg sm:text-xl font-extrabold block my-0.5">₹ 84K</span>
            <span className="text-[10px] text-emerald-300 font-semibold">+16% from yesterday</span>
          </div>

          <div className="bg-[#014f7c]/50 backdrop-blur-md border border-white/10 p-3 sm:p-3.5 rounded-xl hover:bg-[#014f7c]/70 transition-all cursor-pointer" onClick={() => navigate('/reconciliation')}>
            <span className="text-[11px] text-sky-200 font-medium block">Collection Rate</span>
            <span className="text-lg sm:text-xl font-extrabold block my-0.5">93.2%</span>
            <span className="text-[10px] text-emerald-300 font-semibold">+0.4% target met</span>
          </div>
        </div>
      </div>

      {/* Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {topMetrics.map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(card.route)}
            className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer active:scale-98"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">{card.title}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {card.change}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{card.value}</h2>
            
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className={`${card.color} h-full rounded-full`} style={{ width: `${card.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>vs last month</span>
                <span>{card.limit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Quick Actions</h3>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((act, i) => (
            <div
              key={i}
              onClick={() => navigate(act.route)}
              className={`${act.bg} text-white p-4 rounded-xl shadow-xs hover:opacity-90 active:scale-98 transition-all cursor-pointer flex flex-col justify-end h-20`}
            >
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">{act.label}</h4>
                <p className="text-[10px] text-white/80">{act.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}