
import React, { useState, useEffect } from 'react';

interface StaticPagesProps {
  type: 'about' | 'terms' | 'privacy' | 'contact' | 'disclaimer';
}

const StaticPages: React.FC<StaticPagesProps> = ({ type }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I start earning points?",
      a: "Simply create an account, navigate to the 'Earn Points' or 'Tasks' page, and select any available task. Follow the instructions (like watching a video or following a page) and wait for the verification timer to complete to claim your points."
    },
    {
      q: "What is the minimum withdrawal amount?",
      a: "The minimum withdrawal threshold is Rs. 1,000. Since 10 points equals 1 PKR, you need a minimum of 10,000 points to request a payout."
    },
    {
      q: "How long does it take to receive my payment?",
      a: "Withdrawal requests are manually verified by our team. This process usually takes between 24 to 72 hours. You will receive a notification once your request is approved and the funds are sent to your EasyPaisa, JazzCash, or Bank account."
    },
    {
      q: "Can I use a VPN or multiple accounts?",
      a: "No. To maintain the integrity of our platform for advertisers, we strictly prohibit the use of VPNs, proxies, or multiple accounts per person. Detection of such activity will result in a permanent ban and forfeiture of all points."
    },
    {
      q: "Why was my task verification unsuccessful?",
      a: "Task verification may fail if you close the task window too early, have a poor internet connection, or if you've already completed that specific task. Make sure to stay on the page until the timer hits zero."
    },
    {
      q: "Is there a referral bonus?",
      a: "Yes! You can earn 500 bonus points for every friend who signs up using your unique referral link found on your dashboard. Your friend also receives a 200-point welcome bonus."
    }
  ];

  const content = {
    about: {
      title: 'About EarnTask Pro',
      body: `EarnTask Pro is Pakistan's premier digital micro-task ecosystem, specifically designed to bridge the gap between global digital content creators and the vibrant online workforce of Pakistan. Launched in 2024, our platform provides a legitimate, transparent, and high-performance environment where users can monetize their daily social media interactions.

Our mission is to foster digital financial inclusion by enabling every individual with a smartphone to earn a supplemental income through simple, verified actions. We believe in the power of the "attention economy" and strive to ensure that our users are fairly compensated for the value they provide to the digital world.

With a robust infrastructure, instant point tracking, and a commitment to secure payouts via local gateways like EasyPaisa and JazzCash, EarnTask Pro has quickly become the trusted choice for thousands of Pakistani earners.`,
      seoTitle: "About Us - Our Mission & Vision | EarnTask Pro",
      seoDesc: "Learn about EarnTask Pro, Pakistan's leading task-earning platform. Our mission is to provide secure and transparent digital earning opportunities for everyone."
    },
    terms: {
      title: 'Terms & Conditions',
      body: `Welcome to EarnTask Pro. By accessing or using our platform, you agree to comply with and be bound by the following terms. Please read them carefully.

1. User Eligibility and Account Registration
- You must be at least 18 years of age to create an account.
- Each individual is permitted to maintain only ONE (1) account. Multi-accounting, using different emails or mobile numbers for the same person, will result in immediate permanent suspension of all related accounts and forfeiture of points.

2. Earning Points and Task Completion
- Points are awarded upon the verified completion of social media tasks (e.g., subscribing, watching, liking).
- Any attempt to manipulate the system using automated scripts, bots, VPNs, or proxy servers is strictly prohibited.
- If a user unsubscribes or un-likes a page after claiming points, EarnTask Pro reserves the right to deduct double the points from the user's balance.

3. Redemption and Payouts
- The conversion rate is fixed at 10 Points = 1 PKR, subject to change at the company's discretion.
- Minimum withdrawal threshold is Rs. 1,000.
- All withdrawal requests undergo a manual verification process which typically takes 24-72 hours. During peak times or holidays, this may extend to 7 business days.

4. Account Security
- Users are responsible for maintaining the confidentiality of their passwords. EarnTask Pro is not liable for unauthorized access resulting from user negligence.

5. Termination
- We reserve the right to terminate or suspend any account without prior notice if we detect suspicious activity, fraud, or violation of these terms.`,
      seoTitle: "Terms & Conditions - User Agreement | EarnTask Pro",
      seoDesc: "Read the EarnTask Pro user agreement and terms of service. Understand the rules for earning and withdrawing points on our platform."
    },
    privacy: {
      title: 'Privacy Policy',
      body: `At EarnTask Pro, we prioritize the privacy and security of our users. This policy outlines how we handle your data.

1. Information We Collect
- Personal Identity: Full name and email address for account management.
- Transactional Data: Mobile numbers specifically for EasyPaisa, JazzCash, or bank account details to facilitate withdrawals.
- Technical Data: IP addresses and device information to prevent fraud and multi-accounting.

2. How We Use Your Information
- To process task verifications and ensure legitimate earning.
- To execute payment transfers to your chosen financial gateway.
- To communicate important updates, security alerts, and support responses.

3. Data Protection and Security
- Your passwords are encrypted using high-level hashing algorithms.
- We implement Secure Socket Layer (SSL) technology to ensure that your data remains private and integral during transmission.
- We do not sell, trade, or rent your personal identification information to third parties.

4. Third-Party Links
- Our platform contains links to third-party social media sites (YouTube, Facebook, TikTok, etc.). We do not control their privacy practices and encourage you to review their respective policies.

5. Consent
- By using our website, you hereby consent to our Privacy Policy and agree to its terms.`,
      seoTitle: "Privacy Policy - Your Data Security | EarnTask Pro",
      seoDesc: "Your privacy is our priority. Read how EarnTask Pro collects, uses, and protects your personal data and transaction information."
    },
    disclaimer: {
      title: 'Disclaimer',
      body: `The information and services provided by EarnTask Pro are for informational and earning purposes only.

1. Earnings Disclaimer
- While we strive to provide a consistent flow of tasks, EarnTask Pro does not guarantee a specific monthly income. Earnings are purely dependent on the volume of available tasks and the user's individual effort.
- Past performance or examples of other users do not guarantee your future results.

2. No Professional Advice
- The content on this platform does not constitute financial, investment, or legal advice. Users are encouraged to conduct their own due diligence.

3. Technical Limitations
- EarnTask Pro is not responsible for any technical issues on third-party platforms (e.g., YouTube API errors, Facebook server downtime) that may interfere with task verification.
- We do not guarantee that the platform will be error-free or uninterrupted.

4. Liability
- In no event shall EarnTask Pro or its affiliates be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the service.

5. External Content
- We do not endorse or take responsibility for the content of the videos or pages you are asked to interact with. These are provided by third-party advertisers.`,
      seoTitle: "Legal Disclaimer & Earnings Disclosure | EarnTask Pro",
      seoDesc: "Read our earnings disclaimer and legal limitations. Understand how EarnTask Pro operates and our liability policies."
    },
    contact: {
      title: 'Contact Us',
      body: `Our support team is dedicated to providing you with the best possible experience. If you have questions regarding tasks, withdrawals, or account security, please reach out via the following channels:

Email Support: support@earntaskpro.com
WhatsApp Official: +92 300 0000000 (Available 9 AM - 9 PM)
Headquarters: 4th Floor, Digital Plaza, Gulberg III, Lahore, Pakistan.

For withdrawal issues, please include your User ID and a screenshot of the transaction in your message for faster resolution.`,
      seoTitle: "Contact Us - Support & Help Center | EarnTask Pro",
      seoDesc: "Need help? Contact EarnTask Pro support via WhatsApp or Email. We are here to assist with tasks, withdrawals, and account issues."
    }
  };

  const page = content[type];

  useEffect(() => {
    // SEO Optimization
    document.title = page.seoTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", page.seoDesc);
    }
  }, [type, page.seoTitle, page.seoDesc]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">{page.title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-justify">
          {page.body}
        </div>
        
        {type === 'contact' && (
           <>
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <i className="fas fa-question-circle text-indigo-600"></i>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800">{faq.q}</span>
                        <i className={`fas fa-chevron-down text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                      </button>
                      <div 
                        className={`px-6 transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 py-4 opacity-100 border-t border-slate-50' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-indigo-900">Still have questions?</h3>
                  <p className="text-indigo-700/70 text-sm">Send us a direct inquiry and our team will get back to you shortly.</p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" className="p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white" />
                      <input type="email" placeholder="Email Address" className="p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white" />
                  </div>
                  <textarea placeholder="How can we help you?" className="w-full p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[150px] transition bg-white"></textarea>
                  <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 w-full sm:w-auto">
                      Send Message
                  </button>
                </form>
              </div>
           </>
        )}
      </div>
    </div>
  );
};

export default StaticPages;
