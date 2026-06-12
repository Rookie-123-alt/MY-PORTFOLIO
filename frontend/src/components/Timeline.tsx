"use client";

import React from 'react';
import { Calendar, Package, CheckCircle2, Truck, ArrowRight } from 'lucide-react';

const timelineEvents = [
  {
    year: "2026",
    status: "Delivered",
    title: "Club President & Leader Appointments",
    subtitle: "Feedbox Club, Odia Club & Anti-Ragging Committee",
    desc: "Appointed President of Feedbox Club and Vice President of Odia Club. Nominated to the university Anti-Ragging Committee. Directing strategies and campaigns for campus inclusion.",
    location: "VIT Bhopal, MP"
  },
  {
    year: "2026",
    status: "Out for Delivery",
    title: "Proposed DIGICULT 2026 Festival",
    subtitle: "Founder & Event Director",
    desc: "Conceptualized a first-of-its-kind Tech-Cultural-Gaming festival concept. Managed branding plans, esport brackets, creator economy talks, and sponsor presentations.",
    location: "VIT Bhopal, MP"
  },
  {
    year: "2025 – 2026",
    status: "In Transit",
    title: "Club Administration & Secretariat",
    subtitle: "Feedbox Operations Head & Odia Secretary",
    desc: "Managed club operations, communications, official documents, and event coordination, while serving as a Core Member of the Microsoft Club.",
    location: "VIT Bhopal, MP"
  },
  {
    year: "2025",
    status: "In Transit",
    title: "Large-Scale Event Execution",
    subtitle: "SolVIT, Summer Fest, SPARKRUSH'25 & Holi '25",
    desc: "Organized SolVIT Hackathon (743+ participants), Summer Fest (2000+ audience reach), and SPARKRUSH'25 (Lead Organizer, 300+ students). Managed logistics, speakers, and crowd safety.",
    location: "VIT Bhopal, MP"
  },
  {
    year: "2024",
    status: "Shipped",
    title: "Academic Genesis",
    subtitle: "B.Tech CSE (AIML), VIT Bhopal University",
    desc: "Began undergraduate engineering studies specializing in Machine Learning and Artificial Intelligence. Initiated programming tracks in Python, Java, and Cybersecurity.",
    location: "VIT Bhopal, MP"
  }
];

interface TimelineProps {
  searchQuery: string;
}

export default function Timeline({ searchQuery }: TimelineProps) {
  // Filter timeline based on search query
  const filteredEvents = timelineEvents.filter((event) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.subtitle.toLowerCase().includes(term) ||
      event.desc.toLowerCase().includes(term) ||
      event.year.toLowerCase().includes(term) ||
      event.status.toLowerCase().includes(term)
    );
  });

  return (
    <section id="timeline" className="py-16 relative bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#ff9900]" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Milestones &amp; Shipment Tracking
          </h2>
        </div>

        {/* 1. Amazon Shipment Info Card */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4 mb-4 text-xs">
            <div>
              <span className="block text-slate-500 dark:text-slate-400 font-bold uppercase font-mono">Carrier Status</span>
              <span className="text-sm font-extrabold text-[#007600] flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#007600]" />
                In Transit: On Track for Career Growth
              </span>
            </div>
            <div>
              <span className="block text-slate-500 dark:text-slate-400 font-bold uppercase font-mono">Tracking ID</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 font-mono mt-0.5">
                NIRM-BTECH-CSE-AIML-VITB
              </span>
            </div>
            <div>
              <span className="block text-slate-500 dark:text-slate-400 font-bold uppercase font-mono">Expected Arrival</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                Continuous Innovation
              </span>
            </div>
          </div>

          {/* Simple tracking progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] text-slate-500 font-bold uppercase font-mono px-1">
              <span>Shipped</span>
              <span>In Transit</span>
              <span>Delivered</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden relative">
              <div className="h-full bg-[#007600] w-[80%] rounded-full" />
            </div>
          </div>
        </div>

        {/* 2. Shipment Travel History Scan list */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#ff9900]" />
            Travel History / Transit Scans
          </h3>

          {filteredEvents.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs font-bold font-mono">
              No scans matched query &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-8 py-2">
              {filteredEvents.map((event, idx) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'Delivered': return 'bg-[#007600] border-[#007600]';
                    case 'Out for Delivery': return 'bg-[#ff9900] border-[#de8900]';
                    case 'In Transit': return 'bg-blue-600 border-blue-700';
                    default: return 'bg-slate-400 border-slate-500';
                  }
                };

                return (
                  <div key={idx} className="relative group">
                    
                    {/* Circle Dot Marker on Left border */}
                    <span className={`absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(event.status)}`} />
                    
                    {/* Event Grid info */}
                    <div className="grid sm:grid-cols-12 gap-2 text-xs">
                      
                      {/* Date & Location column */}
                      <div className="sm:col-span-3 text-left">
                        <span className="block font-bold text-slate-900 dark:text-white font-mono">
                          {event.year}
                        </span>
                        <span className="block text-[11px] text-text-muted font-mono mt-0.5">
                          {event.location}
                        </span>
                      </div>

                      {/* Transit Status Detail column */}
                      <div className="sm:col-span-9 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded-[3px] text-[10px] font-black uppercase tracking-wider text-white ${
                            event.status === 'Delivered' ? 'bg-[#007600]' : 
                            event.status === 'Out for Delivery' ? 'bg-[#c45500]' : 'bg-[#232f3e]'
                          }`}>
                            {event.status}
                          </span>
                          <span className="text-sm font-extrabold text-slate-850 dark:text-slate-200">
                            {event.title}
                          </span>
                        </div>
                        
                        <span className="block text-xs font-bold text-[#ff9900]">
                          {event.subtitle}
                        </span>
                        
                        <p className="text-xs text-text-muted leading-relaxed pt-1">
                          {event.desc}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
