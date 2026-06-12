"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Award, FolderGit2, Download, ExternalLink, ArrowRight } from 'lucide-react';

const bannerSlides = [
  {
    title: "Discover Nirmalya Das",
    subtitle: "President of Feedbox Club, VIT Bhopal University. Building student ecosystems, events, and tech products.",
    gradient: "from-[#131921] via-[#232f3e] to-[#475569]"
  },
  {
    title: "Empowering AI & ML Innovation",
    subtitle: "Developing advanced machine learning algorithms, cybersecurity frameworks, and scalable web platforms.",
    gradient: "from-[#0f172a] via-[#1e1e38] to-[#3b0764]"
  },
  {
    title: "Scaling Event Strategy & Leadership",
    subtitle: "Core member of Microsoft Club & VP of Odia Club. Leading hackathons, workshops, and student collaborations.",
    gradient: "from-[#022c22] via-[#064e3b] to-[#0f766e]"
  }
];

interface HeroProps {
  setSearchQuery: (val: string) => void;
}

export default function Hero({ setSearchQuery }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000); // Shift slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] pb-16 bg-[#eaeded] dark:bg-[#0b0f19] overflow-hidden select-none">
      
      {/* 1. Giant Banner Slider Background */}
      <div className="absolute top-0 left-0 right-0 h-[380px] sm:h-[450px] md:h-[520px] w-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].gradient} flex items-start pt-12 md:pt-20 px-6 sm:px-12 md:px-24 text-white`}
          >
            {/* Slide Content */}
            <div className="max-w-3xl text-left space-y-4">
              <span className="inline-block px-2 py-0.5 rounded bg-[#ff9900] text-black text-[10px] md:text-xs font-black uppercase tracking-wider">
                Feature Spotlight
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {bannerSlides[currentSlide].title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-medium">
                {bannerSlides[currentSlide].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fading bottom mask to blend the banner into the page content */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#eaeded] dark:from-[#0b0f19] to-transparent z-10" />
      </div>

      {/* 2. Overlapping Dashboard Grid Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[220px] sm:pt-[280px] md:pt-[330px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: User Profile */}
          <div className="pro-card p-5 bg-white dark:bg-[#1e293b] flex flex-col justify-between h-[360px]">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Nirmalya Debidutta Das
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#ff9900]" />
                <span className="text-xs text-text-muted font-bold font-mono">B.Tech CSE (AIML) Student</span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                President of Feedbox Club, VP of Odia Club, and technology innovator building intelligent systems and software products at VIT Bhopal.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://www.linkedin.com/in/nirmalya-debidutta-das-805853325"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-800 bg-[#febd69] hover:bg-[#f3a847] rounded transition-colors"
              >
                LinkedIn Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 rounded transition-colors"
              >
                Connect / Hire Me
              </a>
            </div>
          </div>

          {/* Card 2: Leadership Affiliations (2x2 Grid) */}
          <div className="pro-card p-5 bg-white dark:bg-[#1e293b] flex flex-col justify-between h-[360px]">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">
                Key Student Leadership
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">Feedbox</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Club President</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">Odia Club</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Vice President</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">Microsoft</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Core Member</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">Anti-Ragging</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Member</span>
                </div>
              </div>
            </div>

            <a
              href="#experience"
              className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline flex items-center gap-1 mt-auto"
            >
              See all experience details
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Featured Products (2x2 Grid) */}
          <div className="pro-card p-5 bg-white dark:bg-[#1e293b] flex flex-col justify-between h-[360px]">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">
                Featured Code Products
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a href="#projects" onClick={() => setSearchQuery('TRAYNIX')} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 block text-left">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">TRAYNIX</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">AI Cybersecurity</span>
                </a>
                <a href="#projects" onClick={() => setSearchQuery('Feedbox Digital')} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 block text-left">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">Feedbox SaaS</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Community Hub</span>
                </a>
                <a href="#achievements" onClick={() => setSearchQuery('SolVIT')} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 block text-left">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">SolVIT</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">743+ Hackathon</span>
                </a>
                <a href="#achievements" onClick={() => setSearchQuery('SPARKRUSH')} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-400 block text-left">
                  <span className="block text-[10px] text-[#ff9900] font-black uppercase font-mono">SPARKRUSH</span>
                  <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 leading-tight">Tech Fest</span>
                </a>
              </div>
            </div>

            <a
              href="#projects"
              className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline flex items-center gap-1 mt-auto"
            >
              View all software products
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Downloads & Credentials */}
          <div className="pro-card p-5 bg-white dark:bg-[#1e293b] flex flex-col justify-between h-[360px]">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Credentials & Resume
              </h2>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Grab a local copy of Nirmalya&apos;s professional resume. Evaluated and approved for software engineering roles and community leadership opportunities.
              </p>
              
              {/* Resume mini card representation */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-dashed border-slate-300 dark:border-slate-600 flex items-center gap-3 mb-4">
                <div className="w-10 h-12 bg-red-500 text-white rounded flex flex-col items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                  PDF
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-xs font-extrabold truncate text-slate-800 dark:text-slate-200">resume.pdf</span>
                  <span className="block text-[10px] text-text-muted">Academic & Leadership Summary</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="/resume.pdf"
                download
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-slate-900 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] hover:from-[#f5d78e] hover:to-[#eeb933] rounded shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume PDF
              </a>
              <a
                href="#achievements"
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline flex items-center gap-1 justify-center block mt-1"
              >
                View academic achievements
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
