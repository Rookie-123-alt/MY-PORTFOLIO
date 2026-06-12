"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  rating: number;
  commentsCount: number;
}

interface BlogProps {
  searchQuery: string;
}

export default function Blog({ searchQuery }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/blog')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((data) => {
        const enriched = data.map((b: any) => ({
          ...b,
          rating: b.id === 'future-of-ai-communities' ? 5.0 : 4.8,
          commentsCount: b.id === 'future-of-ai-communities' ? 12 : 8
        }));
        setPosts(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend API offline, utilizing fallback static blog posts.', err);
        setPosts([
          {
            id: "future-of-ai-communities",
            title: "Building the Future: AI-Driven Student Communities",
            summary: "How artificial intelligence and prompt engineering are reshaping how student clubs build products, collaborate, and scale their impact.",
            content: "Student communities are the breeding grounds for the next generation of innovators. As we move into 2026, the intersection of AI tools and student leadership is enabling teams to build MVPs in days instead of months. At Feedbox Club, we are implementing AI-assisted workflows to optimize our operations, automate member communications, and design engaging tech-cultural experiences. By adopting these technologies early, students gain hands-on experience in prompt engineering, full-stack prototyping, and agile project delivery.",
            date: "June 10, 2026",
            readTime: "4 min read",
            rating: 5.0,
            commentsCount: 12
          },
          {
            id: "cybersecurity-adaptive-defense",
            title: "Adaptive Defense: Shifting from Reactive to Proactive Cybersecurity",
            summary: "An introduction to the concepts behind TRAYNIX: using AI to deceive attackers and study threats in real-time.",
            content: "Traditional cybersecurity frameworks focus on setting up firewalls and waiting for alerts. However, modern threats require an active, adaptive stance. The 'Detect -> Deceive -> Learn -> Protect -> Block' pipeline implements active deception (like automated honeypots) to analyze malicious actors in a sandboxed environment before they can cause damage. By learning from their behaviors, the system dynamically generates protective rules to shield the core network.",
            date: "May 28, 2026",
            readTime: "6 min read",
            rating: 4.8,
            commentsCount: 8
          },
          {
            id: "event-management-scale",
            title: "The Art of Scaling Events: Impacting Thousands of Students",
            summary: "Key lessons learned from organizing large-scale university festivals like SolVIT Hackathon and Summer Fest.",
            content: "Organizing large university events requires bridging technology, logistics, and human relationships. From coordinating sponsorships to managing public relations, the secret lies in building a resilient team structure. By creating digital platforms like the Feedbox Digital Ecosystem, we can streamline registration, automate check-ins, and gather analytical insights, ensuring every student has a smooth, memorable experience.",
            date: "April 15, 2026",
            readTime: "5 min read",
            rating: 4.9,
            commentsCount: 15
          }
        ]);
        setLoading(false);
      });
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.summary.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
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
    <section id="blog" className="py-16 relative bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#ff9900]" />
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Developer Insights &amp; Publications
          </h2>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-slate-500" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-8 text-center text-slate-505 text-xs font-bold font-mono">
            No articles match your query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="pro-card p-6 flex flex-col justify-between bg-white dark:bg-[#1e293b] border border-[#d5d9d9] dark:border-slate-800 rounded shadow-sm hover:shadow transition-all duration-200"
              >
                <div>
                  {/* Meta items */}
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono mb-3.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 leading-snug hover:text-[#ff9900] transition-colors cursor-pointer"
                      onClick={() => setSelectedPost(post)}>
                    {post.title}
                  </h3>

                  {/* Stars / Read reviews */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-[10px] font-bold text-[#ff9900]">{(post.rating || 5.0).toFixed(1)}</span>
                    <div className="flex leading-none">{renderStars(post.rating || 5.0)}</div>
                    <span className="text-[10px] text-blue-600 dark:text-sky-400 hover:text-[#ff9900] hover:underline cursor-pointer">
                      ({post.commentsCount || 0} comments)
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                    {post.summary}
                  </p>
                </div>

                {/* Read Button */}
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-650 hover:underline hover:text-[#ff9900] cursor-pointer"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Blog Modal Popup */}
        <AnimatePresence>
          {selectedPost && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-[1px]"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className="pro-card w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-left"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                    <Sparkles className="w-3 h-3 text-[#ff9900]" />
                    Insight Publication
                  </span>
                  
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedPost.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <span className="text-[#ff9900]">{(selectedPost.rating || 5.0).toFixed(1)}</span>
                    <span className="flex leading-none">{renderStars(selectedPost.rating || 5.0)}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black mb-4 font-sans leading-tight text-slate-900 dark:text-white">
                  {selectedPost.title}
                </h3>
                
                {/* Body Content */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 pt-4 border-t border-slate-150 dark:border-slate-800 font-sans">
                  <p>{selectedPost.content}</p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded text-[11px] italic text-slate-600 dark:text-slate-400 mt-6">
                    Written by Nirmalya Das. Follow for more insights on AI, Full-Stack Prototyping, and Student Leadership.
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
