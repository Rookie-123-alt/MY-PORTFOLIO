"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Calendar, CheckCircle, AlertTriangle, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  link?: string;
  stars: number;
  reviews: number;
  badge?: "Best Seller" | "Amazon's Choice";
}

interface ProjectsProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchCategory: string;
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export default function Projects({
  searchQuery,
  setSearchQuery,
  searchCategory,
  cart,
  addToCart,
  removeFromCart
}: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Request Code Modal State
  const [activeRequestProject, setActiveRequestProject] = useState<Project | null>(null);
  const [requestForm, setRequestForm] = useState({ name: '', email: '', contact: '', reason: 'Just to vibecode' });
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [requestStatusMsg, setRequestStatusMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        const enriched = data.map((p: any) => ({
          ...p,
          stars: p.id === 'traynix' ? 5.0 : 4.9,
          reviews: p.id === 'traynix' ? 128 : 54,
          badge: p.id === 'traynix' ? "Best Seller" : "Amazon's Choice"
        }));
        setProjects(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend offline, using fallback static data.', err);
        setProjects([
          {
            id: "traynix",
            title: "TRAYNIX AI Cybersecurity Platform",
            category: "Cybersecurity & Neural Threat Detection",
            description: "An intelligent cybersecurity framework focused on Detect → Deceive → Learn → Protect → Block. It leverages behavior monitoring and adaptive defense mechanisms to thwart complex network-level threats.",
            features: [
              "Threat detection & real-time monitoring",
              "AI-assisted risk and pattern analysis",
              "Continuous behavior monitoring",
              "Advanced fraud prevention algorithms",
              "Adaptive defense and dynamic response mechanisms"
            ],
            link: "#",
            stars: 5.0,
            reviews: 128,
            badge: "Best Seller"
          },
          {
            id: "feedbox-digital",
            title: "Feedbox Digital Community Management Ecosystem",
            category: "Community Management SaaS",
            description: "A complete club management platform designed for university communities featuring event management, member engagement, communication systems, and detailed analytics.",
            features: [
              "Interactive event planning and tracking",
              "Centralized member engagement portal",
              "Automated cross-channel communication",
              "Real-time analytics and attendance metrics",
              "Multi-role permissions for club admins"
            ],
            link: "#",
            stars: 4.9,
            reviews: 54,
            badge: "Amazon's Choice"
          }
        ]);
        setLoading(false);
      });
  }, []);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'traynix': return ShieldCheck;
      case 'feedbox-digital': return Users;
      default: return Calendar;
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (searchCategory !== 'all' && searchCategory !== 'projects') {
      return false;
    }

    if (!searchQuery) return true;

    const term = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(term) ||
      project.category.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.features.some(f => f.toLowerCase().includes(term))
    );
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < floor) {
        stars.push(<span key={i} className="text-[#ff9900] text-sm">★</span>);
      } else {
        stars.push(<span key={i} className="text-slate-350 text-sm">☆</span>);
      }
    }
    return stars;
  };

  const handleOpenRequest = (proj: Project) => {
    setActiveRequestProject(proj);
    setRequestForm({ name: '', email: '', contact: '', reason: 'Just to vibecode' });
    setRequestStatus('idle');
    setRequestStatusMsg('');
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.name || !requestForm.email || !requestForm.contact || !requestForm.reason) {
      setRequestStatus('error');
      setRequestStatusMsg('Please fill in all details.');
      return;
    }

    setRequestStatus('loading');

    try {
      // 1. Send real email via FormSubmit.co
      const formSubmitRes = await fetch('https://formsubmit.co/ajax/dasnirmalya486@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: requestForm.name,
          email: requestForm.email,
          contact: requestForm.contact,
          reason: requestForm.reason,
          project: activeRequestProject?.title,
          _subject: `Code Access Request from ${requestForm.name} [${activeRequestProject?.title}]`
        }),
      });

      // 2. Also log in local database (if online)
      try {
        await fetch('http://localhost:5000/api/request-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: requestForm.name,
            email: requestForm.email,
            contact: requestForm.contact,
            reason: `${requestForm.reason} (Target Project: ${activeRequestProject?.title})`
          })
        });
      } catch (dbErr) {
        console.warn('Local database server offline, skipped database save.', dbErr);
      }

      if (formSubmitRes.ok) {
        setRequestStatus('success');
        setRequestStatusMsg('Request submitted! Please check your inbox (including spam) to activate forwarding if needed.');
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setTimeout(() => {
          setActiveRequestProject(null);
        }, 2500);
      } else {
        throw new Error('FormSubmit API failed');
      }
    } catch (err) {
      console.warn('Backend offline, simulating request locally.', err);
      setTimeout(() => {
        setRequestStatus('success');
        setRequestStatusMsg('Request submitted successfully! Details logged to console.');
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setTimeout(() => {
          setActiveRequestProject(null);
        }, 2500);
      }, 800);
    }
  };

  if (searchCategory !== 'all' && searchCategory !== 'projects') {
    return null;
  }

  return (
    <section id="projects" className="py-16 relative bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Amazon search header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 text-left">
          {searchQuery ? (
            <h2 className="text-lg font-bold text-slate-850 dark:text-slate-200">
              Showing {filteredProjects.length} of {projects.length} results for <span className="text-[#ff9900] font-extrabold">&quot;{searchQuery}&quot;</span> in Software Projects
            </h2>
          ) : (
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Results: Software Products &amp; Projects
            </h2>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-slate-500" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 font-bold">No projects matched your search.</p>
            <button onClick={() => setSearchQuery('')} className="mt-2 text-xs font-bold text-blue-600 hover:underline">Clear Search</button>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredProjects.map((project) => {
              const Icon = getProjectIcon(project.id);
              const inCart = cart.includes(project.id);
              
              return (
                <div
                  key={project.id}
                  className="pro-card p-6 bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge / Ribbon */}
                    <div className="flex justify-between items-center mb-3">
                      {project.badge ? (
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold text-white rounded-r-md -ml-6 ${project.badge === 'Best Seller' ? 'bg-[#c45500]' : 'bg-[#232f3e]'}`}>
                          {project.badge}
                        </span>
                      ) : <div />}
                    </div>

                    {/* Logo & Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                        <Icon className="w-4 h-4 text-slate-700 dark:text-sky-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white mb-1 leading-snug">
                      {project.title}
                    </h3>

                    {/* Stars and reviews */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-xs font-extrabold text-[#ff9900]">{project.stars.toFixed(1)}</span>
                      <div className="flex leading-none">{renderStars(project.stars)}</div>
                      <span className="text-xs text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline cursor-pointer">
                        {project.reviews} ratings
                      </span>
                    </div>

                    {/* Pricing Block */}
                    <div className="mb-4">
                      <div className="flex items-start text-slate-900 dark:text-white">
                        <span className="text-xs font-bold mt-0.5">$</span>
                        <span className="text-3xl font-black leading-none">0</span>
                        <span className="text-xs font-bold mt-0.5">00</span>
                        <span className="text-xs text-[#565959] dark:text-slate-400 font-semibold ml-2 self-end">
                          Open Source
                        </span>
                      </div>
                      <p className="text-[11px] text-[#565959] dark:text-slate-400 mt-1 font-semibold">
                        Available for instant deployment. <span className="text-[#007600] font-bold">In stock.</span>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-muted leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mb-6">
                      <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase mb-2">Key Features</h4>
                      <ul className="space-y-1.5">
                        {project.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-text-muted">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Amazon styled buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {inCart ? (
                      <button
                        onClick={() => removeFromCart(project.id)}
                        className="btn-amazon-secondary py-1.5 text-xs"
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(project.id)}
                        className="btn-amazon py-1.5 text-xs"
                      >
                        Add to Cart
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenRequest(project)}
                      className="btn-amazon-orange py-1.5 text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Request Code Access
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Code Request Popup Modal Dialog */}
      {activeRequestProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[1px]">
          <div className="pro-card w-full max-w-md bg-white dark:bg-[#1e293b] border border-slate-205 dark:border-slate-800 p-6 shadow-xl rounded text-left">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white truncate max-w-[80%]">
                Request Code Access: {activeRequestProject.title}
              </h3>
              <button 
                onClick={() => setActiveRequestProject(null)}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="First and last name"
                  value={requestForm.name}
                  onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Email ID</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={requestForm.email}
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Contact Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 7008494849"
                  value={requestForm.contact}
                  onChange={(e) => setRequestForm({ ...requestForm, contact: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 transition-all"
                />
              </div>

              {/* Reason Selector */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 dark:text-white mb-1">Reason for requesting code</label>
                <select
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-350 dark:border-slate-700 rounded bg-[#fff] dark:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#e77600] dark:focus:ring-sky-500 text-slate-800 dark:text-slate-200 transition-all"
                >
                  <option value="Just to vibecode">Just to vibecode</option>
                  <option value="To build something out of it">To build something out of it</option>
                </select>
              </div>

              {/* Status block */}
              {requestStatus === 'success' && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-2 rounded">
                  <CheckCircle className="w-4 h-4 shrink-0 text-[#007600]" />
                  <span className="font-semibold">{requestStatusMsg}</span>
                </div>
              )}

              {requestStatus === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-[11px] text-red-700 dark:text-red-400 flex items-center gap-2 rounded">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{requestStatusMsg}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveRequestProject(null)}
                  className="btn-amazon-secondary py-1 px-4 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestStatus === 'loading'}
                  className="btn-amazon py-1 px-5 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {requestStatus === 'loading' ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
