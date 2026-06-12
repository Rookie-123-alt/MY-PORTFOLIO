"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, Award } from 'lucide-react';

const experiences = [
  {
    role: "President",
    company: "Feedbox Club, VIT Bhopal",
    period: "2026 – Present",
    color: "from-indigo-500 to-purple-600",
    highlights: [
      "Leading one of VIT Bhopal's most active student communities focused on technology, innovation, and student engagement.",
      "Responsible for strategic planning, event execution, sponsorship outreach, partnerships, and team management.",
      "Managing club operations while driving initiatives that impact students across the university.",
      "Spearheading projects, hackathons, workshops, creator events, and community-building activities."
    ]
  },
  {
    role: "Operations Head",
    company: "Feedbox Club, VIT Bhopal",
    period: "2025 – 2026",
    color: "from-indigo-400 to-purple-500",
    highlights: [
      "Managed operational planning and execution for club events and initiatives.",
      "Coordinated teams, logistics, registrations, and event workflows.",
      "Assisted in scaling club activities and improving event participation."
    ]
  },
  {
    role: "Vice President",
    company: "Odia Club, VIT Bhopal",
    period: "2026 – Present",
    color: "from-orange-500 to-amber-600",
    highlights: [
      "Leading cultural initiatives and representing the Odia student community.",
      "Planning and executing cultural programs, celebrations, and student engagement activities.",
      "Coordinating between students, club members, and faculty coordinators."
    ]
  },
  {
    role: "Secretary",
    company: "Odia Club, VIT Bhopal",
    period: "2025 – 2026",
    color: "from-orange-400 to-amber-500",
    highlights: [
      "Managed club communications, documentation, and event coordination.",
      "Assisted in organizing cultural festivals and community-building activities."
    ]
  },
  {
    role: "Core Team Member – Event Management",
    company: "Microsoft Club, VIT Bhopal",
    period: "2025 – 2026",
    color: "from-blue-500 to-cyan-600",
    highlights: [
      "Contributed to the planning and execution of technical events and workshops.",
      "Coordinated logistics, registrations, and participant engagement activities.",
      "Collaborated with cross-functional teams to ensure successful event delivery."
    ]
  },
  {
    role: "Member",
    company: "Anti-Ragging Committee",
    period: "2026 – Present",
    color: "from-red-500 to-rose-600",
    highlights: [
      "Selected as a member of the university Anti-Ragging Committee.",
      "Supporting initiatives aimed at maintaining a safe, inclusive, and respectful campus environment.",
      "Assisting in awareness campaigns and student engagement activities."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Leadership Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 dark:text-white"
          >
            Club & Leadership Experience
          </motion.h2>
        </div>

        {/* Experience List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 sm:p-8 pro-card shadow-sm hover:shadow bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 relative group overflow-hidden"
            >
              {/* Solid left strip indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff9900]" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase font-mono">
                      {exp.company}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-150 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1 font-semibold border border-slate-200/50 dark:border-slate-700/50">
                      <Award className="w-3 h-3 text-[#ff9900]" />
                      Club Role
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white">{exp.role}</h3>
                </div>
                
                <div className="flex items-center text-text-muted text-xs font-semibold font-mono sm:self-start bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 w-fit">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {exp.period}
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 pl-1">
                {exp.highlights.map((item, key) => (
                  <li key={key} className="flex items-start text-sm sm:text-base text-text-muted leading-relaxed">
                    <ChevronRight className="w-4 h-4 mr-2 text-slate-450 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
