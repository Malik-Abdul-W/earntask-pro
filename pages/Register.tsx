
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getStore, saveUsers, setCurrentUser } from '../store';
import { User } from '../types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get referral code from URL if exists
  const queryParams = new URLSearchParams(location.search);
  const refCode = queryParams.get('ref');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { users } = getStore();
    if (users.find((u: User) => u.email === formData.email)) {
      setError('Email already exists.');
      return;
    }

    const userId = Date.now().toString();
    const newUser: User & { password?: string } = {
      id: userId,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      role: formData.email.includes('admin') ? 'ADMIN' : 'USER',
      points: 200, // Starting bonus for new users
      completedTasks: [],
      referralCode: userId, // Using ID as code for simplicity
      referralCount: 0,
      referredBy: refCode || undefined,
      createdAt: new Date().toISOString(),
      password: formData.password
    };

    let updatedUsers = [...users, newUser];

    // Handle Referral Bonus
    if (refCode) {
      updatedUsers = updatedUsers.map(u => {
        if (u.id === refCode) {
          return {
            ...u,
            points: u.points + 500, // Referrer bonus: 500 pts
            referralCount: u.referralCount + 1
          };
        }
        return u;
      });
    }

    saveUsers(updatedUsers);
    const { password, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword as User);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 mt-2">Start your journey to financial freedom</p>
          {refCode && (
            <div className="mt-4 bg-indigo-50 text-indigo-700 py-2 px-4 rounded-full text-xs font-bold inline-block">
              <i className="fas fa-gift mr-2"></i> You've been referred! 200 pts bonus waiting.
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number</label>
            <input 
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="0300-1234567"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              placeholder="••••••••"
            />
          </div>
          <div className="md:col-span-2 mt-4">
            <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
              Create My Account
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-slate-600 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
