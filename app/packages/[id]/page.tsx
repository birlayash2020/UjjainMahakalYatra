"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import BookingModal from "../../../components/BookingModal";
import EnquiryForm from "../../../components/EnquiryForm";
import Footer from "../../../components/Footer";

// Import packages data
import { packagesData, Package } from "../../../data/yatras";
import { generatePackageItineraryPDF } from "../../../utils/pdfGenerator";

export default function PackageDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Retrieve current package details
  const pkg = useMemo(() => {
    return packagesData.find((p) => p.id === id);
  }, [id]);

  const handleEnquirySubmit = (formData: {
    name: string;
    phone: string;
    date: string;
    package: string;
    message: string;
  }) => {
    console.log("📤 Enquiry Submitted for specific package details page:", formData);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  const handleDownloadItinerary = () => {
    if (!pkg) return;
    generatePackageItineraryPDF(pkg, itinerary);
  };

  const handleCloseBooking = () => {
    setIsBookModalOpen(false);
  };

  // Render 404 fallback if package id not found
  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
        <Navbar onBookNowClick={() => setIsBookModalOpen(true)} onDownloadClick={handleDownloadItinerary} />
        <main className="flex-1 flex flex-col items-center justify-center bg-sacred-cream/20 p-12 text-center">
          <span className="text-5xl">🕉️</span>
          <h1 className="text-2xl font-bold font-serif text-charcoal-earth mt-4">Package Not Found</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-sm">
            We couldn&apos;t find the specific yatra package you are looking for. It may have been updated or moved.
          </p>
          <Link href="/packages" className="mt-6 px-6 py-2.5 rounded-lg gradient-bg text-white font-bold text-sm shadow-md">
            Browse All Yatras
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Circular mapping for illustration images based on packages list index
  const packageIndex = packagesData.findIndex((p) => p.id === pkg.id);
  const slideIndex = (packageIndex !== -1 ? packageIndex % 3 : 0) + 1;

  // Use the itinerary from package data if available, fallback to generation logic
  const itinerary = pkg.itinerary || [
    {
      day: "Day 1: Spiritual Arrival & Holy Darshan",
      details: `Arrive in Ujjain / Khandwa and check into your premium 3-Star hotel. After refreshing, meet our spiritual guide who will escort you to the temple. Enjoy VIP fast-track entry for ${pkg.title.includes("Do Dham") ? "Ujjain Mahakaleshwar" : "darshan"}. In the evening, walk along the sacred ghats for the holy Aarti ceremony.`
    },
    {
      day: "Day 2: Vedic Pujas & Sightseeing",
      details: pkg.title.includes("Express") 
        ? "Attend the mystical early morning Bhasma Aarti (subject to pre-booking). Participate in a customized Rudrabhishek Puja conducted by our experienced Vedic Pandit. Visit Kal Bhairav temple and Harsiddhi Shaktipeeth before returning to the station for departure."
        : `Drive down to Omkareshwar / Mamleshwar Jyotirlinga. Cross the Narmada River on a traditional boat. Perform Mamleshwar Abhishek Puja. Visit Siddhanath Temple and proceed with local sightseeing before checking out.`
    }
  ];

  if (!pkg.itinerary) {
    // If it's a 3+ day package, add more days dynamically
    if (pkg.duration.includes("3") || pkg.duration.includes("4")) {
      itinerary.push({
        day: "Day 3: Exploration of Shaktipeeths & Jain Tirths",
        details: "Explore ancient cave temples, Avanthika Parshwanath Jain Temple, and Hanumantiya Island waterscapes. Savor a traditional satvik lunch. Join an evening spiritual discussion on Vedic scriptures with local sadhus."
      });
    }
    if (pkg.duration.includes("4")) {
      itinerary.push({
        day: "Day 4: Departure with Holy Blessings",
        details: "Participate in a morning havan (fire ritual) for family peace. Collect prasadam and souvenirs. Checkout from hotel and transfer to Indore / Ujjain airport or railway station for your onward journey."
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* Top Banner accent */}
      <div className="bg-bhagwa text-white text-xs font-semibold py-2 px-4 text-center tracking-wide shadow-sm">
        🕉️ Exploring: {pkg.title} - VIP Pass & Assisted Vedic Puja Included
      </div>

      {/* 1. Navbar */}
      <Navbar 
        onBookNowClick={() => setIsBookModalOpen(true)} 
        onDownloadClick={handleDownloadItinerary} 
      />

      {/* 2. Breadcrumbs & Header Banner */}
      <section className="bg-gradient-to-br from-sacred-cream to-orange-50/20 py-12 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-gray-400 mb-2 flex items-center space-x-2">
            <Link href="/" className="hover:text-bhagwa">Home</Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-bhagwa">Yatra Packages</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[150px] sm:max-w-none">{pkg.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-bhagwa text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2 uppercase">
                {pkg.tag}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth font-serif leading-tight">
                {pkg.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center space-x-2">
                <span>🕒 {pkg.duration}</span>
                <span>•</span>
                <span className="text-marigold">★ 5.0 Rating</span>
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex space-x-3 shrink-0">
              <button
                onClick={handleDownloadItinerary}
                className="px-4 py-2.5 rounded-lg border border-orange-200 bg-white hover:bg-sacred-cream text-bhagwa font-bold text-xs flex items-center space-x-1.5 focus:outline-none"
              >
                <span>Download PDF Itinerary</span>
              </button>
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="px-6 py-2.5 rounded-lg gradient-bg text-white font-bold text-xs shadow-md focus:outline-none"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <main className="flex-1 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column (7/12 width) - Itinerary details */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Feature Image Frame */}
              <div className="h-64 sm:h-96 relative rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={`/images/slide${slideIndex}.png`}
                  alt={pkg.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Package Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-serif text-charcoal-earth">Yatra Overview</h2>
                <div className="w-16 h-1 gradient-bg rounded-full"></div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Join us on a sacred tour designed to give you a deep spiritual experience of the holy shrines of Madhya Pradesh. We manage all registrations, VIP entry passes, puja preparation, and hotels so you can pray in peace. Suitable for families, senior citizens, and group pilgrims.
                </p>
              </div>

              {/* Destinations Covered */}
              {pkg.places_covered && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-bold font-serif text-charcoal-earth">Destinations Covered</h3>
                  <div className="w-16 h-0.5 bg-orange-100 rounded-full"></div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.places_covered.split(",").map((place, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-xs sm:text-sm font-bold bg-orange-50/70 text-bhagwa px-3.5 py-1.5 rounded-full border border-orange-100/50 shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 mr-1.5 text-saffron shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {place.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included */}
              <div className="bg-sacred-cream/40 p-6 sm:p-8 rounded-2xl border border-orange-100">
                <h3 className="text-xl font-bold font-serif text-bhagwa mb-4">What is Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                    <span>24/7 Helpline Assistance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-saffron text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                    <span>All toll taxes & driver charges</span>
                  </li>
                </ul>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-serif text-charcoal-earth">Day-by-Day Itinerary</h2>
                <div className="w-16 h-1 gradient-bg rounded-full"></div>
                
                <div className="relative border-l-2 border-orange-100 pl-6 space-y-8 mt-6">
                  {itinerary.map((dayPlan, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-bhagwa border-4 border-white shadow-sm"></span>
                      <h4 className="font-bold text-base sm:text-lg text-charcoal-earth font-serif">
                        {dayPlan.day}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {dayPlan.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devotional Advice & Dress Code */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-serif text-charcoal-earth">Important Temple Guidelines</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-500 list-disc list-inside">
                  <li><strong>Dress Code</strong>: Traditional wear is mandatory for sanctum entry. Dhoti-kurta for men and Saree/Salwar suit for women.</li>
                  <li><strong>Sanctum Entry</strong>: Entry inside the inner sanctum (garbhagriha) at Mahakal is subject to administration rules.</li>
                  <li><strong>Mobiles & Electronics</strong>: Mobile phones, bags, and electronic items are strictly prohibited inside the main temple boundary. Lockers are available.</li>
                </ul>
              </div>

            </div>

            {/* Right Column (5/12 width) - Booking Form / Sticky Card */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Sticky Price Summary Card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-semibold">Special Price</span>
                    <span className="text-3xl font-black text-bhagwa font-serif">{pkg.price}</span>
                    <span className="text-xs text-gray-400"> / Per Person</span>
                  </div>
                  <div className="bg-marigold/10 text-bhagwa text-xs font-bold px-3 py-1.5 rounded-lg text-center">
                    <div>{pkg.duration}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-charcoal-earth uppercase tracking-wide">Quick Booking Enquiry</h4>
                  {successMsg ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg p-4 text-center">
                      🙏 Thank you! Your Enquiry has been submitted. Our spiritual coordinator will call you back shortly.
                    </div>
                  ) : (
                    <EnquiryForm 
                      initialPackage={pkg.title}
                      onEnquirySubmit={handleEnquirySubmit}
                    />
                  )}
                </div>

                {/* Direct Call Widget */}
                <div className="bg-sacred-cream rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📞</span>
                    <div>
                      <h5 className="font-bold text-xs text-charcoal-earth">Prefer Talking?</h5>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">24/7 Spiritual Planner</p>
                    </div>
                  </div>
                  <a href="tel:+919009966566" className="bg-bhagwa text-white font-bold text-xs px-3.5 py-2 rounded-lg hover:bg-saffron transition-all">
                    Call Operator
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Booking Modal Popup */}
      <BookingModal 
        isOpen={isBookModalOpen}
        onClose={handleCloseBooking}
        selectedPackage={pkg.title}
        onEnquirySubmit={handleEnquirySubmit}
      />
    </div>
  );
}
