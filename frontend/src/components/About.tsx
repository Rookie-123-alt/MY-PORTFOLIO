"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, ShieldAlert, Rocket, Sparkles, Check } from 'lucide-react';

const stats = [
  { icon: Users, label: "Community Leadership", desc: "President of Feedbox Club & Vice President of Odia Club" },
  { icon: Cpu, label: "Tech Stack & AI", desc: "B.Tech CSE (AIML) focusing on AI, ML & Product Dev" },
  { icon: ShieldAlert, label: "Cybersecurity Interest", desc: "Passionate about network security & threat intelligence" },
  { icon: Rocket, label: "Entrepreneurial Spirit", desc: "Building scalable digital products & community ecosystems" },
];

export default function About() {
  const [selectedImage, setSelectedImage] = useState('/profile1.jpg');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const profileImages = [
    { id: 'img1', src: '/profile1.jpg', label: 'Primary' },
    { id: 'img2', src: '/profile2.jpg', label: 'Candidate Posture' },
    { id: 'img3', src: '/profile3.jpg', label: 'Outfit View' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 mb-3 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Discover Nirmalya
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 dark:text-white"
          >
            About Me
          </motion.h2>
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Amazon-style Product Images Widget (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex gap-4 h-[450px]"
          >
            {/* Vertical Thumbnails Sidebar */}
            <div className="flex flex-col gap-2.5 shrink-0">
              {profileImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  onMouseEnter={() => setSelectedImage(img.src)}
                  className={`w-14 h-18 border-2 rounded overflow-hidden transition-all bg-slate-100 ${
                    selectedImage === img.src
                      ? 'border-[#e77600] ring-1 ring-[#e77600] shadow-sm font-sans'
                      : 'border-[#d5d9d9] dark:border-slate-750 hover:border-[#e77600]'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Display Box with Roll-over Zoom */}
            <div className="flex-grow flex flex-col items-center justify-between bg-slate-50 dark:bg-slate-900 border border-[#d5d9d9] dark:border-slate-800 rounded p-4 h-full relative select-none">
              <div
                className="w-full flex-grow relative overflow-hidden rounded bg-white dark:bg-slate-950 cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={selectedImage}
                  alt="Nirmalya Das Portrait Detail"
                  className={`w-full h-full object-cover transition-transform duration-100 ${
                    isZoomed ? 'scale-250 absolute' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          left: 0,
                          top: 0,
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        }
                      : undefined
                  }
                />
              </div>

              {/* Interaction tip & Recruiter validation badge */}
              <div className="w-full mt-3 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold italic">Roll over image to zoom in</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded bg-emerald-500/5">
                  <Check className="w-3 h-3 text-[#007600]" /> Verified Profile Image
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Description & Highlights (col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-left"
            >
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Leading teams, building ecosystems, & shaping the tech-cultural horizon.
              </h3>
              
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                I am Nirmalya Debidutta Das, a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence & Machine Learning at VIT Bhopal University. I bridge the gap between complex software architecture and leadership.
              </p>
              
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                As President of Feedbox Club, Vice President of Odia Club, and a Core Member of the Microsoft Club, I have managed Operations, Public Relations, and Sponsorships for large-scale events, impacting thousands of students. Beyond communities, my technical aspirations lie in Cybersecurity, Rapid MVP prototyping, and building AI-assisted full-stack digital products.
              </p>

              {/* Quote block */}
              <div className="border-l-4 border-slate-700 dark:border-sky-500 pl-4 py-1.5 italic text-xs sm:text-sm text-slate-750 dark:text-slate-350 font-medium bg-slate-50 dark:bg-slate-800/40 rounded-r">
                &quot;From Ideas to Impact. Building communities, products, and memorable experiences.&quot;
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid sm:grid-cols-2 gap-4 text-left"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="p-4 pro-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded animate-none"
                >
                  <div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg w-fit mb-3">
                      <stat.icon className="w-4.5 h-4.5 text-slate-750 dark:text-sky-450" />
                    </div>
                    <h4 className="text-sm font-extrabold mb-1 font-sans text-slate-900 dark:text-white">{stat.label}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
