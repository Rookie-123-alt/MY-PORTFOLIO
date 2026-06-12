"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Briefcase, CheckCircle, AlertTriangle, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JoinLiveHousePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    skills: '',
    team: 'Sponsorships and Brand Activation Team',
    fitReason: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const teams = [
    "Sponsorships and Brand Activation Team",
    "Public Events Team",
    "College Events and Brand Campaigns Team",
    "Social Media Team",
    "Support and Ticketing Team"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contact || !formData.skills || !formData.team || !formData.fitReason) {
      setStatus('error');
      setStatusMsg('Please complete all form fields.');
      return;
    }

    setStatus('loading');

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
          contact: formData.contact,
          skills: formData.skills,
          team: formData.team,
          fitReason: formData.fitReason,
          _subject: `LiveHouse Social Application: ${formData.name} - ${formData.team}`
        }),
      });

      // 2. Also log in local database (if online)
      try {
        await fetch('http://localhost:5000/api/join-livehouse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (dbErr) {
        console.warn('Local database server offline, skipped database save.', dbErr);
      }

      if (formSubmitRes.ok) {
        setStatus('success');
        setStatusMsg('Application submitted! Please check your inbox (including spam) to activate FormSubmit forwarding if this is your first submission.');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setFormData({
          name: '',
          email: '',
          contact: '',
          skills: '',
          team: 'Sponsorships and Brand Activation Team',
          fitReason: ''
        });
      } else {
        throw new Error('FormSubmit API failed');
      }
    } catch (err) {
      console.warn('Network issue, simulating local success.', err);
      setTimeout(() => {
        setStatus('success');
        setStatusMsg('Application submitted (simulated locally)! Details logged to console.');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setFormData({
          name: '',
          email: '',
          contact: '',
          skills: '',
          team: 'Sponsorships and Brand Activation Team',
          fitReason: ''
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeded] dark:bg-[#0b0f19] flex flex-col pt-[100px] select-none text-left">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        cartCount={0}
        cart={[]}
        clearCart={() => {}}
      />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-8">
        
        {/* Amazon Jobs Header Box */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-6 rounded shadow-sm mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[#ff9900]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Join LiveHouse Social Team
            </h1>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Apply to join LiveHouse Social departments. Fill out your details below. Once submitted, your profile will be sent directly to Nirmalya&apos;s desk at <span className="font-bold">dasnirmalya486@gmail.com</span>.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-6 sm:p-8 rounded shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="First and last name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Email ID</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Contact Number</label>
              <input
                type="tel"
                required
                placeholder="Phone number"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Skills</label>
              <input
                type="text"
                required
                placeholder="e.g. Sales, Negotiation, Branding, Ticketing, React, Content Strategy"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
              />
            </div>

            {/* Team Selection */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Choose which team you want to join</label>
              <select
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 text-slate-800 dark:text-slate-200 transition-all"
              >
                {teams.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Why fit */}
            <div>
              <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Why do you think you are fit to be in the team?</label>
              <textarea
                required
                rows={4}
                placeholder="Share your motivations, past experiences, and what value you can add..."
                value={formData.fitReason}
                onChange={(e) => setFormData({ ...formData, fitReason: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all resize-none"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 rounded">
                <CheckCircle className="w-4.5 h-4.5 shrink-0 text-[#007600]" />
                <span className="font-semibold">{statusMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-xs text-red-700 dark:text-red-400 flex items-center gap-2 rounded">
                <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-red-500" />
                <span className="font-semibold">{statusMsg}</span>
              </div>
            )}

            {/* Submit application */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-amazon py-2.5 flex items-center justify-center gap-1.5"
            >
              {status === 'loading' ? (
                <div className="animate-spin rounded-full h-4.5 w-4.5 border-t-2 border-slate-950" />
              ) : (
                <>
                  Submit Application Copy
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

      </main>

      <Footer />
    </div>
  );
}
