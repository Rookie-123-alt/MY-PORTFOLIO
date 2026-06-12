"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Users, Calendar, Award, Code, Eye } from 'lucide-react';

interface StatsData {
  studentsImpacted: number;
  eventsOrganized: number;
  leadershipRoles: number;
  technicalProjects: number;
  visitors: number;
}

export default function Stats() {
  const [data, setData] = useState<StatsData>({
    studentsImpacted: 5000,
    eventsOrganized: 10,
    leadershipRoles: 3,
    technicalProjects: 3,
    visitors: 185
  });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((statData) => {
        setData(statData);
      })
      .catch((err) => {
        console.warn('Backend API offline, utilizing fallback statistical values.', err);
      });
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Stat 1: Students Impacted */}
          <StatCard
            icon={Users}
            label="Students Impacted"
            targetValue={data.studentsImpacted}
            suffix="+"
            trigger={isInView}
          />

          {/* Stat 2: Events Organized */}
          <StatCard
            icon={Calendar}
            label="Events Organized"
            targetValue={data.eventsOrganized}
            suffix="+"
            trigger={isInView}
          />

          {/* Stat 3: Leadership Roles */}
          <StatCard
            icon={Award}
            label="Leadership Roles"
            targetValue={data.leadershipRoles}
            suffix="+"
            trigger={isInView}
          />

          {/* Stat 4: Technical Projects */}
          <StatCard
            icon={Code}
            label="Projects Created"
            targetValue={data.technicalProjects}
            suffix=""
            trigger={isInView}
          />

          {/* Stat 5: Live Site Visitors */}
          <StatCard
            icon={Eye}
            label="Live Site Visitors"
            targetValue={data.visitors}
            suffix=""
            trigger={isInView}
            color="text-emerald-600 dark:text-emerald-450"
          />

        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  targetValue: number;
  suffix: string;
  trigger: boolean;
  color?: string;
}

function StatCard({ icon: Icon, label, targetValue, suffix, trigger, color = "text-slate-700 dark:text-sky-400" }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = targetValue;
    if (end === 0) return;

    const duration = 1.5; // seconds
    const totalFrames = 60;
    const frameDuration = (duration * 1000) / totalFrames;
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [trigger, targetValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="p-6 pro-card text-center flex flex-col items-center bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className={`p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mb-4 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1 font-mono text-slate-900 dark:text-white">
        {count}{suffix}
      </span>
      <span className="text-xs sm:text-sm font-bold text-text-muted font-sans">
        {label}
      </span>
    </motion.div>
  );
}
