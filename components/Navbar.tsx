"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onBookNowClick: () => void;
  onDownloadClick?: () => void;
}

export default function Navbar({ onBookNowClick, onDownloadClick }: NavbarProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link 
          href="/"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-md text-white font-bold text-xl">
            ॐ
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-bhagwa font-serif">
              Omkareshwar Yatra
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans font-semibold">
              Dharma & Jain Tirth Tour
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="text-charcoal-earth hover:text-bhagwa font-semibold transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-charcoal-earth hover:text-saffron transition-colors">
            About Us
          </Link>
          <Link href="/packages" className="text-bhagwa hover:text-saffron transition-colors">
            Yatra Packages
          </Link>
          <Link href="/#exploration" className="text-charcoal-earth hover:text-saffron transition-colors">
            Exploration
          </Link>
          <Link href="/#contact" className="text-charcoal-earth hover:text-saffron transition-colors">
            Contact Us
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-sacred-cream text-bhagwa hover:bg-orange-100 transition-colors focus:outline-none"
            >
              <span>More</span>
              <svg
                className={`w-4 h-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                <Link href="/planner" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  🗺️ Yatra Route Planner
                </Link>
                <Link href="/live" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  📹 Live Daily Darshan
                </Link>
                <Link href="/calendar" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  📅 Vedic Panchang Calendar
                </Link>
                <Link href="/gallery" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  🖼️ Photo Gallery
                </Link>
                <a href="#faqs" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  FAQs
                </a>
                <a href="#rules" className="block px-4 py-2 text-sm text-charcoal-earth hover:bg-sacred-cream hover:text-bhagwa">
                  Temple Rules
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://wa.me/919009966566?text=Namaste!%20I%20am%20interested%20in%20booking%20a%20Yatra%20package."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md focus:outline-none"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.116.953 11.487.953c-5.447 0-9.875 4.379-9.879 9.808-.002 1.83.486 3.62 1.414 5.216l-.995 3.63 3.72-.92-.1-.053zm10.965-6.816c-.302-.15-.1.79-1.917-.075-.251-.125-.432-.19-.624-.047-.19.143-.73.903-.895 1.093-.165.19-.33.21-.63.06-.301-.15-1.27-.47-2.42-1.493-.895-.8-1.5-1.787-1.675-2.088-.175-.3-.018-.463.13-.612.134-.133.3-.347.45-.52.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.625-1.505-.856-2.072-.227-.546-.477-.473-.654-.482-.17-.008-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.75 1.16 2.93c.14.19 2 3.08 4.86 4.31.68.29 1.22.47 1.63.6.68.22 1.3.19 1.79.12.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onBookNowClick}
            className="flex items-center space-x-1.5 gradient-bg hover:opacity-95 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-charcoal-earth hover:text-bhagwa focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-4 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal-earth hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal-earth hover:bg-gray-50"
          >
            About Us
          </Link>
          <Link
            href="/packages"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bhagwa bg-sacred-cream font-semibold"
          >
            Yatra Packages
          </Link>
          <Link
            href="/#exploration"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal-earth hover:bg-gray-50"
          >
            Exploration
          </Link>
          <Link
            href="/planner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bhagwa bg-orange-50/30 font-semibold"
          >
            🗺️ Yatra Route Planner
          </Link>
          <Link
            href="/live"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bhagwa bg-orange-50/30 font-semibold"
          >
            📹 Live Daily Darshan
          </Link>
          <Link
            href="/calendar"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bhagwa bg-orange-50/30 font-semibold"
          >
            📅 Vedic Panchang Calendar
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal-earth hover:bg-gray-50"
          >
            🖼️ Photo Gallery
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-charcoal-earth hover:bg-gray-50"
          >
            Contact Us
          </Link>

          {/* Action buttons in mobile view */}
          <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
            <a
              href="https://wa.me/919009966566?text=Namaste!%20I%20am%20interested%20in%20booking%20a%20Yatra%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.116.953 11.487.953c-5.447 0-9.875 4.379-9.879 9.808-.002 1.83.486 3.62 1.414 5.216l-.995 3.63 3.72-.92-.1-.053zm10.965-6.816c-.302-.15-.1.79-1.917-.075-.251-.125-.432-.19-.624-.047-.19.143-.73.903-.895 1.093-.165.19-.33.21-.63.06-.301-.15-1.27-.47-2.42-1.493-.895-.8-1.5-1.787-1.675-2.088-.175-.3-.018-.463.13-.612.134-.133.3-.347.45-.52.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.625-1.505-.856-2.072-.227-.546-.477-.473-.654-.482-.17-.008-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.75 1.16 2.93c.14.19 2 3.08 4.86 4.31.68.29 1.22.47 1.63.6.68.22 1.3.19 1.79.12.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNowClick();
              }}
              className="w-full flex items-center justify-center space-x-2 gradient-bg text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
