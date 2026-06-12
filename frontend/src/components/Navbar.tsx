"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, Download, MapPin, Search, ShoppingCart, Globe, ChevronDown } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchCategory: string;
  setSearchCategory: (val: string) => void;
  cartCount: number;
  cart: string[];
  clearCart: () => void;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  searchCategory,
  setSearchCategory,
  cartCount,
  cart,
  clearCart
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.location.href = `/?search=${encodeURIComponent(localSearchQuery)}&category=${searchCategory}`;
        return;
      }
      const targetSection = searchCategory === 'projects' ? 'projects' : 'skills';
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSearchCategory(cat);
    setShowDepartments(false);
  };

  const categories = [
    { label: 'All Departments', value: 'all' },
    { label: 'Software Projects', value: 'projects' },
    { label: 'Technical Skills', value: 'skills' },
    { label: 'Milestones Timeline', value: 'timeline' }
  ];

  const currentCategoryLabel = categories.find(c => c.value === searchCategory)?.label || 'All';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full select-none">
      
      {/* Row 1: Primary Amazon Bar */}
      <div className="bg-[#131921] text-white px-4 py-2 flex items-center justify-between gap-4 h-[60px]">
        
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Logo */}
          <a href="/" className="flex flex-col p-1.5 border border-transparent hover:border-white rounded transition-all">
            <span className="text-lg font-extrabold tracking-tight leading-none">
              NIRMALYA<span className="text-[#ff9900]">.</span>COM
            </span>
            {/* Custom Amazon Smiley Arrow in SVG */}
            <svg className="w-24 h-2 text-[#ff9900]" viewBox="0 0 100 10" fill="none">
              <path d="M5 2C30 8 70 8 95 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M91 1.5L95 2L93.5 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Location Delivery Pin */}
          <div className="hidden md:flex items-center gap-1.5 p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all">
            <MapPin className="w-5 h-5 text-white shrink-0 mt-2" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#ccc] leading-tight">Deliver to</span>
              <span className="text-xs font-extrabold leading-tight">VIT Bhopal 466001</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <form onSubmit={handleSearchSubmit} className="flex items-stretch bg-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#ff9900]">
            
            {/* Department Dropdown */}
            <div className="relative shrink-0 flex items-center bg-[#f3f3f3] hover:bg-[#dadada] text-slate-700 text-[11px] font-sans px-3 border-r border-[#ddd] cursor-pointer transition-colors"
                 onClick={() => setShowDepartments(!showDepartments)}>
              <span className="mr-1">{currentCategoryLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
              
              {showDepartments && (
                <div className="absolute top-[38px] left-0 bg-white border border-[#ccc] rounded shadow-md py-1.5 w-[160px] text-slate-800 text-xs z-50">
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      className="px-3 py-1.5 hover:bg-[#f0f2f2] cursor-pointer"
                      onClick={() => handleCategorySelect(cat.value)}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              placeholder="Search skills, projects, and leadership milestones..."
              className="w-full px-3 py-1.5 text-sm text-slate-900 outline-none placeholder-slate-400 bg-white"
            />

            {/* Search Button */}
            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] text-[#111] px-5 flex items-center justify-center cursor-pointer transition-colors border-none">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right: Actions (Language, Sign-In, Returns, Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 border border-transparent hover:border-white rounded text-[#eee] hover:text-white cursor-pointer transition-all flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Lang */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-xs font-extrabold">EN</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </div>

          {/* Sign In (Contact Form anchor) */}
          <a
            href="/#contact"
            className="flex flex-col text-left p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all"
          >
            <span className="text-[11px] text-[#ccc] leading-tight">Hello, Recruiter</span>
            <span className="text-xs font-extrabold leading-tight flex items-center gap-0.5">
              Sign In / Hire Me
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </a>

          {/* Returns & Milestones (Timeline anchor) */}
          <a
            href="/#timeline"
            className="hidden sm:flex flex-col text-left p-1.5 border border-transparent hover:border-white rounded cursor-pointer transition-all"
          >
            <span className="text-[11px] text-[#ccc] leading-tight">Returns</span>
            <span className="text-xs font-extrabold leading-tight">&amp; Milestones</span>
          </a>

          {/* Shopping Cart */}
          <a
            href="/#contact"
            className="flex items-center gap-1 p-1.5 border border-transparent hover:border-white rounded cursor-pointer relative transition-all"
            aria-label="Cart"
          >
            <div className="relative flex items-center">
              {/* Badge representing added skills/projects */}
              <span className="absolute -top-2.5 left-2 bg-[#ff9900] text-black text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
              <ShoppingCart className="w-6 h-6 text-white mt-1.5" />
            </div>
            <div className="flex flex-col text-left justify-end self-end mt-2 leading-none">
              <span className="text-xs font-extrabold">Cart</span>
            </div>
          </a>
        </div>
      </div>

      {/* Row 2: Secondary Subnav */}
      <div className="bg-[#232f3e] text-white px-4 py-1.5 flex items-center justify-between text-xs sm:text-sm h-[40px]">
        {/* Left Side Sublinks */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none py-1">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 font-bold hover:underline cursor-pointer border-none bg-transparent text-white shrink-0"
          >
            <Menu className="w-4 h-4" />
            All
          </button>
          
          <div className="flex items-center gap-4 shrink-0 font-medium">
            <a href="/#about" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">About Me</a>
            <a href="/#experience" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Experience</a>
            <a href="/#projects" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Projects</a>
            <a href="/#skills" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Skills</a>
            <a href="/#achievements" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Achievements</a>
            <a href="/#timeline" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Tracking History</a>
            <a href="/#blog" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all">Blog</a>
            <a href="/help" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all text-[#febd69]">Help Center</a>
            <a href="/join-livehouse" className="hover:border hover:border-white px-1.5 py-0.5 border border-transparent rounded transition-all text-[#febd69]">Join LiveHouse</a>
          </div>
        </div>

        {/* Right Side Promo Label & Resume Download */}
        <div className="hidden md:flex items-center gap-4 text-[#febd69] font-bold text-xs shrink-0">
          <span>Today&apos;s Deal: Free rapid MVP consulting!</span>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1 text-white hover:underline shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      </div>

      {/* Side category list overlay triggered by "All" */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[100px] z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#1e293b] w-[280px] h-full shadow-lg p-5 flex flex-col gap-4 text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">All Categories</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-3 font-semibold text-sm">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => handleCategorySelect(c.value)}
                  className={`text-left py-2 px-3 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${searchCategory === c.value ? 'bg-slate-150 dark:bg-slate-800 text-[#ff9900]' : ''}`}
                >
                  {c.label}
                </button>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-3">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 text-center text-xs font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resume PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
