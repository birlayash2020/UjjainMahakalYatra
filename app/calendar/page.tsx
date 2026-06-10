"use client";

import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingModal from "../../components/BookingModal";
import Link from "next/link";

// Import types & data
import { PanchangEvent } from "../../data/types";
import panchangEventsJson from "../../data/panchangEvents.json";
import { packagesData } from "../../data/yatras";

const panchangEvents = panchangEventsJson as PanchangEvent[];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  
  // Dynamically initialize current year and month based on local system time
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  
  // Calculate today at midnight for accurate past date comparisons
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Determine the default selected event (first event that is today or in the future)
  const defaultEvent = useMemo(() => {
    const futureEvents = panchangEvents.filter((e) => {
      const eDate = new Date(e.date);
      eDate.setHours(0, 0, 0, 0);
      return eDate >= today;
    });
    return futureEvents.length > 0 ? futureEvents[0] : panchangEvents[0];
  }, [today]);

  const [selectedEventId, setSelectedEventId] = useState<string>(() => defaultEvent?.id || "");

  // Retrieve active selected event details
  const selectedEvent = useMemo(() => {
    return panchangEvents.find((e) => e.id === selectedEventId) || defaultEvent;
  }, [selectedEventId, defaultEvent]);

  // Check if selected event is in the past
  const isSelectedEventPast = useMemo(() => {
    if (!selectedEvent) return false;
    const eDate = new Date(selectedEvent.date);
    eDate.setHours(0, 0, 0, 0);
    return eDate < today;
  }, [selectedEvent, today]);

  // Find the package recommended for this event
  const recommendedPackage = useMemo(() => {
    if (!selectedEvent) return null;
    return packagesData.find((p) => p.id === selectedEvent.recommendedPackageId);
  }, [selectedEvent]);

  // Calendar math calculations
  const totalDays = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const startDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  // Filter events that fall in the current year & month
  const currentMonthEvents = useMemo(() => {
    return panchangEvents.filter((event) => {
      const eDate = new Date(event.date);
      return eDate.getFullYear() === currentYear && eDate.getMonth() === currentMonth;
    });
  }, [currentYear, currentMonth]);

  // Handle month switching
  const handlePrevMonth = () => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
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
            Holy Muhurats & Tithis
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif mb-3 leading-tight">
            Vedic Panchang & Auspicious Travel Calendar
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Planning your pilgrimage around auspicious timings increases its spiritual fruits. Use our calendar to track key fasts, festivals, and planetary muhurats.
          </p>
        </div>
      </section>

      {/* 3. Main Calendar Layout */}
      <main className="flex-1 bg-sacred-cream/25 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (7/12 width) - Visual Monthly Calendar Grid */}
            <div className="lg:col-span-7 bg-white border border-orange-100/70 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Month Selector Controls */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-charcoal-earth font-serif">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevMonth}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 flex items-center justify-center text-sm focus:outline-none transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 flex items-center justify-center text-sm focus:outline-none transition-colors"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Weekly Day Headers */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Monthly Grid Dates */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells before start day of the month */}
                {Array.from({ length: startDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="aspect-square bg-gray-50/50 rounded-xl border border-dashed border-gray-100" />
                ))}

                {/* Day cells */}
                {Array.from({ length: totalDays }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const cellDate = new Date(currentYear, currentMonth, dayNum);
                  cellDate.setHours(0, 0, 0, 0);
                  const isPast = cellDate < today;

                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                  
                  // Check if this date has a holy event
                  const matchingEvent = panchangEvents.find((e) => e.date === dateStr);
                  const isSelected = selectedEvent && selectedEvent.date === dateStr;

                  return (
                    <div
                      key={`day-${dayNum}`}
                      onClick={() => {
                        // Disable selection on past dates
                        if (matchingEvent && !isPast) {
                          setSelectedEventId(matchingEvent.id);
                        }
                      }}
                      className={`aspect-square rounded-2xl flex flex-col justify-between p-2.5 border transition-all relative ${
                        isPast
                          ? matchingEvent
                            ? "bg-gray-100 border-gray-200 text-gray-400 opacity-60 cursor-not-allowed"
                            : "bg-gray-50/50 border-gray-100 text-gray-300 cursor-not-allowed"
                          : matchingEvent
                            ? isSelected
                              ? "bg-bhagwa border-bhagwa text-white shadow-md cursor-pointer scale-105"
                              : "bg-orange-50/70 border-saffron/30 text-bhagwa font-bold cursor-pointer hover:bg-orange-50 hover:border-bhagwa"
                            : "bg-white border-gray-100 text-charcoal-earth/70 hover:border-orange-100"
                      }`}
                    >
                      <span className="text-xs font-bold">{dayNum}</span>
                      
                      {matchingEvent && (
                        <div className="flex flex-col items-center">
                          {/* Saffron dot indicator or category badge */}
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isPast ? "bg-gray-400" : isSelected ? "bg-white" : "bg-bhagwa"
                          }`} />
                          <span className={`hidden sm:inline text-[8px] mt-1 font-sans text-center leading-none ${
                            isPast ? "text-gray-400" : isSelected ? "text-orange-100" : "text-gray-400"
                          }`}>
                            {matchingEvent.title.split(" ")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Month List View Indicator */}
              <div className="pt-4 border-t border-gray-50 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Auspicious Dates in {MONTH_NAMES[currentMonth]}:
                </h3>
                {currentMonthEvents.length > 0 ? (
                  <div className="space-y-2">
                    {currentMonthEvents.map((ev) => {
                      const evDate = new Date(ev.date);
                      evDate.setHours(0, 0, 0, 0);
                      const isEvPast = evDate < today;

                      return (
                        <div
                          key={ev.id}
                          onClick={() => {
                            if (!isEvPast) {
                              setSelectedEventId(ev.id);
                            }
                          }}
                          className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                            isEvPast
                              ? "bg-gray-50 border-gray-150 text-gray-400 opacity-60 cursor-not-allowed select-none pointer-events-none"
                              : selectedEventId === ev.id
                                ? "bg-orange-50/50 border-bhagwa cursor-pointer"
                                : "bg-white border-gray-200 hover:border-orange-150 cursor-pointer"
                          }`}
                        >
                          <div>
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 ${
                              isEvPast ? "bg-gray-200 text-gray-500" : "bg-saffron/10 text-bhagwa"
                            }`}>
                              {isEvPast ? "Past Event" : ev.category}
                            </span>
                            <h4 className="font-bold text-sm text-charcoal-earth font-serif">{ev.title}</h4>
                          </div>
                          <span className="text-xs font-semibold text-gray-400 font-serif">
                            📅 {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No major planetary transits or large festivals tracked in this month yet.</p>
                )}
              </div>
            </div>

            {/* Right Column (5/12 width) - Holy Day Details Panel */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {selectedEvent ? (
                <div className="bg-white border border-orange-100/70 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                  
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-bhagwa text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      🕉️ {selectedEvent.category}
                    </span>
                    {isSelectedEventPast && (
                      <span className="bg-gray-100 text-gray-505 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        Past Date
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-charcoal-earth font-serif">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold font-serif">
                      Auspicious Date: {new Date(selectedEvent.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", weekday: "long" })}
                    </p>
                  </div>

                  <div className="w-full h-0.5 bg-gray-55" />

                  {/* Spiritual Significance */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-charcoal-earth uppercase tracking-wider">Spiritual Significance:</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                      {selectedEvent.significance}
                    </p>
                  </div>

                  {/* Spiritual Benefits of visiting Ujjain on this date */}
                  <div className="bg-orange-50/35 border border-orange-100/60 p-4 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold text-bhagwa uppercase tracking-wider flex items-center space-x-1">
                      <span>✨ Yatra Benefits:</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                      {selectedEvent.benefits}
                    </p>
                  </div>

                  {/* Rich details specifically for Future Dates */}
                  {!isSelectedEventPast ? (
                    <>
                      {(selectedEvent.temple || selectedEvent.puja || selectedEvent.parikrama) && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-bold text-charcoal-earth uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                            <span>📿 Divine Experience Details</span>
                          </h4>

                          {selectedEvent.temple && (
                            <div className="bg-orange-50/25 border border-orange-100/40 p-4 rounded-2xl flex items-start space-x-3 transition-all hover:bg-orange-50/50">
                              <span className="text-2xl mt-0.5" role="img" aria-label="temple">🛕</span>
                              <div className="space-y-0.5">
                                <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Holy Temple / Place</h5>
                                <p className="text-xs sm:text-sm font-bold text-charcoal-earth font-serif">{selectedEvent.temple}</p>
                              </div>
                            </div>
                          )}

                          {selectedEvent.puja && (
                            <div className="bg-orange-50/25 border border-orange-100/40 p-4 rounded-2xl flex items-start space-x-3 transition-all hover:bg-orange-50/50">
                              <span className="text-2xl mt-0.5" role="img" aria-label="puja">🪔</span>
                              <div className="space-y-0.5">
                                <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Auspicious Puja / Vidhi</h5>
                                <p className="text-xs sm:text-sm font-bold text-charcoal-earth font-serif">{selectedEvent.puja}</p>
                              </div>
                            </div>
                          )}

                          {selectedEvent.parikrama && (
                            <div className="bg-orange-50/25 border border-orange-100/40 p-4 rounded-2xl flex items-start space-x-3 transition-all hover:bg-orange-50/50">
                              <span className="text-2xl mt-0.5" role="img" aria-label="parikrama">🔁</span>
                              <div className="space-y-0.5">
                                <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sacred Parikrama</h5>
                                <p className="text-xs sm:text-sm font-bold text-charcoal-earth font-serif">{selectedEvent.parikrama}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Recommended Yatra Package Link */}
                      {recommendedPackage && (
                        <div className="border border-gray-150 rounded-2xl p-4 space-y-3.5">
                          <div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Recommended Package</span>
                            <h4 className="font-bold text-sm text-charcoal-earth font-serif">
                              {recommendedPackage.title}
                            </h4>
                            <span className="text-xs text-bhagwa font-bold font-serif">{recommendedPackage.price} per person</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link
                              href={`/packages/${recommendedPackage.id}`}
                              className="flex-1 text-center py-2.5 rounded-xl border border-orange-250 text-bhagwa text-xs font-bold hover:bg-orange-50/50 transition-all focus:outline-none"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => setIsBookModalOpen(true)}
                              className="flex-1 py-2.5 rounded-xl gradient-bg text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all focus:outline-none"
                            >
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-gray-50 border border-gray-150 p-4 rounded-2xl text-center space-y-1">
                      <p className="text-xs font-semibold text-gray-500">
                        📅 This auspicious date has passed.
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Please browse future dates in the calendar to discover active temples, pujas, and parikramas.
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-white border border-orange-100/70 rounded-3xl p-8 shadow-md text-center">
                  <span className="text-3xl">🕉️</span>
                  <h3 className="text-lg font-bold font-serif text-charcoal-earth mt-4">Select Holy Date</h3>
                  <p className="text-sm text-gray-400 mt-2">Click on any highlighted orange day on the calendar to view its spiritual significance.</p>
                </div>
              )}

            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Booking Modal Popup */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        selectedPackage={selectedEvent ? `Auspicious Muhurat Booking: ${selectedEvent.title}` : "Panchang Calendar Enquiry"}
        onEnquirySubmit={(formData) => console.log("Panchang Booking Enquiry:", formData)}
      />
    </div>
  );
}
