
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getStore, saveUsers } from '../store';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const { users: storeUsers } = getStore();
    setUsers(storeUsers);
  }, []);

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      saveUsers(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>
           <p className="text-slate-500">View and manage registered members.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                     <th className="px-6 py-4">User Details</th>
                     <th className="px-6 py-4">Mobile</th>
                     <th className="px-6 py-4">Points</th>
                     <th className="px-6 py-4">Tasks</th>
                     <th className="px-6 py-4">Joined</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{u.fullName}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${u.role === 'ADMIN' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                             {u.role}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-slate-600">{u.mobile}</td>
                       <td className="px-6 py-4 font-bold text-indigo-600">{u.points}</td>
                       <td className="px-6 py-4 text-slate-500">{u.completedTasks.length}</td>
                       <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                       <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700">
                             <i className="fas fa-trash-can"></i>
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default AdminUsers;
