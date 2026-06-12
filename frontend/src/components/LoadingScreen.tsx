"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable body scroll when loading
    document.body.classList.add('no-scroll');

    // Simulate progress counting up
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.classList.remove('no-scroll');
          }, 400); // Small pause at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#131921]"
        >
          <div className="flex flex-col items-center select-none">
            {/* Amazon-Style Nirmalya.com Logo */}
            <div className="flex flex-col items-center">
              <div className="relative font-sans text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline select-none">
                <span>nirmalya</span>
                <span className="text-[#ff9900]">.com</span>
              </div>
              
              {/* Amazon Curved Smile Arrow SVG Drawing Animation */}
              <div className="w-36 sm:w-44 -mt-1 text-[#ff9900] overflow-visible">
                <svg viewBox="0 0 100 20" fill="none" className="w-full overflow-visible">
                  <motion.path
                    d="M6,4 Q50,18 94,4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                  />
                  <motion.path
                    d="M86,8 L94,4 L92,12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }}
                  />
                </svg>
              </div>
            </div>

            {/* Amazon-style Orange Progress Bar */}
            <div className="w-32 h-[2px] bg-slate-800 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff9900] transition-all duration-75 ease-out"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
