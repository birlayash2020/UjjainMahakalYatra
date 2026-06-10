"use client";

import React from "react";
import Image from "next/image";

interface SpecialYatraBannerProps {
  onEnquireClick: (title: string) => void;
}

export default function SpecialYatraBanner({ onEnquireClick }: SpecialYatraBannerProps) {
  const yatraTitle = "Sacred Narmada Parikrama Yatra";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sacred-cream to-orange-50/40 rounded-3xl border border-orange-100 overflow-hidden shadow-lg hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Column: Details & Information */}
            <div className="p-8 sm:p-12 lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-bhagwa/10 text-bhagwa text-xs font-bold px-3 py-1.5 rounded-full">
                <span>ॐ</span>
                <span className="tracking-wider uppercase">Ultimate Spiritual Journey</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth font-serif leading-tight">
                {yatraTitle}
              </h2>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The Narmada Parikrama is one of the most sacred circumambulations in Hinduism. Walking along the banks of the holy Narmada River is believed to purify the soul and bring eternal peace. We offer fully assisted Parikrama packages tailored for your physical comfort and spiritual devotion.
              </p>

              {/* Highlights Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-earth">Complete 15-Day Assisted Tour</h4>
                    <p className="text-[11px] text-gray-500">Stays, travel, and guided routes included</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-earth">Traditional Ashram Stays</h4>
                    <p className="text-[11px] text-gray-500">Authentic spiritual environments</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-earth">Satvik Food & Vedic Rituals</h4>
                    <p className="text-[11px] text-gray-500">Onion-garlic free meals & daily river aarti</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-charcoal-earth">Emergency Medical Support</h4>
                    <p className="text-[11px] text-gray-500">Backup support vehicles and assistance</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => onEnquireClick(yatraTitle)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg gradient-bg text-white font-bold tracking-wide shadow-md hover:shadow-lg focus:outline-none text-sm"
                >
                  Book Parikrama Yatra
                </button>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-orange-200 bg-white hover:bg-sacred-cream text-bhagwa text-sm font-bold text-center transition-colors"
                >
                  Request Detailed Itinerary
                </a>
              </div>
            </div>

            {/* Right Column: Custom Generated Graphic/Image */}
            <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-[450px] lg:col-span-5 bg-gray-100">
              <Image
                src="/images/narmada_parikrama.png"
                alt="Sacred Narmada Parikrama Yatra"
                fill
                className="object-cover"
              />
              {/* Inner glowing orange border overlay */}
              <div className="absolute inset-0 border-t-4 lg:border-t-0 lg:border-l-4 border-marigold"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
