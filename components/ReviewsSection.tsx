"use client";

import React from "react";

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const reviewsData: Review[] = [
  {
    id: "rev-1",
    name: "Amit Sharma",
    role: "Local Guide • 42 reviews",
    rating: 5,
    date: "1 week ago",
    comment: "We booked the Do Dham Yatra package for our parents. The transport was clean, and the Pandit Ji arranged for Mamleshwar Puja was very knowledgeable. Truly a divine and well-organized experience!",
    verified: true
  },
  {
    id: "rev-2",
    name: "Priya Patel",
    role: "Verified Devotee",
    rating: 5,
    date: "2 weeks ago",
    comment: "Excellent service! We got VIP passes for Ujjain Mahakal Bhasma Aarti without any queue hassle. The hotel stay was neat, and the satvik (garlic-onion free) food was delicious.",
    verified: true
  },
  {
    id: "rev-3",
    name: "Dr. Rajesh Gupta",
    role: "Local Guide • 18 reviews",
    rating: 5,
    date: "1 month ago",
    comment: "The Narmada Parikrama Yatra was organized flawlessly. They provided comfortable lodging and backup vehicles, which was an immense support for the elders in our group. Highly trustworthy!",
    verified: true
  },
  {
    id: "rev-4",
    name: "Sneha Jain",
    role: "Verified Pilgrim",
    rating: 5,
    date: "1 month ago",
    comment: "Highly recommend their Jain Tirth circuit. We visited Avanthika Parshwanath Temple and other sites very comfortably. Drivers were extremely polite and punctual.",
    verified: true
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-sacred-cream/20 border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-bhagwa uppercase tracking-widest">Devotee Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth mt-2 font-serif">
            What Our Yatris Say On Google Reviews
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Reviews Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Aggregated Rating card (Left Column, 4/12) */}
          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-orange-100 shadow-md flex flex-col items-center text-center">
            {/* Google Brand Logo */}
            <div className="flex items-center space-x-1 mb-4">
              <span className="font-extrabold text-2xl tracking-tight text-gray-500 font-sans">
                <span className="text-blue-600">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-600">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Reviews</span>
            </div>

            {/* Score */}
            <div className="text-6xl font-black text-charcoal-earth font-serif">4.9</div>
            
            {/* Aggregate Stars */}
            <div className="flex text-marigold space-x-1 my-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Verified Counter */}
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-6">
              Based on 248 Devotee Reviews
            </p>

            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-lg border border-orange-200 text-bhagwa font-bold text-sm bg-sacred-cream hover:gradient-bg hover:text-white transition-all shadow-sm focus:outline-none"
            >
              Write a Review
            </a>
          </div>

          {/* Reviews List grid (Right Column, 8/12) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviewsData.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* User info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-bhagwa font-bold flex items-center justify-center text-sm">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-charcoal-earth leading-tight">{rev.name}</h4>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.role}</span>
                      </div>
                    </div>

                    {/* Google Logo / Icon */}
                    <span className="text-blue-600 font-bold text-xs">G</span>
                  </div>

                  {/* Stars & Date */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex text-marigold space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>

                  {/* Content comment */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Verified badge */}
                {rev.verified && (
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center space-x-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                    <span className="text-xs">✓</span>
                    <span>Verified Yatri booking</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
