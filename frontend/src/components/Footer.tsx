"use client";

import React from 'react';
import { ChevronUp, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 flex flex-col w-full text-slate-200 select-none">
      
      {/* 1. Back to Top Bar */}
      <button
        onClick={handleBackToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white py-3 text-xs font-bold text-center flex items-center justify-center gap-1 cursor-pointer transition-colors border-none"
      >
        <ChevronUp className="w-4 h-4" />
        Back to top
      </button>

      {/* 2. Directory Columns (Amazon middle footer) */}
      <div className="bg-[#232f3e] py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">Get to Know Us</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#about" className="hover:underline">About Nirmalya Das</a></li>
              <li><a href="#experience" className="hover:underline">Leadership Journey</a></li>
              <li><a href="#skills" className="hover:underline">Technical Capabilities</a></li>
              <li><a href="/resume.pdf" download className="hover:underline">Download Resume</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">Connect with Us</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="https://www.linkedin.com/in/nirmalya-debidutta-das-805853325" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="https://wa.me/917008494849" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Support</a></li>
              <li><a href="mailto:dasnirmalya486@gmail.com" className="hover:underline">Email Direct</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">Ecosystems</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#experience" className="hover:underline">Feedbox Club VITB</a></li>
              <li><a href="#experience" className="hover:underline">Odia Club VITB</a></li>
              <li><a href="#experience" className="hover:underline">Microsoft Club VITB</a></li>
              <li><a href="#experience" className="hover:underline">Anti-Ragging Committee</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">Products &amp; Assets</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#projects" className="hover:underline">TRAYNIX Cybersecurity</a></li>
              <li><a href="#projects" className="hover:underline">Feedbox SaaS Hub</a></li>
              <li><a href="#achievements" className="hover:underline">SolVIT Hackathon</a></li>
              <li><a href="#achievements" className="hover:underline">SPARKRUSH &amp; Fests</a></li>
            </ul>
          </div>

        </div>

        {/* Middle decorative line / language indicator */}
        <div className="max-w-6xl mx-auto border-t border-slate-700 mt-10 pt-6 flex items-center justify-center gap-6 text-xs text-slate-300">
          <span className="font-black text-white tracking-wider">NIRMALYA.COM</span>
          <div className="flex items-center gap-1.5 border border-slate-600 rounded px-3 py-1.5 cursor-pointer">
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </div>
          <div className="border border-slate-600 rounded px-3 py-1.5">
            <span>VIT Bhopal, MP</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom bar (Amazon copyright) */}
      <div className="bg-[#131921] py-6 px-4 text-center text-[10px] text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a href="#about" className="hover:underline">Conditions of Use</a>
            <a href="#contact" className="hover:underline">Privacy Notice</a>
            <a href="#contact" className="hover:underline">Consumer Health Data Disclosure</a>
          </div>
          <span className="font-mono">
            &copy; {currentYear} Nirmalya Das. Built using Next.js (App Router), Express API, and PostgreSQL.
          </span>
        </div>
      </div>

    </footer>
  );
}
