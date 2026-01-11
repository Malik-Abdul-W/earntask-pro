
import React, { useState, useEffect } from 'react';
import { Withdrawal } from '../types';
import { getStore, saveWithdrawals } from '../store';

const AdminWithdrawals: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  useEffect(() => {
    const { withdrawals: storeW } = getStore();
    setWithdrawals(storeW);
  }, []);

  const updateStatus = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    const updated = withdrawals.map(w => {
      if (w.id === id) return { ...w, status: newStatus };
      return w;
    });
    setWithdrawals(updated);
    saveWithdrawals(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Manage Withdrawals</h1>
           <p className="text-slate-500">Review and process user withdrawal requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {withdrawals.length > 0 ? (
                withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{w.userName}</div>
                      <div className="text-[10px] text-slate-400">{new Date(w.requestedAt).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-indigo-600">Rs. {w.amount}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                         w.method === 'EasyPaisa' ? 'bg-green-100 text-green-700' : 
                         w.method === 'JazzCash' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                       }`}>
                         {w.method}
                       </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-xs text-slate-500">{w.accountDetails}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        w.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                        w.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       {w.status === 'PENDING' && (
                         <>
                           <button 
                             onClick={() => updateStatus(w.id, 'APPROVED')}
                             className="text-[10px] font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700"
                           >
                             Approve
                           </button>
                           <button 
                             onClick={() => updateStatus(w.id, 'REJECTED')}
                             className="text-[10px] font-bold bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 border border-red-200"
                           >
                             Reject
                           </button>
                         </>
                       )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No withdrawal requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawals;
