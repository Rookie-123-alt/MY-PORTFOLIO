"use client";

import React, { useState } from 'react';
import { Sparkles, Code2, Cpu, Network, Users } from 'lucide-react';

const skillCategories = [
  {
    id: "tech-ai",
    title: "AI & Engineering",
    icon: Cpu,
    skills: [
      { name: "Artificial Intelligence", rating: 5.0, confidence: 98 },
      { name: "Machine Learning", rating: 5.0, confidence: 96 },
      { name: "Cybersecurity", rating: 4.8, confidence: 92 },
      { name: "Python", rating: 5.0, confidence: 98 },
      { name: "Java", rating: 4.5, confidence: 88 },
      { name: "Data Structures & Algorithms", rating: 4.8, confidence: 94 },
      { name: "Prompt Engineering", rating: 5.0, confidence: 100 },
      { name: "AI Assisted Prototyping", rating: 5.0, confidence: 98 }
    ]
  },
  {
    id: "product-design",
    title: "Product & Architecture",
    icon: Network,
    skills: [
      { name: "System Design", rating: 4.5, confidence: 90 },
      { name: "Product Development", rating: 4.8, confidence: 94 },
      { name: "Rapid MVP Development", rating: 5.0, confidence: 96 },
      { name: "API Architecture", rating: 4.5, confidence: 88 },
      { name: "Database Design", rating: 4.8, confidence: 92 },
      { name: "Cloud Deployment", rating: 4.5, confidence: 86 },
      { name: "Responsive UI/UX", rating: 4.8, confidence: 94 },
      { name: "SaaS Platforms", rating: 4.8, confidence: 92 }
    ]
  },
  {
    id: "leadership",
    title: "Leadership & Strategy",
    icon: Users,
    skills: [
      { name: "Community Leadership", rating: 5.0, confidence: 100 },
      { name: "Event Management", rating: 5.0, confidence: 98 },
      { name: "Public Relations", rating: 4.8, confidence: 94 },
      { name: "Sponsorship Outreach", rating: 4.8, confidence: 92 },
      { name: "Startup Strategy", rating: 4.5, confidence: 88 }
    ]
  }
];

interface SkillsProps {
  searchQuery: string;
  searchCategory: string;
  cart: string[];
  addToCart: (id: string) => void;
}

