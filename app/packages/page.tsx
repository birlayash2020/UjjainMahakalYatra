"use client";

import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import PackageCard from "../../components/PackageCard";
import BookingModal from "../../components/BookingModal";
import Footer from "../../components/Footer";

// Import packages data (can easily bind to SQL / dynamic APIs later)
import { packagesData } from "../../data/yatras";

export default function PackagesPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

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
    console.log("📤 Package Enquiry Submitted Successfully from Packages Page:", formData);
  };

  const handleDownloadItinerary = () => {
    alert("📥 Your PDF Itinerary for Ujjain & Omkareshwar Yatra has started downloading!");
  };

  // 1. FILTERING LOGIC
  const filteredPackages = useMemo(() => {
    if (categoryFilter === "all") return packagesData;
    if (categoryFilter === "jyotirlinga") {
      // Show packages with Mahakal or Omkareshwar in title/features
      return packagesData.filter(
        (pkg) => 
          pkg.title.toLowerCase().includes("mahakal") || 
          pkg.title.toLowerCase().includes("dham") ||
          pkg.title.toLowerCase().includes("omkareshwar")
      );
    }
    if (categoryFilter === "jain") {
      // Show Jain tirth packages
      return packagesData.filter(
        (pkg) => pkg.title.toLowerCase().includes("jain")
      );
    }
    return packagesData;
  }, [categoryFilter]);

  // 2. SORTING LOGIC
  const sortedPackages = useMemo(() => {
    const items = [...filteredPackages];
    if (sortBy === "price-asc") {
      return items.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
        const valB = parseInt(b.price.replace(/[^\d]/g, ""), 10);
        return valA - valB;
      });
    }
    if (sortBy === "price-desc") {
      return items.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
        const valB = parseInt(b.price.replace(/[^\d]/g, ""), 10);
        return valB - valA;
      });
    }
    if (sortBy === "rating") {
      return items.sort((a, b) => b.rating - a.rating);
    }
    return items; // Default order
  }, [filteredPackages, sortBy]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* Top Banner message */}
      <div className="bg-bhagwa text-white text-xs font-semibold py-2 px-4 text-center tracking-wide shadow-sm">
        🕉️ Welcome to Ujjain Mahakal Yatra - Book your spiritual package today
      </div>

      {/* 1. Header Navbar */}
      <Navbar 
        onBookNowClick={() => handleOpenBooking()} 
        onDownloadClick={handleDownloadItinerary} 
      />

      {/* 2. Subpage Header (Hero banner) */}
      <section className="relative bg-charcoal-earth py-20 overflow-hidden">
        {/* Subtle orange glow/decorations */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-bhagwa/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-marigold text-charcoal-earth font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Custom Yatra Stays & Pujas
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
            Pilgrimage Tour Packages
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Select from our standard packages or customize your itinerary with VIP temple access, Pandit Ji bookings, pure vegetarian catering, and comfortable transit arrangements.
          </p>
        </div>
      </section>

      {/* 3. Filters & Grid Layout */}
      <main className="flex-1 bg-sacred-cream/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar (Filter Buttons & Sorting Dropdown) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-orange-100">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                  categoryFilter === "all"
                    ? "bg-bhagwa text-white shadow-md"
                    : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
                }`}
              >
                All Yatras
              </button>
              <button
                onClick={() => setCategoryFilter("jyotirlinga")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                  categoryFilter === "jyotirlinga"
                    ? "bg-bhagwa text-white shadow-md"
                    : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
                }`}
              >
                Jyotirlinga Dham Tours
              </button>
              <button
                onClick={() => setCategoryFilter("jain")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                  categoryFilter === "jain"
                    ? "bg-bhagwa text-white shadow-md"
                    : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
                }`}
              >
                Jain Tirth Yatras
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-bold text-gray-400 uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-charcoal-earth font-semibold focus:outline-none focus:border-bhagwa"
              >
                <option value="default">Default Listing</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 text-xs sm:text-sm text-gray-500 font-medium">
            Showing {sortedPackages.length} spiritual {sortedPackages.length === 1 ? "package" : "packages"} based on your selection
          </div>

          {/* Packages Cards Grid */}
          {sortedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedPackages.map((pkg, idx) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  index={idx}
                  onBookClick={handleOpenBooking}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <span className="text-4xl">🕉️</span>
              <h3 className="text-lg font-bold font-serif text-charcoal-earth mt-4">No Yatras Found</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                We couldn&apos;t find any package matching that filter. Please contact our spiritual planner to design a custom package for you.
              </p>
              <button
                onClick={() => handleOpenBooking("Custom Yatra Request")}
                className="mt-6 px-6 py-2.5 rounded-lg gradient-bg text-white font-bold text-sm shadow-md"
              >
                Create Custom Yatra
              </button>
            </div>
          )}

        </div>
      </main>

      {/* 4. Support Helpline CTA */}
      <section className="bg-bhagwa text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif">Planning a Special Group Yatra?</h3>
            <p className="text-orange-100 text-sm mt-1">Get customized discounts for senior citizens and school/temple associations.</p>
          </div>
          <button
            onClick={() => handleOpenBooking("Custom Group Tour Request")}
            className="px-8 py-3.5 rounded-lg bg-white text-bhagwa font-bold hover:bg-sacred-cream transition-all shadow-md focus:outline-none shrink-0"
          >
            Get Custom Group Quote
          </button>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Booking Modal */}
      <BookingModal 
        isOpen={isBookModalOpen}
        onClose={handleCloseBooking}
        selectedPackage={selectedPackage}
        onEnquirySubmit={handleEnquirySubmit}
      />
    </div>
  );
}
