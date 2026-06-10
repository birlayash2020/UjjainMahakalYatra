"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Slide } from "../data/yatras";

interface HeroSliderProps {
  slides: Slide[];
  onCustomizeClick: (title: string) => void;
}

export default function HeroSlider({ slides, onCustomizeClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative h-[550px] md:h-[650px] overflow-hidden bg-charcoal-earth">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover brightness-[0.45] transform scale-105 transition-transform duration-10000 ease-linear"
            />
          </div>

          {/* Slide Text Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl text-center z-20">
              <span className="inline-block bg-marigold text-charcoal-earth font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 md:mb-6 animate-pulse">
                {slide.subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight font-serif drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-sm">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onCustomizeClick(slide.title)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg gradient-bg text-white font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base"
                >
                  Customize Your Package
                </button>
                <a
                  href="#packages"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md border border-white/30 transition-all text-base text-center"
                >
                  View Yatras
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Left Chevron Button */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all focus:outline-none"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Chevron Button */}
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all focus:outline-none"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-saffron scale-125 shadow-md" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
