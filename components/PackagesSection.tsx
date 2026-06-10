"use client";

import React from "react";
import { Package } from "../data/yatras";
import PackageCard from "./PackageCard";

interface PackagesSectionProps {
  packages: Package[];
  onBookClick: (title: string) => void;
}

export default function PackagesSection({ packages, onBookClick }: PackagesSectionProps) {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-bhagwa uppercase tracking-widest">Spiritual Journeys</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-earth mt-2 font-serif">
            Our Devotional Yatra Packages
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4">
            Carefully curated tours that combine strict temple traditions, hassle-free VIP darshans, comfortable stays, and guides well-versed in shastras.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={idx}
              onBookClick={onBookClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
