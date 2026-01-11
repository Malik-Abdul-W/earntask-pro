
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { users, tasks, withdrawals } = getStore();
  
  const stats = [
    { label: 'Total Users', value: users.length, icon: 'fa-users', color: 'bg-blue-500' },
    { label: 'Pending Withdrawals', value: withdrawals.filter((w: any) => w.status === 'PENDING').length, icon: 'fa-clock', color: 'bg-amber-500' },
    { label: 'Total Payouts', value: `Rs. ${withdrawals.filter((w: any) => w.status === 'APPROVED').reduce((acc: number, curr: any) => acc + curr.amount, 0)}`, icon: 'fa-money-bill-wave', color: 'bg-emerald-500' },
    { label: 'Active Tasks', value: tasks.filter((t: any) => t.status === 'ACTIVE').length, icon: 'fa-list-check', color: 'bg-indigo-500' },
  ];

  const data = [
    { name: 'Users', val: users.length },
    { name: 'Tasks', val: tasks.length },
    { name: 'Withdrawals', val: withdrawals.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
        <div className="flex gap-2">
           <Link to="/admin/users" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-900 transition">Manage Users</Link>
           <Link to="/admin/tasks" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-900 transition">Manage Tasks</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-5 -mr-8 -mt-8 rounded-full transform group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex items-center gap-4 relative">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-xl`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 mb-6">Activity Breakdown</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b'][index % 3]} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 mb-6">Recent Pending Withdrawals</h3>
            <div className="space-y-4">
               {withdrawals.filter((w: any) => w.status === 'PENDING').slice(0, 5).map((w: any) => (
                 <div key={w.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                       <div className="text-sm font-bold text-slate-800">{w.userName}</div>
                       <div className="text-[10px] text-slate-500">{w.method} • {new Date(w.requestedAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-bold text-indigo-600">Rs. {w.amount}</div>
                       <Link to="/admin/withdrawals" className="text-[10px] text-indigo-500 font-bold hover:underline">Approve</Link>
                    </div>
                 </div>
               ))}
               <Link to="/admin/withdrawals" className="block text-center text-sm text-indigo-600 font-bold pt-4 hover:underline">View All Requests</Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
