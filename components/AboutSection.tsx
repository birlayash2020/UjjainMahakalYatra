"use client";

import React from "react";
import Image from "next/image";

interface AboutSectionProps {
  onPlanClick: () => void;
}

export default function AboutSection({ onPlanClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Images & Floating Testimonial */}
          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/slide1.png"
              alt="About Ujjain Mahakal Tour Operator"
              fill
              className="object-cover"
            />
            {/* Floating Review Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-orange-100">
              <p className="text-sm italic text-gray-600 mb-4">
                &ldquo;Our do dham trip to Ujjain and Omkareshwar was extremely organized. The Pandit Ji arranged by the travel operator conducted the Mamleshwar Puja so beautifully. Highly recommended for families!&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-bhagwa tracking-wide">
                  - Ramesh & Sunita Verma, Jaipur
                </span>
                <div className="flex text-marigold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial text */}
          <div>
            <span className="text-sm font-bold text-bhagwa uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth mt-2 mb-6 font-serif">
              Your Trusted Path to Devotion and Peace
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Omkareshwar Yatra, we believe that a spiritual pilgrimage should be free of logistical worries, so your mind remains completely focused on prayers. With deep roots in Madhya Pradesh&apos;s sacred landscape, we specialize in organizing tours to Ujjain Mahakal, Omkareshwar, Mamleshwar, and several other Hindu and Jain tirths across the region.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From booking the best slot for the early morning Bhasma Aarti in Ujjain to organizing Pandits for customized rudrabhishek puja, hotel reservations, and pure vegetarian (satvik) food, our team oversees every single detail.
            </p>

            {/* Core USPs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sacred-cream flex items-center justify-center text-bhagwa font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-earth text-sm">Authorized Guides</h4>
                  <p className="text-xs text-gray-500">Guides with historical knowledge</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sacred-cream flex items-center justify-center text-bhagwa font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-earth text-sm">Satvik Hospitality</h4>
                  <p className="text-xs text-gray-500">Fresh onion-garlic free food</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sacred-cream flex items-center justify-center text-bhagwa font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-earth text-sm">Comfort Transports</h4>
                  <p className="text-xs text-gray-500">AC SUVs & Tempo travellers</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sacred-cream flex items-center justify-center text-bhagwa font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-earth text-sm">Puja Arrangements</h4>
                  <p className="text-xs text-gray-500">Experienced Vedic Pandits</p>
                </div>
              </div>
            </div>

            <button
              onClick={onPlanClick}
              className="px-8 py-3 rounded-lg gradient-bg text-white font-bold tracking-wide hover:opacity-95 shadow-md transition-all text-sm"
            >
              Plan Your Pilgrimage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
