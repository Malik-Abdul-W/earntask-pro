
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { setCurrentUser } from '../store';

interface NavbarProps {
  user: User | null;
  setUser: (u: User | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <i className="fas fa-coins text-lg"></i>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">EarnTask<span className="text-indigo-600">Pro</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium">Home</Link>
            {user ? (
              <>
                <Link to="/tasks" className="text-slate-600 hover:text-indigo-600 font-medium">Earn Points</Link>
                <Link to="/withdraw" className="text-slate-600 hover:text-indigo-600 font-medium">Withdraw</Link>
                <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-user-circle text-lg"></i>
                    Dashboard
                  </span>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900">Admin</Link>
                )}
                <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 font-semibold text-sm">
                  <i className="fas fa-star"></i>
                  <span>{user.points} pts</span>
                </div>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition font-medium">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Home</Link>
          {user ? (
            <>
              <Link to="/tasks" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Earn Points</Link>
              <Link to="/withdraw" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Withdraw</Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Dashboard</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-slate-800 font-bold">Admin Panel</Link>
              )}
              <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 font-semibold w-fit">
                <i className="fas fa-star"></i>
                <span>{user.points} pts</span>
              </div>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-slate-600 font-medium">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block bg-indigo-600 text-white text-center py-2 rounded-md">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
