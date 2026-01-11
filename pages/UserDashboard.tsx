
import React, { useMemo, useState } from 'react';
import { User, Task, TaskCategory } from '../types';
import { getStore } from '../store';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

interface UserDashboardProps {
  user: User;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const { tasks, withdrawals } = getStore();
  const userWithdrawals = withdrawals.filter((w: any) => w.userId === user.id);
  const completedCount = user.completedTasks.length;
  const [copySuccess, setCopySuccess] = useState(false);

  // Task History Mapping
  const taskHistory = useMemo(() => {
    return [...user.completedTasks]
      .reverse() // Newest first
      .map(ct => {
        const taskDef = tasks.find((t: Task) => t.id === ct.taskId);
        return {
          ...ct,
          title: taskDef ? taskDef.title : 'Unknown Task',
          points: taskDef ? taskDef.points : 0,
          category: taskDef ? taskDef.category : 'OTHER'
        };
      });
  }, [user.completedTasks, tasks]);

  // Referral Link Generation
  const referralLink = `${window.location.origin}${window.location.pathname}#/register?ref=${user.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Generate mock data for Earnings Trend (Last 7 Days)
  const earningsTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const basePoints = user.points;
    return days.map((day, index) => ({
      name: day,
      points: Math.max(0, Math.floor(basePoints * (0.4 + (index * 0.1)))),
    }));
  }, [user.points]);

  // Calculate Task Category Distribution
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    const userCompletedTasks = tasks.filter((t: Task) => 
      user.completedTasks.some(ct => ct.taskId === t.id)
    );
    
    userCompletedTasks.forEach((t: Task) => {
      const cat = t.category.replace('_', ' ');
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const data = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    return data.length > 0 ? data : [
      { name: 'YouTube', value: 40 },
      { name: 'Facebook', value: 30 },
      { name: 'TikTok', value: 20 },
      { name: 'Instagram', value: 10 },
    ];
  }, [user.completedTasks, tasks]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'YOUTUBE_WATCH':
      case 'YOUTUBE_SUB': return 'fa-youtube text-red-600';
      case 'FACEBOOK_FOLLOW': return 'fa-facebook text-blue-600';
      case 'TIKTOK_FOLLOW': return 'fa-tiktok text-slate-900';
      case 'INSTAGRAM_LIKE': return 'fa-instagram text-pink-600';
      default: return 'fa-tasks text-indigo-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, <span className="text-indigo-600 font-semibold">{user.fullName}</span></p>
        </div>
        <div className="flex gap-3">
          <Link to="/withdraw" className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition flex items-center gap-2">
             <i className="fas fa-wallet text-indigo-500"></i> Withdraw
          </Link>
          <Link to="/tasks" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all hover:-translate-y-0.5">
             <i className="fas fa-rocket"></i> Earn Points
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Point Balance', value: user.points, icon: 'fa-star', color: 'indigo', detail: 'Points' },
          { label: 'Completed', value: completedCount, icon: 'fa-check-circle', color: 'emerald', detail: 'Tasks' },
          { label: 'Cash Value', value: `Rs. ${(user.points / 10).toFixed(0)}`, icon: 'fa-money-bill-wave', color: 'blue', detail: 'PKR' },
          { label: 'Referrals', value: user.referralCount || 0, icon: 'fa-users', color: 'purple', detail: 'Users' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center text-xl`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{item.value}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 mb-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">Refer & Earn Bonus Points</h2>
            <p className="text-indigo-100 mb-6">Invite your friends and earn <span className="font-bold text-white">500 points</span> for every verified signup. Your friends also get a <span className="font-bold text-white">200 points</span> headstart!</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 font-mono text-sm overflow-hidden truncate">
                {referralLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className={`px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${copySuccess ? 'bg-emerald-500 text-white' : 'bg-white text-indigo-600 hover:bg-slate-50'}`}
              >
                <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'}`}></i>
                {copySuccess ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center w-64">
              <div className="text-4xl font-black mb-1">{user.referralCount || 0}</div>
              <div className="text-xs uppercase font-bold tracking-widest opacity-70">Total Referrals</div>
              <div className="mt-4 flex justify-center -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[10px]">
                    <i className="fas fa-user"></i>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                  +{user.referralCount || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Earnings History (7 Days)</h3>
            <div className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold">Points Growth</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTrendData}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPoints)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Tasks by Category</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-6 border-t border-slate-50 text-center">
             <p className="text-xs text-slate-400 font-medium">Keep completing variety of tasks to unlock premium rewards.</p>
          </div>
        </div>
      </div>

      {/* Task History & Recent Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Task History */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-800">Task History</h3>
             <Link to="/tasks" className="text-xs text-indigo-600 font-bold hover:underline">Find More Tasks</Link>
          </div>
          <div className="p-0">
             {taskHistory.length > 0 ? (
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="bg-slate-50/50 text-slate-400 font-semibold text-[10px] uppercase tracking-widest">
                     <th className="px-8 py-4">Task</th>
                     <th className="px-8 py-4">Points</th>
                     <th className="px-8 py-4 text-right">Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {taskHistory.slice(0, 8).map((th, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs">
                             <i className={`fab ${getCategoryIcon(th.category)}`}></i>
                           </div>
                           <div className="truncate max-w-[150px] font-medium text-slate-800">{th.title}</div>
                         </div>
                       </td>
                       <td className="px-8 py-4 font-bold text-indigo-600">+{th.points}</td>
                       <td className="px-8 py-4 text-right text-slate-500 text-xs">
                         {new Date(th.completedAt).toLocaleDateString()}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             ) : (
               <div className="p-16 text-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-list-check text-2xl"></i>
                  </div>
                  <p className="text-sm">No tasks completed yet.</p>
               </div>
             )}
          </div>
        </div>

        {/* Recent Withdrawals */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-800">Withdrawal Requests</h3>
             <Link to="/withdraw" className="text-xs text-indigo-600 font-bold hover:underline">New Request</Link>
          </div>
          <div className="p-0">
             {userWithdrawals.length > 0 ? (
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="bg-slate-50/50 text-slate-400 font-semibold text-[10px] uppercase tracking-widest">
                     <th className="px-8 py-4">Date</th>
                     <th className="px-8 py-4">Amount</th>
                     <th className="px-8 py-4 text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {userWithdrawals.slice(0, 5).map((w: any) => (
                     <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-4 text-slate-500">{new Date(w.requestedAt).toLocaleDateString()}</td>
                       <td className="px-8 py-4 font-bold text-slate-900">Rs. {w.amount}</td>
                       <td className="px-8 py-4 text-right">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                           w.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                           w.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                         }`}>
                           {w.status}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             ) : (
               <div className="p-16 text-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-history text-2xl"></i>
                  </div>
                  <p className="text-sm">No transaction history found.</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Goal Progress Section (Single Row) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-slate-800">Goal Progress</h3>
           <span className="text-xs font-bold text-indigo-600">Level 1 Earner</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                   <div className="text-sm font-semibold text-slate-600">Points Milestone (10,000 pts)</div>
                   <div className="text-xs font-bold text-slate-400">{((user.points / 10000) * 100).toFixed(1)}%</div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                   <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-indigo-200" style={{ width: `${Math.min((user.points / 10000) * 100, 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                   <div className="text-sm font-semibold text-slate-600">Weekly Task Goal (50 tasks)</div>
                   <div className="text-xs font-bold text-slate-400">{Math.min((completedCount / 50) * 100, 100).toFixed(1)}%</div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-100" style={{ width: `${Math.min((completedCount / 50) * 100, 100)}%` }}></div>
                </div>
              </div>
           </div>

           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-xl">
                    <i className="fas fa-trophy"></i>
                 </div>
                 <div>
                    <div className="text-base font-bold text-slate-800">Next Reward: Bronze Rank</div>
                    <p className="text-sm text-slate-500">Reach 5,000 points to unlock 10% bonus on all tasks and priority withdrawals.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
