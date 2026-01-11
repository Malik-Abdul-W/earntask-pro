
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { getStore } from './store';
import { User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import TasksPage from './pages/TasksPage';
import WithdrawPage from './pages/WithdrawPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminTasks from './pages/AdminTasks';
import AdminWithdrawals from './pages/AdminWithdrawals';
import StaticPages from './pages/StaticPages';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { currentUser } = getStore();
    setUser(currentUser);
  }, [location.pathname]);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          
          {/* User Protected Routes */}
          <Route path="/dashboard" element={user ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={user ? <TasksPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/withdraw" element={user ? <WithdrawPage user={user} /> : <Navigate to="/login" />} />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/admin/users" element={isAdmin ? <AdminUsers /> : <Navigate to="/" />} />
          <Route path="/admin/tasks" element={isAdmin ? <AdminTasks /> : <Navigate to="/" />} />
          <Route path="/admin/withdrawals" element={isAdmin ? <AdminWithdrawals /> : <Navigate to="/" />} />

          {/* Static Pages */}
          <Route path="/about" element={<StaticPages type="about" />} />
          <Route path="/terms" element={<StaticPages type="terms" />} />
          <Route path="/privacy" element={<StaticPages type="privacy" />} />
          <Route path="/disclaimer" element={<StaticPages type="disclaimer" />} />
          <Route path="/contact" element={<StaticPages type="contact" />} />
        </Routes>
      </main>

      <Footer />

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/923000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50 text-2xl"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default App;
