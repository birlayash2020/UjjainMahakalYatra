"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "../data/yatras";

interface PackageCardProps {
  pkg: Package;
  index: number;
  onBookClick: (title: string) => void;
}

export default function PackageCard({ pkg, index, onBookClick }: PackageCardProps) {
  // Use slides circular mapping for illustration images
  const slideIndex = (index % 3) + 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-2">
      {/* Top Banner & Header Image */}
      <Link href={`/packages/${pkg.id}`} className="h-48 relative overflow-hidden bg-gray-100 block">
        <Image
          src={`/images/slide${slideIndex}.png`}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Floating badge for tags */}
        <div className="absolute top-4 left-4 bg-bhagwa text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {pkg.tag}
        </div>
        {/* Duration bottom overlay gradient */}
        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <span className="text-white text-xs font-medium tracking-wide uppercase">
            {pkg.duration}
          </span>
        </div>
      </Link>

      {/* Package Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Star ratings */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < pkg.rating ? "text-marigold fill-marigold" : "text-gray-300"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-charcoal-earth font-serif group-hover:text-bhagwa transition-colors mb-2">
            <Link href={`/packages/${pkg.id}`}>
              {pkg.title}
            </Link>
          </h3>

          {/* Places Covers Badges */}
          {pkg.places_covered && (() => {
            const places = pkg.places_covered.split(",");
            const showEllipsis = places.length > 5;
            const displayedPlaces = places.slice(0, 5);

            return (
              <div className="flex flex-wrap items-center gap-2 mb-4 mt-2.5">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mr-1">
                  Covers:
                </span>
                {displayedPlaces.map((place, pIdx) => (
                  <span 
                    key={pIdx}
                    className="inline-flex items-center text-xs font-bold bg-orange-50/70 hover:bg-orange-50 text-bhagwa px-2.5 py-1 rounded-full border border-orange-100/60 shadow-sm transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1 text-saffron shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {place.trim()}
                  </span>
                ))}
                {showEllipsis && (
                  <span className="inline-flex items-center text-xs font-extrabold bg-gray-50 text-gray-400 px-2.5 py-1 rounded-full border border-gray-100 shadow-sm" title={`${places.length - 5} more places`}>
                    ...
                  </span>
                )}
              </div>
            );
          })()}

          {/* Bulleted Included Highlights */}
          <ul className="space-y-2.5 mb-6 text-sm text-gray-600">
            {pkg.features.map((feat, i) => (
              <li key={i} className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-saffron shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing and Buttons */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-400 block uppercase font-medium">Starting from</span>
            <span className="text-2xl font-black text-bhagwa font-serif">{pkg.price}</span>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="px-4 py-2 rounded-lg border border-orange-200 text-bhagwa font-bold text-xs hover:bg-sacred-cream transition-all focus:outline-none"
            >
              Details
            </Link>
            <button
              onClick={() => onBookClick(pkg.title)}
              className="px-4 py-2 rounded-lg gradient-bg text-white font-bold text-xs hover:opacity-95 transition-all shadow-sm focus:outline-none"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
