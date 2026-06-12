"use client";

import React from 'react';
import { Trophy, Calendar, CheckSquare, Award, Flame, Zap, Users, Sparkles } from 'lucide-react';

const achievements = [
  {
    title: "Club President",
    desc: "Feedbox Club (2026-27)",
    detail: "Leading one of VIT Bhopal's most active student ecosystems focusing on technology, creative content, and professional student growth.",
    icon: Trophy,
    rating: 5.0,
    reviews: 180,
    badge: "Highly Rated"
  },
  {
    title: "Club Vice President",
    desc: "Odia Club (2026-27)",
    detail: "Presiding over campus cultural engagement programs, coordinating regional heritage celebrations, and guiding student committees.",
    icon: Award,
    rating: 4.9,
    reviews: 94
  },
  {
    title: "Core Team Member",
    desc: "Microsoft Club",
    detail: "Assisted in managing tech-cultural workshops, student bootcamps, and technical coding platforms within the university ecosystem.",
    icon: Zap,
    rating: 4.8,
    reviews: 65
  },
  {
    title: "Anti-Ragging Committee",
    desc: "Committee Member",
    detail: "Appointed to the university Anti-Ragging Committee to support and maintain a safe, inclusive, and respectful campus environment.",
    icon: Sparkles,
    rating: 5.0,
    reviews: 12
  },
  {
    title: "Organizer - SolVIT Hackathon",
    desc: "743+ Participants",
    detail: "Coordinated logistics, sponsorships, and technical execution for one of the university's largest hackathon initiatives.",
    icon: Calendar,
    rating: 5.0,
    reviews: 743,
    badge: "Best Seller"
  },
  {
    title: "Organizer - Summer Fest",
    desc: "2000+ Audience Reach",
    detail: "Spearheaded management of marketing, logistics, and crowd engagement for the annual campus Summer Fest.",
    icon: Flame,
    rating: 4.9,
    reviews: 200
  },
  {
    title: "Organizer - SPARKRUSH'25",
    desc: "Lead Organizer",
    detail: "Coordinated speaker sessions, Tech Scavenger Hunt, cultural performances, and operations for over 300 students.",
    icon: CheckSquare,
    rating: 5.0,
    reviews: 300,
    badge: "Customer Choice"
  },
  {
    title: "Campus Cultural Events",
    desc: "Organizing Team",
    detail: "Coordinated Holi Celebrations 2025 & 2026 and Saraswati Puja 2026, delivering high-quality student cultural experiences.",
    icon: Users,
    rating: 4.8,
    reviews: 150
  },
  {
    title: "Founder of TRAYNIX",
    desc: "Cybersecurity Innovation",
    detail: "Conceptualized and built an AI-assisted threat detection and active deception framework with high product potential.",
    icon: Trophy,
    rating: 5.0,
    reviews: 42
  },
  {
    title: "Community Leader",
    desc: "Team Management",
    detail: "Successfully initialized, scaled, and managed multiple student clubs and university-level events, leading diverse student teams.",
    icon: Sparkles,
    rating: 4.9,
    reviews: 80
  }
];

interface AchievementsProps {
  searchQuery: string;
}

export default function Achievements({ searchQuery }: AchievementsProps) {
  // Filter achievements based on query
  const filteredAchievements = achievements.filter((ach) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      ach.title.toLowerCase().includes(term) ||
      ach.desc.toLowerCase().includes(term) ||
      ach.detail.toLowerCase().includes(term)
    );
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < floor) {
        stars.push(<span key={i} className="text-[#ff9900] text-xs">★</span>);
      } else {
        stars.push(<span key={i} className="text-slate-300 text-xs">☆</span>);
      }
    }
    return stars;
  };

  return (
    <section id="achievements" className="py-16 relative bg-[#fafafa] dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#ff9900]" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Key Accomplishments &amp; Accolades
          </h2>
        </div>

        {filteredAchievements.length === 0 ? (
          <div className="py-8 text-center text-slate-505 text-xs font-bold font-mono">
            No accomplishments match your query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          /* Achievements Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAchievements.map((ach, idx) => {
              const Icon = ach.icon;
              
              return (
                <div
                  key={idx}
                  className="pro-card p-5 flex flex-col justify-between bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded shadow-sm hover:shadow transition-all duration-200"
                >
                  <div>
                    {/* Badge / Ribbon */}
                    <div className="flex justify-between items-start mb-3 h-5">
                      {ach.badge ? (
                        <span className="bg-[#232f3e] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm">
                          {ach.badge}
                        </span>
                      ) : <div />}
                    </div>

                    {/* Icon & Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-600 dark:text-sky-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-[#ff9900] uppercase tracking-wider font-mono">
                        {ach.desc}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 leading-snug">
                      {ach.title}
                    </h3>

                    {/* Stars and reviews */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[10px] font-bold text-[#ff9900]">{ach.rating.toFixed(1)}</span>
                      <div className="flex leading-none">{renderStars(ach.rating)}</div>
                      <span className="text-[10px] text-slate-550 dark:text-slate-400">
                        ({ach.reviews})
                      </span>
                    </div>

                    {/* Detail Description */}
                    <p className="text-xs text-text-muted leading-relaxed font-sans mt-2">
                      {ach.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
