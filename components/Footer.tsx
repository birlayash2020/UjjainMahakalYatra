"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-earth text-gray-300 relative pt-16 temple-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center font-bold text-sm">
                ॐ
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-white">
                Omkareshwar Yatra
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated travel services for Hindu pilgrimages and Jain tirth circuits in India. Experience authentic Vedic pujas, hassle-free stays, and deep spiritual journeys.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-bhagwa text-white flex items-center justify-center transition-all">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-bhagwa text-white flex items-center justify-center transition-all">
                t
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-bhagwa text-white flex items-center justify-center transition-all">
                in
              </a>
            </div>
          </div>

          {/* Column 2: Navigation map */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-saffron transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-saffron transition-colors">About Us</a></li>
              <li><a href="#packages" className="hover:text-saffron transition-colors">Yatra Packages</a></li>
              <li><a href="#exploration" className="hover:text-saffron transition-colors">Exploration & Temples</a></li>
              <li><a href="#contact" className="hover:text-saffron transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Sacred Places */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif">Holy Places</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Mahakaleshwar Jyotirlinga, Ujjain</li>
              <li>Omkareshwar Island (OM shape)</li>
              <li>Mamleshwar Jyotirlinga, Khandwa</li>
              <li>Harsiddhi Shaktipeeth, Ujjain</li>
              <li>Avanthika Parshwanath Jain Tirth</li>
            </ul>
          </div>

          {/* Column 4: Help Desk helpline */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif">Help & Support</h4>
            <p className="text-xs text-gray-400">
              Call our support helpline 24/7 for immediate assistance during your ongoing pilgrimage:
            </p>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center space-x-2 text-white">
              <svg className="w-5 h-5 text-saffron shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-bold tracking-wide">+91 90099 66566</span>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/5 pt-8 text-center text-[10px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Omkareshwar Yatra Services. All Rights Reserved. Devoted to Lord Shiva.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
