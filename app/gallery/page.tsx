"use client";

import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "../../components/BookingModal";

import { GalleryItem } from "../../data/types";

const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Mahakaleshwar Jyotirlinga",
    location: "Ujjain, Madhya Pradesh",
    category: "jyotirlinga",
    image: "/images/gallery_mahakal.png",
    description: "One of the most famous Jyotirlingas, dedicated to Lord Shiva in the form of Mahakal (Lord of Time)."
  },
  {
    id: "gal-2",
    title: "Omkareshwar Jyotirlinga",
    location: "Mandhata Island, Madhya Pradesh",
    category: "jyotirlinga",
    image: "/images/gallery_omkareshwar.png",
    description: "Located on a river island shaped naturally like the sacred Hindu symbol 'OM'."
  },
  {
    id: "gal-3",
    title: "Kedarnath Temple",
    location: "Garhwal Himalayas, Uttarakhand",
    category: "jyotirlinga",
    image: "/images/gallery_kedarnath.png",
    description: "A historic stone temple dedicated to Lord Shiva, located in the snow-capped Himalayan ranges."
  },
  {
    id: "gal-4",
    title: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    category: "jyotirlinga",
    image: "/images/gallery_kashi.png",
    description: "Standing on the western bank of the holy river Ganges, representing the spiritual heart of India."
  },
  {
    id: "gal-5",
    title: "Somnath Jyotirlinga",
    location: "Veraval, Gujarat",
    category: "jyotirlinga",
    image: "/images/gallery_somnath.png",
    description: "The first among the twelve Jyotirlinga shrines, constructed majestically by the shore of the Arabian Sea."
  },
  {
    id: "gal-6",
    title: "Avanthika Parshwanath Jain Tirth",
    location: "Ujjain, Madhya Pradesh",
    category: "jain",
    image: "/images/gallery_jain_tirth.png",
    description: "A highly revered ancient Jain pilgrimage site, known for its tranquil energy and detailed marble architecture."
  }
];

export default function GalleryPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "jyotirlinga" | "sacred" | "jain">("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* 1. Header Navbar */}
      <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />

      {/* 2. Hero/Header banner */}
      <section className="relative bg-charcoal-earth py-20 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-bhagwa/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-marigold text-charcoal-earth font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Sacred Darshan Photos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif mb-4 leading-tight">
            Divine Photo Gallery
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Take a virtual tour of the most sacred Hindu temples, Jyotirlingas, and peaceful Jain tirths across India.
          </p>
        </div>
      </section>

      {/* 3. Filters & Gallery Grid */}
      <main className="flex-1 bg-sacred-cream/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Tab selector */}
          <div className="flex justify-center items-center gap-2 mb-12 pb-6 border-b border-orange-100 flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                activeCategory === "all"
                  ? "bg-bhagwa text-white shadow-md scale-105"
                  : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
              }`}
            >
              All Divine Places
            </button>
            <button
              onClick={() => setActiveCategory("jyotirlinga")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                activeCategory === "jyotirlinga"
                  ? "bg-bhagwa text-white shadow-md scale-105"
                  : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
              }`}
            >
              Jyotirlinga Temples
            </button>
            <button
              onClick={() => setActiveCategory("jain")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none ${
                activeCategory === "jain"
                  ? "bg-bhagwa text-white shadow-md scale-105"
                  : "bg-white text-charcoal-earth border border-gray-200 hover:bg-sacred-cream"
              }`}
            >
              Jain Tirths
            </button>
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo frame */}
                <div className="h-64 relative overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-earth/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold px-2 py-1 rounded bg-bhagwa/95">
                      🔎 Click to View Large
                    </span>
                  </div>
                </div>

                {/* Description Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-bhagwa uppercase tracking-wider block mb-1">
                      {item.location}
                    </span>
                    <h3 className="text-xl font-bold text-charcoal-earth font-serif mb-2 group-hover:text-bhagwa transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* 4. Support Helpline/CTA */}
      <section className="bg-bhagwa text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-2">Inspired by the Divine Beauty?</h3>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            We provide fully assisted tour packages with VIP darshan passes, local transport, hotel stays, and verified Pandit Ji Puja bookings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-bhagwa font-extrabold hover:bg-sacred-cream transition-all shadow-md"
            >
              Book Yatra Now
            </button>
            <Link
              href="/packages"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold hover:bg-white/10 transition-all text-center"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Booking Modal */}
      <BookingModal 
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        selectedPackage="Gallery Page Custom Enquiry"
        onEnquirySubmit={(formData) => console.log("Gallery Page Booking:", formData)}
      />

      {/* 7. Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal-earth/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full relative border border-gray-100 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-charcoal-earth/80 hover:bg-bhagwa text-white flex items-center justify-center font-bold text-sm focus:outline-none transition-colors"
            >
              ✕
            </button>

            {/* Left Column: Big Image */}
            <div className="relative h-64 sm:h-96 md:h-[450px] md:w-3/5 bg-gray-100">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Column: Text Information */}
            <div className="p-8 md:w-2/5 flex flex-col justify-between bg-sacred-cream/15">
              <div>
                <span className="text-xs font-bold text-bhagwa uppercase tracking-widest block mb-2">
                  {selectedImage.location}
                </span>
                <h3 className="text-2xl font-black text-charcoal-earth font-serif mb-4">
                  {selectedImage.title}
                </h3>
                <div className="w-12 h-0.5 bg-bhagwa mb-4"></div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setIsBookModalOpen(true);
                  }}
                  className="w-full px-6 py-3 rounded-xl gradient-bg text-white text-xs font-bold shadow-md hover:shadow-lg transition-all text-center focus:outline-none"
                >
                  Enquire About This Place
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-xs font-bold hover:bg-gray-50 transition-all text-center focus:outline-none"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
