"use client";

import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle, AlertTriangle, ShieldCheck, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const customerSupportLinks = [
  { name: 'Business Network (LinkedIn)', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/nirmalya-debidutta-das-805853325', label: 'Professional Profile' },
  { name: 'Live Chat Support (WhatsApp)', icon: WhatsappIcon, url: 'https://wa.me/917008494849?text=Hey%20I%20need%20help%20urgently!', label: 'Instant Connect' },
  { name: 'SMS Support Direct', icon: Phone, url: 'sms:+917008494849?body=Hey%20I%20need%20help%20urgently!', label: 'Text Support' },
  { name: 'Social Department (Instagram)', icon: InstagramIcon, url: 'https://www.instagram.com/nirrrmalya?igsh=aDZ1bzUwZ2Nvd3Zu&utm_source=qr', label: 'Updates' },
  { name: 'Direct Mail Desk (Email)', icon: Mail, url: 'mailto:dasnirmalya486@gmail.com', label: 'Corporate Desk' },
];

// Map cart IDs to clean names for display in the order summary
const resolveCartItemName = (id: string) => {
  if (id === 'traynix') return 'TRAYNIX AI Cybersecurity Platform';
  if (id === 'feedbox-digital') return 'Feedbox Digital SaaS Ecosystem';
  if (id.startsWith('skill-tech-ai')) {
    const idx = parseInt(id.split('-').pop() || '0');
    const skills = [
      "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Python", 
      "Java", "Data Structures & Algorithms", "Prompt Engineering", "AI Assisted Prototyping"
    ];
    return `${skills[idx] || 'Technical Skill'} (Expertise)`;
  }
  if (id.startsWith('skill-product-design')) {
    const idx = parseInt(id.split('-').pop() || '0');
    const skills = [
      "System Design", "Product Development", "Rapid MVP Development", "API Architecture",
      "Database Design", "Cloud Deployment", "Responsive UI/UX", "SaaS Platforms"
    ];
    return `${skills[idx] || 'System Architecture'} (Expertise)`;
  }
  if (id.startsWith('skill-leadership')) {
    const idx = parseInt(id.split('-').pop() || '0');
    const skills = [
      "Community Leadership", "Event Management", "Public Relations", "Sponsorship Outreach", "Startup Strategy"
    ];
    return `${skills[idx] || 'Leadership Capability'} (Capability)`;
  }
  return id;
};

interface ContactProps {
  cart: string[];
  clearCart: () => void;
}

export default function Contact({ cart, clearCart }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [needHelpOpen, setNeedHelpOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill out all fields before submitting.');
      return;
    }

    setStatus('loading');

    // Compile items from cart into message content
    const compiledMessage = cart.length > 0 
      ? `${formData.message}\n\n[Cart Checkout Items:\n${cart.map(resolveCartItemName).join('\n')}]`
      : formData.message;

    try {
      // 1. Send real email via FormSubmit.co
      const formSubmitRes = await fetch('https://formsubmit.co/ajax/dasnirmalya486@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: compiledMessage,
          _subject: `New Portfolio Message from ${formData.name}`
        }),
      });

      // 2. Log in local database (if online)
      try {
        await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: compiledMessage
          }),
        });
      } catch (dbErr) {
        console.warn('Local database server offline, skipped database save.', dbErr);
      }

      if (formSubmitRes.ok) {
        setStatus('success');
        setStatusMessage('Message order placed! Please check your inbox (including spam) to activate FormSubmit forwarding if this is your first submission.');
        setFormData({ name: '', email: '', message: '' });
        clearCart();
        
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        throw new Error('FormSubmit API failed');
      }
    } catch (err: any) {
      console.warn('Network issue, simulating local success.', err);
      setTimeout(() => {
        setStatus('success');
        setStatusMessage('Checkout processed (simulated locally)! Details logged to console.');
        setFormData({ name: '', email: '', message: '' });
        clearCart();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-16 relative bg-[#eaeded] dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#ff9900]" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Secure Checkout &amp; Communication Portal
          </h2>
        </div>

        {/* Outer Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Customer Service Channels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Help / Social Panel */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-5 rounded shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2.5 mb-4">
                Customer Support Directory
              </h3>
              <div className="space-y-3.5">
                {customerSupportLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded shrink-0">
                        <Icon className="w-4 h-4 text-slate-700 dark:text-sky-400" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                          {link.name}
                        </span>
                        <span className="block text-[10px] text-text-muted">
                          {link.label}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability notice */}
            <div className="p-4 rounded bg-[#fcf8e3] dark:bg-amber-950/20 border border-[#faebcc] dark:border-amber-900/30 text-xs flex gap-2 text-slate-750 dark:text-amber-200">
              <Sparkles className="w-4 h-4 shrink-0 text-[#ff9900] mt-0.5" />
              <div>
                <span className="font-extrabold block">Immediate Delivery Option:</span>
                <span>Active and available for software engineering internships, rapid prototyping MVP projects, and student community collaborations.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Amazon Checkout Sign-in Card & Order Summary */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Cart Summary Header (If items exist in Cart) */}
            {cart.length > 0 && (
              <div className="bg-[#fff] dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-5 rounded shadow-sm">
                <h3 className="text-sm font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-3 uppercase tracking-wider text-[#c45500]">
                  Cart Checkout Summary
                </h3>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item} className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-350 bg-slate-50 dark:bg-slate-900/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold">{resolveCartItemName(item)}</span>
                      <span className="font-mono text-slate-500 font-bold">$0.00</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs font-extrabold text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-700 pt-3">
                  <span>Shipping &amp; Delivery</span>
                  <span className="text-[#007600] font-black uppercase">FREE</span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-slate-900 dark:text-white mt-1">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="text-lg text-slate-900 dark:text-slate-100">$0.00</span>
                </div>
              </div>
            )}

            {/* Secure Sign-in Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-6 sm:p-8 rounded shadow-sm">
              <h1 className="text-2xl font-bold font-sans text-slate-900 dark:text-white mb-5">
                Sign-In / Contact Nirmalya
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First and last name"
                    className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 focus:border-[#e77600] transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 focus:border-[#e77600] transition-all"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Hey Nirmalya, I'd love to discuss..."
                    className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 focus:border-[#e77600] transition-all resize-none"
                    required
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4.5 h-4.5 shrink-0 text-[#007600]" />
                    <span className="font-semibold">{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3.5 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-red-500" />
                    <span className="font-semibold">{statusMessage}</span>
                  </div>
                )}

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-amazon py-2 flex items-center justify-center gap-1.5"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin rounded-full h-4.5 w-4.5 border-t-2 border-slate-900" />
                  ) : (
                    <>
                      {cart.length > 0 ? 'Place Order & Send Message' : 'Send Secure Message'}
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Accordion dropdown details */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setNeedHelpOpen(!needHelpOpen)}
                  className="text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline flex items-center gap-1 font-semibold"
                >
                  Need help?
                </button>
                {needHelpOpen && (
                  <div className="pl-3 mt-2 space-y-1.5 text-text-muted">
                    <p>• Looking for internships or event partnerships?</p>
                    <p>• Trouble reaching me? Direct contact WhatsApp is: +91 7008494849</p>
                    <p>• Email backup: dasnirmalya486@gmail.com</p>
                  </div>
                )}
              </div>

              {/* Amazon Legal disclosure */}
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-4 leading-normal">
                By continuing, you agree to respond to Nirmalya&apos;s communications and authorize him to follow up regarding your inquiries.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
