"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import PackagesSection from "../components/PackagesSection";
import ExplorationSection from "../components/ExplorationSection";
import AboutSection from "../components/AboutSection";
import EnquiryForm from "../components/EnquiryForm";
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";
import SpecialYatraBanner from "../components/SpecialYatraBanner";
import ReviewsSection from "../components/ReviewsSection";


// Import structured data arrays (can easily be replaced with database API calls in the future)
import { slidesData, packagesData, templesData } from "../data/yatras";

export default function Home() {
  // Global modal state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handleOpenBooking = (pkgTitle: string = "") => {
    setSelectedPackage(pkgTitle);
    setIsBookModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookModalOpen(false);
    setSelectedPackage("");
  };

  const handleEnquirySubmit = (formData: {
    name: string;
    phone: string;
    date: string;
    package: string;
    message: string;
  }) => {
    // Here you can hook up your real backend in the future:
    // e.g. fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(formData) })
    console.log("📤 Yatra Enquiry Submitted Successfully:", formData);
  };

  const handleDownloadItinerary = () => {
    alert("📥 Your PDF Itinerary for Ujjain & Omkareshwar Yatra has started downloading!");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* Top Banner Accent message */}
      <div className="bg-bhagwa text-white text-xs font-semibold py-2 px-4 text-center tracking-wide shadow-sm">
        🕉️ Welcome to Ujjain Mahakal Yatra - Experience the Spiritual Blessings of the holy Jyotirlingas
      </div>

      {/* 1. Navbar Header */}
      <Navbar 
        onBookNowClick={() => handleOpenBooking()} 
        onDownloadClick={handleDownloadItinerary} 
      />

      {/* 2. Hero Image Slider */}
      <HeroSlider 
        slides={slidesData} 
        onCustomizeClick={handleOpenBooking} 
      />

      {/* Quick Stats Banner */}
      <section className="bg-sacred-cream py-8 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-extrabold text-bhagwa font-serif">12+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Jyotirlingas Covered</div>
          </div>
          <div className="p-4 border-l border-orange-100">
            <div className="text-3xl font-extrabold text-bhagwa font-serif">50k+</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Devotees Served</div>
          </div>
          <div className="p-4 border-l border-orange-100">
            <div className="text-3xl font-extrabold text-bhagwa font-serif">4.9/5</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Google Rating</div>
          </div>
          <div className="p-4 border-l border-orange-100">
            <div className="text-3xl font-extrabold text-bhagwa font-serif">100%</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Satvik Food & Hospitality</div>
          </div>
        </div>
      </section>

      {/* 3. Yatra Tour Packages Section */}
      <PackagesSection 
        packages={packagesData} 
        onBookClick={handleOpenBooking} 
      />

      {/* Special Yatra Banner (Narmada Parikrama Yatra) */}
      <SpecialYatraBanner 
        onEnquireClick={handleOpenBooking}
      />

      {/* 4. Exploration Guides Section */}
      <ExplorationSection 
        temples={templesData} 
      />

      {/* 5. About Us Description */}
      <AboutSection 
        onPlanClick={() => handleOpenBooking()} 
      />

      {/* Festival Alert Banner */}
      <section className="relative py-16 bg-bhagwa text-white overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-700/20 rounded-full"></div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-orange-700/20 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-marigold">Special Devotional Occasions</span>
          <h3 className="text-3xl sm:text-4xl font-bold font-serif mt-2 mb-4">
            Maha Shivratri & Shravan Maas Special Bookings
          </h3>
          <p className="text-orange-100 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Experience the divine glory during the auspicious days of Shravan (holy month) and Maha Shivratri. Slots are limited due to heavy crowds. Pre-book your VIP pass and stays today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenBooking("Festival Special Yatra")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-bhagwa font-extrabold hover:bg-sacred-cream transition-all shadow-md"
            >
              Secure Special Slots
            </button>
            <a
              href="tel:+919009966566"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call +91 90099 66566</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Contact & Enquiry Form */}
      <section id="contact" className="py-20 bg-sacred-cream/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Details Card */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-bhagwa uppercase tracking-widest">Get in Touch</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth mt-2 mb-6 font-serif">
                Have Questions? Talk to Our Spiritual Tour Planner
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you need details on temple dress codes, senior citizen assistance, wheelchair availability, puja booking fees, or custom itineraries for large groups, our travel coordinator is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-orange-100/50 text-saffron">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-earth text-base">Office Address</h4>
                    <p className="text-sm text-gray-500">101, Mahakal Complex, Near Hari Phatak, Ujjain, MP, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-orange-100/50 text-saffron">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-earth text-base">Direct Enquiries</h4>
                    <p className="text-sm text-gray-500">Phone: +91 90099 66566</p>
                    <p className="text-sm text-gray-500">Email: booking@ujjainmahakalyatra.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-orange-100/50 text-saffron">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-earth text-base">Working Hours</h4>
                    <p className="text-sm text-gray-500">Mon - Sun: 7:00 AM - 10:00 PM (Puja assistance available 24/7)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reusable Enquiry Form */}
            <EnquiryForm 
              initialPackage={selectedPackage}
              onEnquirySubmit={handleEnquirySubmit}
            />

          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <ReviewsSection />

      {/* 7. Footer Sitemap */}
      <Footer />

      {/* 8. Booking Form Modal Popup */}
      <BookingModal 
        isOpen={isBookModalOpen}
        onClose={handleCloseBooking}
        selectedPackage={selectedPackage}
        onEnquirySubmit={handleEnquirySubmit}
      />
    </div>
  );
}
