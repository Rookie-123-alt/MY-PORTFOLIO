"use client";

import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Achievements from '@/components/Achievements';
import Stats from '@/components/Stats';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import EventPlanner from '@/components/EventPlanner';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      const cat = params.get('category');
      if (q) setSearchQuery(q);
      if (cat) setSearchCategory(cat);
      
      if (q) {
        setTimeout(() => {
          const target = cat === 'projects' ? 'projects' : 'skills';
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  const addToCart = (id: string) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      {/* Premium Loading Transitions */}
      <LoadingScreen />

      {/* Background (returns null for non-vibecoded professional styling) */}
      <ParticleBackground />

      {/* Navigation Layer (Amazon Bar) */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        cartCount={cart.length}
        cart={cart}
        clearCart={clearCart}
      />

      {/* Main Sections */}
      <main className="relative flex-grow bg-[#eaeded] dark:bg-[#0b0f19] pt-24 pb-8">
        {/* 1. Hero Landing - Amazon Carousel & dashboard grids */}
        <Hero setSearchQuery={setSearchQuery} />

        {/* 2. Stats Section - Amazon retail style counters */}
        <Stats />

        {/* 3. About Details */}
        <About />

        {/* 4. Experience Highlights */}
        <Experience />

        {/* 5. Projects Grid - Amazon Search listings */}
        <Projects
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchCategory={searchCategory}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />

        {/* 6. Skills Classification - Amazon Review breakdown */}
        <Skills
          searchQuery={searchQuery}
          searchCategory={searchCategory}
          cart={cart}
          addToCart={addToCart}
        />

        {/* 7. Achievements Grid */}
        <Achievements searchQuery={searchQuery} />

        {/* 8. Vertical Timeline - Package travel tracker */}
        <Timeline searchQuery={searchQuery} />

        {/* 9. Blog Articles */}
        <Blog searchQuery={searchQuery} />

        {/* 10. Strategic Event Planner Section */}
        <EventPlanner />

        {/* 11. Contact Info & Form - Secure Checkout style */}
        <Contact cart={cart} clearCart={clearCart} />
      </main>

      {/* Professional Footer */}
      <Footer />
    </>
  );
}
