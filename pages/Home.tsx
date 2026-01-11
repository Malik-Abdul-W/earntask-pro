
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountUp: React.FC<{ end: number; duration: number; prefix?: string; suffix?: string }> = ({ end, duration, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toString();
  };

  return (
    <span>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    // SEO Optimization
    document.title = "EarnTask Pro - #1 Online Earning Platform in Pakistan";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Join EarnTask Pro to earn real cash by completing simple social media tasks. Best platform for online earning in Pakistan with EasyPaisa and JazzCash withdrawals.");
    }

    // JSON-LD Schema Markup
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "EarnTask Pro",
      "url": "https://earntaskpro.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://earntaskpro.com/#/tasks?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "description": "Complete simple social media tasks and earn real cash via EasyPaisa and JazzCash."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
              Turn Your Free Time Into <span className="text-indigo-600">Real Cash</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Complete simple social media tasks like watching videos, subscribing to channels, and following pages to earn points you can redeem for cash via EasyPaisa or JazzCash.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/register" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition transform hover:-translate-y-1">
                Start Earning Now
              </Link>
              <Link to="/about" className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:-translate-y-1">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
             <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                   <div className="text-3xl font-bold text-indigo-600">
                     <CountUp end={100000} duration={2000} suffix="+" />
                   </div>
                   <div className="text-slate-500 uppercase text-xs tracking-widest mt-1 font-semibold">Active Users</div>
                </div>
                <div className="text-center border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0">
                   <div className="text-3xl font-bold text-indigo-600">
                     <CountUp end={5000000} duration={2000} prefix="Rs " suffix="+" />
                   </div>
                   <div className="text-slate-500 uppercase text-xs tracking-widest mt-1 font-semibold">Total Paid Out</div>
                </div>
                <div className="text-center">
                   <div className="text-3xl font-bold text-indigo-600">
                     <CountUp end={500000} duration={2000} suffix="+" />
                   </div>
                   <div className="text-slate-500 uppercase text-xs tracking-widest mt-1 font-semibold">Tasks Completed</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-500 mt-4">Three simple steps to start earning real money from home.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Account</h3>
              <p className="text-slate-500">Sign up for free and verify your details to get your personalized dashboard.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <i className="fas fa-tasks"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Tasks</h3>
              <p className="text-slate-500">Choose from hundreds of social media tasks including YouTube, FB, and TikTok.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <i className="fas fa-wallet"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Paid</h3>
              <p className="text-slate-500">Redeem your points for cash through EasyPaisa, JazzCash, or Bank Transfer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Task Types */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">Various Task Categories For Maximum Earnings</h2>
              <p className="text-slate-500 mt-6 text-lg">We provide a wide range of platforms to engage with. Every interaction counts towards your withdrawal goal.</p>
              
              <ul className="mt-8 space-y-4">
                 <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><i className="fab fa-youtube text-sm"></i></div>
                    <span className="font-medium">YouTube Video Watching & Subs</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><i className="fab fa-facebook-f text-sm"></i></div>
                    <span className="font-medium">Facebook Page Follows & Post Likes</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center"><i className="fab fa-tiktok text-sm"></i></div>
                    <span className="font-medium">TikTok Account Following</span>
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center"><i className="fab fa-instagram text-sm"></i></div>
                    <span className="font-medium">Instagram Post Likes & Engagement</span>
                 </li>
              </ul>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform -rotate-2">
                    <div className="text-indigo-600 font-bold text-lg">Daily Bonus</div>
                    <p className="text-xs text-slate-500">Earn +100 pts every day you log in and complete 5 tasks.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-emerald-600 font-bold text-lg">Fast Payout</div>
                    <p className="text-xs text-slate-500">Most withdrawals are processed within 24-48 hours.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-blue-600 font-bold text-lg">Safe & Secure</div>
                    <p className="text-xs text-slate-500">Your data is encrypted and your privacy is our priority.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform rotate-2">
                    <div className="text-amber-500 font-bold text-lg">24/7 Support</div>
                    <p className="text-xs text-slate-500">Contact our WhatsApp support team for any issues.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start earning?</h2>
          <p className="text-indigo-100 text-lg mb-10">Join thousands of Pakistanis who are already making a side income with EarnTask Pro.</p>
          <Link to="/register" className="px-10 py-4 bg-white text-indigo-600 rounded-full font-bold text-xl hover:bg-slate-100 transition shadow-2xl">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
