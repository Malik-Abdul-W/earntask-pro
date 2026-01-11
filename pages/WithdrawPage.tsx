
import React, { useState } from 'react';
import { User, Withdrawal } from '../types';
import { getStore, saveWithdrawals, syncPoints } from '../store';
import { useNavigate } from 'react-router-dom';

interface WithdrawPageProps {
  user: User;
}

const WithdrawPage: React.FC<WithdrawPageProps> = ({ user }) => {
  const [method, setMethod] = useState<'EasyPaisa' | 'JazzCash' | 'Bank Transfer'>('EasyPaisa');
  const [amount, setAmount] = useState(1000);
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const minWithdrawal = 1000;
  const pointsRequired = amount * 10;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < minWithdrawal) {
      alert(`Minimum withdrawal is Rs. ${minWithdrawal}`);
      return;
    }
    if (user.points < pointsRequired) {
      alert("Insufficient points for this amount.");
      return;
    }

    setLoading(true);

    const { withdrawals } = getStore();
    const newWithdrawal: Withdrawal = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.fullName,
      amount: amount,
      pointsRedeemed: pointsRequired,
      method: method,
      accountDetails: details,
      status: 'PENDING',
      requestedAt: new Date().toISOString()
    };

    saveWithdrawals([...withdrawals, newWithdrawal]);
    syncPoints(user.id, -pointsRequired);

    setTimeout(() => {
      setLoading(false);
      alert("Withdrawal request submitted successfully! Redirecting to WhatsApp support...");
      // Auto-open WhatsApp as requested
      const waMsg = `Hello! I have requested a withdrawal of Rs. ${amount} via ${method} on EarnTask Pro. Account: ${details}. Please verify.`;
      window.open(`https://wa.me/923000000000?text=${encodeURIComponent(waMsg)}`, '_blank');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Withdraw Earnings</h1>
        <p className="text-slate-500">Redeem your points for real cash. 10 Points = 1 Rupee.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                   {['EasyPaisa', 'JazzCash', 'Bank Transfer'].map((m) => (
                     <button
                       key={m}
                       type="button"
                       onClick={() => setMethod(m as any)}
                       className={`py-3 rounded-xl border font-bold text-sm transition ${
                         method === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                       }`}
                     >
                       {m}
                     </button>
                   ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Withdrawal Amount (PKR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                  <input 
                    type="number" 
                    min={minWithdrawal}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">Costs {pointsRequired} Points</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Account Details</label>
                <textarea 
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                  placeholder={method === 'Bank Transfer' ? "IBAN, Bank Name, Account Title" : "Mobile Number and Account Name"}
                />
              </div>

              <button 
                disabled={loading || user.points < pointsRequired}
                className={`w-full py-4 rounded-xl font-bold transition shadow-lg ${
                  loading || user.points < pointsRequired 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                }`}
              >
                {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
                {user.points < pointsRequired ? 'Insufficient Balance' : 'Submit Withdrawal Request'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
           <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">Your Balance</div>
              <div className="text-4xl font-bold mb-4">{user.points} <span className="text-lg opacity-70">pts</span></div>
              <div className="pt-4 border-t border-indigo-500/50">
                 <div className="flex justify-between text-sm">
                    <span className="opacity-80">Cash Value:</span>
                    <span className="font-bold">Rs. {(user.points / 10).toFixed(0)}</span>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Withdrawal Terms</h4>
              <ul className="text-xs text-slate-500 space-y-3">
                 <li className="flex gap-2">
                    <i className="fas fa-info-circle text-indigo-500 mt-0.5"></i>
                    <span>Minimum amount: <strong>Rs. 1000</strong></span>
                 </li>
                 <li className="flex gap-2">
                    <i className="fas fa-clock text-indigo-500 mt-0.5"></i>
                    <span>Processing time: <strong>24-72 hours</strong></span>
                 </li>
                 <li className="flex gap-2">
                    <i className="fas fa-exclamation-triangle text-amber-500 mt-0.5"></i>
                    <span>Ensure details are correct. Incorrect info leads to rejection.</span>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
