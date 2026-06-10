"use client";

import React, { useState, useEffect } from "react";
import { Temple } from "../data/types";

interface ExplorationSectionProps {
  temples: Temple[];
}

export default function ExplorationSection({ temples }: ExplorationSectionProps) {
  const [activeTemple, setActiveTemple] = useState<Temple | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTemple(null);
      }
    };
    if (activeTemple) {
      window.addEventListener("keydown", handleKeyDown);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeTemple]);

  // Reset image index when active temple changes
  useEffect(() => {
    setActiveImgIndex(0);
  }, [activeTemple]);

  const handlePrevImage = (imagesLength: number) => {
    setActiveImgIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const handleNextImage = (imagesLength: number) => {
    setActiveImgIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  return (
    <section id="exploration" className="py-20 bg-sacred-cream/40 border-y border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-bhagwa uppercase tracking-widest">Divine Knowledge</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth mt-2 font-serif">
            Exploration: Major Temples & Dham Details
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4">
            Here is a short guide to the sacred places in Ujjain and Omkareshwar that are part of our tour circuits. Learn about the deities, addresses, and history.
          </p>
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {temples.map((temple, i) => (
            <div
              key={temple.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-orange-100/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              {/* Decorative background step number */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-sacred-cream rounded-bl-full rounded-tr-2xl -z-10 group-hover:bg-orange-100 transition-colors flex items-start justify-end p-4">
                <span className="text-lg font-bold text-marigold">0{i + 1}</span>
              </div>

              <div>
                {/* Title wrapper with hover tooltip */}
                <div className="relative group/tooltip inline-block mb-2">
                  <h3
                    onClick={() => setActiveTemple(temple)}
                    className="text-xl sm:text-2xl font-bold text-charcoal-earth font-serif cursor-pointer hover:text-bhagwa transition-colors flex items-center flex-wrap gap-2 group/title"
                  >
                    {temple.name}
                    <span className="inline-flex items-center text-xs text-bhagwa bg-orange-50 border border-orange-100/60 rounded-full px-2.5 py-0.5 opacity-80 group-hover/title:opacity-100 group-hover/title:bg-bhagwa group-hover/title:text-white group-hover/title:border-bhagwa transition-all font-sans font-medium">
                      explore ➔
                    </span>
                  </h3>
                  
                  {/* Tooltip Element */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-max max-w-[260px] bg-charcoal-earth text-white text-[11px] px-3.5 py-2 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 transform translate-y-1 group-hover/tooltip:translate-y-0 z-20 flex flex-col items-center">
                    <span className="font-bold text-orange-200">Click to Explore Details</span>
                    <span className="text-[10px] text-gray-300 mt-0.5">History, Timings, Rituals & Gallery</span>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-charcoal-earth rotate-45 -mt-1"></span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-sacred-cream text-bhagwa text-xs font-semibold px-2.5 py-1 rounded">
                    Deity: {temple.deity}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {temple.desc}
                </p>
              </div>

              {/* Address footer */}
              <div className="pt-4 border-t border-gray-100 flex items-start justify-between text-xs text-gray-400">
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-marigold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong>Address:</strong> {temple.address}</span>
                </div>

                <button
                  onClick={() => setActiveTemple(temple)}
                  className="text-xs font-bold text-bhagwa hover:text-orange-600 transition-colors shrink-0"
                >
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Detailed Temple Popup Modal */}
      {activeTemple && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300">
          {/* Modal Backdrop Click Target */}
          <div className="absolute inset-0" onClick={() => setActiveTemple(null)}></div>

          {/* Modal Content Box */}
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar border border-orange-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative z-10">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveTemple(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all font-bold text-lg focus:outline-none"
              aria-label="Close details"
            >
              ✕
            </button>

            {/* Image Slider / Carousel */}
            {activeTemple.images && activeTemple.images.length > 0 && (
              <div className="relative w-full h-56 sm:h-72 md:h-80 bg-gray-900 overflow-hidden">
                {/* Active Image */}
                <img
                  src={activeTemple.images[activeImgIndex]}
                  alt={`${activeTemple.name} view ${activeImgIndex + 1}`}
                  className="w-full h-full object-cover select-none transition-all duration-500"
                />

                {/* Left Arrow Button */}
                {activeTemple.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(activeTemple.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white font-bold flex items-center justify-center hover:bg-black/60 focus:outline-none transition-all"
                    >
                      ‹
                    </button>

                    {/* Right Arrow Button */}
                    <button
                      onClick={() => handleNextImage(activeTemple.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white font-bold flex items-center justify-center hover:bg-black/60 focus:outline-none transition-all"
                    >
                      ›
                    </button>

                    {/* Slide Dots / Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/35 px-3 py-1.5 rounded-full z-10">
                      {activeTemple.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeImgIndex === idx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Bottom title gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-white text-lg font-bold font-serif leading-tight">
                      {activeTemple.name} Gallery
                    </h4>
                    <p className="text-[10px] text-orange-200 font-semibold tracking-wider uppercase mt-0.5">
                      Image {activeImgIndex + 1} of {activeTemple.images.length}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Info Content Container */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-charcoal-earth">
                    {activeTemple.name}
                  </h3>
                  <p className="text-sm font-semibold text-bhagwa font-serif mt-1">
                    Deity: {activeTemple.deity}
                  </p>
                </div>
                <div className="shrink-0 flex items-center space-x-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 text-marigold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Madhya Pradesh, India</span>
                </div>
              </div>

              {/* 3-Column Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-orange-50/20 border border-orange-100/40 p-4 rounded-2xl">
                
                {/* Column 1: Timings */}
                <div className="space-y-1.5 p-1">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                    <span>🕒 Darshan Timings</span>
                  </h5>
                  <p className="text-xs font-semibold text-charcoal-earth">
                    {activeTemple.timings || "Open all day"}
                  </p>
                </div>

                {/* Column 2: Best Time to Visit */}
                <div className="space-y-1.5 p-1 border-t md:border-t-0 md:border-x border-orange-100/30 md:px-4">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                    <span>🍂 Best Time To Visit</span>
                  </h5>
                  <p className="text-xs font-semibold text-charcoal-earth">
                    {activeTemple.bestTime || "October to March"}
                  </p>
                </div>

                {/* Column 3: Dress Code */}
                <div className="space-y-1.5 p-1 border-t md:border-t-0 md:pl-4">
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                    <span>🥻 Temple Dress Code</span>
                  </h5>
                  <p className="text-xs font-semibold text-charcoal-earth">
                    {activeTemple.dressCode || "Modest clothing recommended"}
                  </p>
                </div>

              </div>

              {/* Detailed Description / History */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-charcoal-earth uppercase tracking-wider flex items-center space-x-1.5">
                  <span>📜 Historical & Scriptural Significance</span>
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {activeTemple.history || activeTemple.desc}
                </p>
              </div>

              {/* Two Column details for Rituals and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Key Rituals / Pujas */}
                {activeTemple.rituals && activeTemple.rituals.length > 0 && (
                  <div className="bg-sacred-cream/30 border border-orange-100/40 p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-bhagwa uppercase tracking-wider flex items-center space-x-1.5">
                      <span>🔥 Auspicious Rituals & Pujas</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeTemple.rituals.map((r, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start space-x-2">
                          <span className="text-bhagwa mt-0.5">🔸</span>
                          <span className="font-medium">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Location Address Details & Action */}
                <div className="border border-gray-150 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-charcoal-earth uppercase tracking-wider flex items-center space-x-1.5">
                      <span>📍 Mandir Address</span>
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      {activeTemple.address}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/919009966566?text=${encodeURIComponent(
                      `Hari Om, I want to plan a custom yatra. Please share packages and details for visiting ${activeTemple.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 rounded-xl gradient-bg text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.85-4.411 9.853-9.85.002-2.634-1.02-5.11-2.881-6.974-1.86-1.863-4.334-2.887-6.97-2.888-5.439 0-9.856 4.413-9.858 9.853-.001 1.66.444 3.284 1.29 4.717l-.962 3.515 3.61-.947z" />
                    </svg>
                    Book Darshan / Yatra Assist
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
