
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 text-white mb-4">
            <i className="fas fa-coins text-2xl text-indigo-400"></i>
            <span className="text-xl font-bold">EarnTask<span className="text-indigo-400">Pro</span></span>
          </Link>
          <p className="text-sm leading-relaxed">
            The #1 platform for earning real cash by completing simple social media tasks. Fast payouts, reliable support, and daily tasks.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
            <li><Link to="/tasks" className="hover:text-indigo-400">Tasks</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-indigo-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-indigo-400">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Get notified about premium tasks and bonus events.</p>
          <form className="flex">
            <input type="email" placeholder="Your email" className="bg-slate-800 border-none rounded-l-md px-3 py-2 text-white focus:ring-1 focus:ring-indigo-400 w-full" />
            <button className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700">Join</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
        <p>© {new Date().getFullYear()} EarnTask Pro. All rights reserved. Made for professional earners.</p>
      </div>
    </footer>
  );
};

export default Footer;