export default function Skills({
  searchQuery,
  searchCategory,
  cart,
  addToCart
}: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState("tech-ai");

  // Get matching skills across active category based on query
  const getFilteredSkills = (categorySkills: typeof skillCategories[0]['skills']) => {
    if (!searchQuery) return categorySkills;
    return categorySkills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // Get matching skills globally across all categories
  const getGlobalFilteredSkills = () => {
    const results: Array<{
      name: string;
      rating: number;
      confidence: number;
      categoryId: string;
      categoryTitle: string;
      originalIdx: number;
    }> = [];
    
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill, idx) => {
        if (skill.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            ...skill,
            categoryId: cat.id,
            categoryTitle: cat.title,
            originalIdx: idx
          });
        }
      });
    });
    
    return results;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < floor) {
        stars.push(<span key={i} className="text-[#ff9900] text-sm">★</span>);
      } else {
        stars.push(<span key={i} className="text-slate-300 dark:text-slate-600 text-sm">☆</span>);
      }
    }
    return stars;
  };

  // Hide section if specific non-skills category filter is active and query is empty
  if (searchCategory !== 'all' && searchCategory !== 'skills') {
    return null;
  }

  return (
    <section id="skills" className="py-16 relative bg-[#fafafa] dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#ff9900]" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Departments &amp; Skills Directory
          </h2>
        </div>

        {/* 2-Column Sidebar Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Departments & Reviews Summary (Sidebar) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Departments */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-4 rounded shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">
                Department
              </h3>
              <ul className="space-y-1">
                {skillCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-2 py-1.5 px-2.5 rounded text-xs text-left font-semibold cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-[#f0f2f2] dark:bg-slate-800 text-[#ff9900]'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-slate-550 shrink-0" />
                        <span>{cat.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mock Customer Reviews Summary (Rating Distribution) */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 p-4 rounded shadow-sm text-left">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">
                Overall Capability
              </h3>
              
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex leading-none">{renderStars(5.0)}</div>
                <span className="text-xs font-bold text-slate-850 dark:text-slate-200">5 out of 5</span>
              </div>
              <span className="block text-[11px] text-[#565959] dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                Confidence rating based on college results &amp; products
              </span>

              {/* Progress bars */}
              <div className="space-y-2 text-xs">
                {[
                  { stars: 5, pct: 70, label: "Expert" },
                  { stars: 4, pct: 20, label: "Advanced" },
                  { stars: 3, pct: 10, label: "Intermediate" }
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="w-10 hover:underline cursor-pointer text-blue-600 dark:text-sky-400 font-semibold shrink-0">
                      {item.stars} star
                    </span>
                    <div className="flex-1 h-4 bg-slate-150 dark:bg-slate-800 rounded overflow-hidden border border-slate-200 dark:border-slate-700">
                      <div 
                        className="h-full bg-[#ff9900] border-r border-[#de8900]" 
                        style={{ width: `${item.pct}%` }} 
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-slate-600 dark:text-slate-400 shrink-0">
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Skills Grid */}
          <div className="lg:col-span-9">
            {searchQuery ? (
              (() => {
                const filtered = getGlobalFilteredSkills();
                if (filtered.length === 0) {
                  return (
                    <div className="py-16 text-center bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded">
                      <p className="text-[#c45500] dark:text-[#ff9900] font-black text-base px-4">
                        Hang-on tight buddy! Nirmalya will conquer it soon
                      </p>
                      <p className="text-xs text-text-muted mt-2">
                        We couldn&apos;t find any matching skills on this portfolio right now.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    <div className="bg-[#f0f2f2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-left rounded-sm">
                      <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-200">
                        Search Results: {filtered.length} skills found across departments
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                      {filtered.map((skill) => {
                        const skillId = `skill-${skill.categoryId}-${skill.originalIdx}`;
                        const inCart = cart.includes(skillId);

                        return (
                          <div
                            key={skillId}
                            className="pro-card p-4 bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-850 rounded shadow-sm hover:shadow flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-1.5 mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
                                <h4 className="text-sm font-extrabold text-slate-850 dark:text-slate-200">
                                  {skill.name}
                                </h4>
                              </div>
                              <span className="block text-[9px] text-[#565959] dark:text-slate-400 font-mono mb-2 uppercase font-black tracking-wide">
                                Dept: {skill.categoryTitle}
                              </span>

                              {/* Star Ratings */}
                              <div className="flex items-center gap-1.5 mb-3">
                                <span className="text-[11px] font-bold text-slate-550 dark:text-slate-400">{skill.rating.toFixed(1)}</span>
                                <div className="flex leading-none">{renderStars(skill.rating)}</div>
                              </div>

                              {/* Confidence Bar */}
                              <div className="space-y-1 mb-4">
                                <div className="flex justify-between text-[10px] text-slate-500 font-semibold font-mono">
                                  <span>Confidence</span>
                                  <span>{skill.confidence}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#ff9900]" style={{ width: `${skill.confidence}%` }} />
                                </div>
                              </div>
                            </div>

                            {/* Cart Action Button */}
                            <button
                              onClick={() => addToCart(skillId)}
                              className={`w-full py-1 text-xs font-bold rounded shadow-sm transition-colors border ${
                                inCart
                                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                                  : 'bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border-[#a88734] hover:from-[#f5d78e] hover:to-[#eeb933] text-slate-900'
                              }`}
                            >
                              {inCart ? "In Cart" : "Add to Cart"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()
            ) : (
              skillCategories.map((cat) => {
                if (cat.id !== activeCategory) return null;
                const filtered = getFilteredSkills(cat.skills);

                return (
                  <div key={cat.id} className="space-y-4">
                    <div className="bg-[#f0f2f2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-left rounded-sm">
                      <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-200">
                        Category Products: {cat.title} ({filtered.length} items)
                      </span>
                    </div>

                    {filtered.length === 0 ? (
                      <div className="py-12 text-center bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded">
                        <p className="text-slate-500 font-bold text-sm">No skills match your query in this department.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                        {filtered.map((skill, idx) => {
                          const skillId = `skill-${cat.id}-${idx}`;
                          const inCart = cart.includes(skillId);

                          return (
                            <div
                              key={idx}
                              className="pro-card p-4 bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-850 rounded shadow-sm hover:shadow flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
                                  <h4 className="text-sm font-extrabold text-slate-850 dark:text-slate-200">
                                    {skill.name}
                                  </h4>
                                </div>

                                {/* Star Ratings */}
                                <div className="flex items-center gap-1.5 mb-3">
                                  <span className="text-[11px] font-bold text-slate-550 dark:text-slate-400">{skill.rating.toFixed(1)}</span>
                                  <div className="flex leading-none">{renderStars(skill.rating)}</div>
                                </div>

                                {/* Confidence Bar */}
                                <div className="space-y-1 mb-4">
                                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold font-mono">
                                    <span>Confidence</span>
                                    <span>{skill.confidence}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#ff9900]" style={{ width: `${skill.confidence}%` }} />
                                  </div>
                                </div>
                              </div>

                              {/* Cart Action Button */}
                              <button
                                onClick={() => addToCart(skillId)}
                                className={`w-full py-1 text-xs font-bold rounded shadow-sm transition-colors border ${
                                  inCart
                                    ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300'
                                    : 'bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border-[#a88734] hover:from-[#f5d78e] hover:to-[#eeb933] text-slate-900'
                                }`}
                              >
                                {inCart ? "In Cart" : "Add to Cart"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
