"use client";

import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingModal from "../../components/BookingModal";

import { FeedItem } from "../../data/types";

const liveFeeds: FeedItem[] = [
  {
    id: "feed-1",
    title: "Mahakaleshwar Jyotirlinga Daily Darshan",
    source: "Official YouTube Stream",
    embedId: "QpUXtW5R5nQ", // A placeholder devotional live/video ID, easily swap-able
    description: "Witness the divine daily aarti, bhasma shringar, and holy updates from the Mahakaleshwar Jyotirlinga shrine in Ujjain."
  },
  {
    id: "feed-2",
    title: "Omkareshwar Jyotirlinga Evening Aarti",
    source: "Devotional Coverage",
    embedId: "q6hS1u-3-Zc",
    description: "Experience the tranquil evening Narmada Aarti and prayers from the island shrine of Omkareshwar."
  }
];

export default function LiveDarshanPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [activeFeed, setActiveFeed] = useState<FeedItem>(liveFeeds[0]);
  const [isPlayingChant, setIsPlayingChant] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle ambient devotional background chant
  const handleToggleChant = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://archive.org/download/mahamrityunjaya-mantra/MahamrityunjayaMantra.mp3");
      audioRef.current.loop = true;
    }

    if (isPlayingChant) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }
    setIsPlayingChant(!isPlayingChant);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* 1. Header Navbar */}
      <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />

      {/* 2. Hero Header */}
      <section className="relative bg-charcoal-earth py-16 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-bhagwa/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-marigold text-charcoal-earth font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Virtual Mandir Tour
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif mb-3 leading-tight">
            Live Daily Darshan & Aarti
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Connect to the divine shrines from anywhere. View standard daily streams and toggle background Vedic mantra chanting to build your home temple experience.
          </p>
        </div>
      </section>

      {/* 3. Media Player Grid layout */}
      <main className="flex-1 bg-sacred-cream/25 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8/12 width) - Main Video Player */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-orange-100/60 rounded-3xl p-4 sm:p-6 shadow-md overflow-hidden">
                {/* Embed YouTube player aspect-video */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative shadow-inner">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeFeed.embedId}?autoplay=1&mute=1`}
                    title={activeFeed.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Player details */}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-50 pt-6">
                  <div>
                    <span className="text-[10px] font-bold text-bhagwa uppercase tracking-wider block mb-0.5">
                      {activeFeed.source}
                    </span>
                    <h2 className="text-xl font-bold text-charcoal-earth font-serif">
                      {activeFeed.title}
                    </h2>
                  </div>

                  {/* Ambient Audio Chant Controller */}
                  <button
                    onClick={handleToggleChant}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 shadow-sm focus:outline-none ${
                      isPlayingChant
                        ? "bg-bhagwa text-white animate-pulse"
                        : "bg-white border border-gray-200 text-charcoal-earth hover:bg-orange-50/50"
                    }`}
                  >
                    <span>{isPlayingChant ? "⏸ Pause Holy Chant" : "🎵 Play Mahamrityunjay Chant"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed">
                  {activeFeed.description}
                </p>
              </div>

              {/* Feed Selection List */}
              <div className="bg-white border border-orange-100/60 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-bold text-sm text-charcoal-earth uppercase tracking-wider">Select Sacred Channel:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {liveFeeds.map((feed) => (
                    <div
                      key={feed.id}
                      onClick={() => setActiveFeed(feed)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        activeFeed.id === feed.id
                          ? "bg-orange-50/50 border-bhagwa shadow-sm"
                          : "bg-white border-gray-200 hover:border-orange-200"
                      }`}
                    >
                      <h4 className="font-bold text-sm text-charcoal-earth font-serif">{feed.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Click to tune in</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (4/12 width) - Temple Timings & Guidelines */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-orange-100/60 rounded-3xl p-6 shadow-md space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-serif text-charcoal-earth">Darshan Timings</h3>
                  <div className="w-12 h-0.5 bg-bhagwa mt-1"></div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="border-b border-gray-100 pb-3">
                    <span className="font-bold text-charcoal-earth block">Ujjain Bhasma Aarti</span>
                    <span className="text-gray-500 block mt-0.5">⏱ 4:00 AM - 6:00 AM (Booking Mandatory)</span>
                  </div>

                  <div className="border-b border-gray-100 pb-3">
                    <span className="font-bold text-charcoal-earth block">General Darshan (Ujjain)</span>
                    <span className="text-gray-500 block mt-0.5">⏱ 6:00 AM - 1:00 PM | 6:00 PM - 10:00 PM</span>
                  </div>

                  <div className="border-b border-gray-100 pb-3">
                    <span className="font-bold text-charcoal-earth block">Omkareshwar Mangala Aarti</span>
                    <span className="text-gray-500 block mt-0.5">⏱ 5:00 AM - 5:30 AM</span>
                  </div>

                  <div>
                    <span className="font-bold text-charcoal-earth block">Omkareshwar Shringar Aarti</span>
                    <span className="text-gray-500 block mt-0.5">⏱ 8:30 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Devotional Advice and Guidelines */}
              <div className="bg-white border border-orange-100/60 rounded-3xl p-6 shadow-md space-y-4">
                <h4 className="font-bold text-sm text-charcoal-earth font-serif">Important Darshan Dress Code</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  For entering the inner sanctum (Garbhagriha) of both Mahakaleshwar & Omkareshwar to perform abhishek, traditional attire is strictly mandatory:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                  <li>Men: Saffron/white Dhoti & Solah</li>
                  <li>Women: Traditional Saree</li>
                  <li>Mobiles & electronics not allowed inside boundary</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Booking Modal */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        selectedPackage="Live Page Quick Call Request"
        onEnquirySubmit={(formData) => console.log("Live Page Booking Enquiry:", formData)}
      />
    </div>
  );
}
