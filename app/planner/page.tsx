"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingModal from "../../components/BookingModal";
import Link from "next/link";

import {
  PlannerDestination,
  PlannerTransport,
  PlannerStay,
  PlannerDevotionalService
} from "../../data/types";

// Import options dynamically
import plannerOptionsJson from "../../data/plannerOptions.json";

const plannerOptions = plannerOptionsJson as {
  destinations: PlannerDestination[];
  transports: PlannerTransport[];
  stays: PlannerStay[];
  devotionalServices: PlannerDevotionalService[];
};

export default function PlannerPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // 1. Step-by-Step Form States
  const [passengers, setPassengers] = useState<number>(2);
  const [selectionMode, setSelectionMode] = useState<"state" | "temple">("state");
  const [selectedStates, setSelectedStates] = useState<string[]>(["Madhya Pradesh"]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string>("tr-sedan");
  const [selectedStay, setSelectedStay] = useState<string>("stay-three-star");
  const [nights, setNights] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);

  // Dynamic puja & services configuration states
  const [bhasmaQuantity, setBhasmaQuantity] = useState<number>(0);
  const [gangaAartiQuantity, setGangaAartiQuantity] = useState<number>(0);
  const [vipDarshanQuantities, setVipDarshanQuantities] = useState<Record<string, number>>({});
  const [mealsQuantity, setMealsQuantity] = useState<number>(2);
  const [hasPandit, setHasPandit] = useState<boolean>(true);

  // Unique list of states
  const statesList = useMemo(() => {
    return Array.from(new Set(plannerOptions.destinations.map((d) => d.state)));
  }, []);

  // Room limits
  const minRooms = useMemo(() => Math.max(1, Math.ceil(passengers / 3)), [passengers]);
  const maxRooms = passengers;

  // Sync rooms and services quantity boundaries dynamically when passengers count updates
  useEffect(() => {
    setRooms((prev) => {
      if (prev < minRooms) return minRooms;
      if (prev > maxRooms) return maxRooms;
      return prev;
    });

    setBhasmaQuantity((prev) => (prev > passengers ? passengers : prev));
    setGangaAartiQuantity((prev) => (prev > passengers ? passengers : prev));
    setMealsQuantity((prev) => (prev > passengers ? passengers : prev));
    setVipDarshanQuantities((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k] > passengers) {
          next[k] = passengers;
        }
      });
      return next;
    });
  }, [passengers, minRooms, maxRooms]);

  // Sync sub-services and auto-select states when selected destinations change
  useEffect(() => {
    // If Mahakaleshwar (dest-1) is not selected, remove Bhasma Aarti
    if (!selectedDestinations.includes("dest-1")) {
      setBhasmaQuantity(0);
    }
    // If Kashi (dest-7) is not selected, remove Ganga Aarti
    if (!selectedDestinations.includes("dest-7")) {
      setGangaAartiQuantity(0);
    }

    // Clean up VIP Darshan records for deselected temples
    setVipDarshanQuantities((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((dId) => {
        if (!selectedDestinations.includes(dId)) {
          delete next[dId];
        }
      });
      return next;
    });

    // Auto-select states corresponding to chosen destinations in direct mandir selection mode
    if (selectionMode === "temple") {
      const activeStates = Array.from(
        new Set(
          selectedDestinations
            .map((dId) => plannerOptions.destinations.find((d) => d.id === dId)?.state)
            .filter(Boolean) as string[]
        )
      );
      setSelectedStates(activeStates.length > 0 ? activeStates : []);
    }
  }, [selectedDestinations, selectionMode]);

  // Toggle multi-select states
  const handleToggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state)
        ? prev.filter((s) => s !== state)
        : [...prev, state]
    );
  };

  // Toggle multi-select destinations
  const handleToggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  // Filter destinations based on selected states if in "state" selection mode
  const filteredDestinations = useMemo(() => {
    if (selectionMode === "state") {
      return plannerOptions.destinations.filter((d) => selectedStates.includes(d.state));
    }
    return plannerOptions.destinations; // Show all temples
  }, [selectionMode, selectedStates]);

  // 3. Pricing & Sizing Calculations
  const transport = useMemo(() => {
    return plannerOptions.transports.find((t) => t.id === selectedTransport);
  }, [selectedTransport]);

  const vehicleQuantity = useMemo(() => {
    if (!transport) return 1;
    return Math.ceil(passengers / transport.capacity);
  }, [transport, passengers]);

  const transportCost = useMemo(() => {
    if (!transport) return 0;
    const days = selectedStay === "stay-none" ? 1 : nights + 1;
    return transport.pricePerDay * days * vehicleQuantity;
  }, [transport, selectedStay, nights, vehicleQuantity]);

  const stayCost = useMemo(() => {
    const stay = plannerOptions.stays.find((s) => s.id === selectedStay);
    if (!stay || selectedStay === "stay-none") return 0;
    return stay.pricePerNight * nights * rooms;
  }, [selectedStay, nights, rooms]);

  const servicesCost = useMemo(() => {
    // Dynamic Bhasma Aarti (₹500)
    const bhasmaCost = selectedDestinations.includes("dest-1") ? 500 * bhasmaQuantity : 0;
    
    // Dynamic Ganga Aarti (₹600)
    const gangaCost = selectedDestinations.includes("dest-7") ? 600 * gangaAartiQuantity : 0;

    // Dynamic VIP Darshan Passes (₹300 per temple per person)
    let vipCost = 0;
    selectedDestinations.forEach((dId) => {
      const qty = vipDarshanQuantities[dId] || 0;
      vipCost += 300 * qty;
    });

    // Satvik Meals Package (₹400 per person per day)
    const mealsDays = selectedStay === "stay-none" ? 1 : nights;
    const mealsCost = 400 * mealsQuantity * mealsDays;

    // Vedic Pandit Puja flat rate (₹1,500)
    const panditCost = hasPandit ? 1500 : 0;

    return bhasmaCost + gangaCost + vipCost + mealsCost + panditCost;
  }, [selectedDestinations, bhasmaQuantity, gangaAartiQuantity, vipDarshanQuantities, mealsQuantity, hasPandit, selectedStay, nights]);

  const totalCost = transportCost + stayCost + servicesCost;

  // Custom WhatsApp redirect message constructor
  const handleWhatsAppRedirect = () => {
    const transportName = transport?.name || "";
    const stayName = plannerOptions.stays.find((s) => s.id === selectedStay)?.name || "";
    
    const destinationNames = selectedDestinations
      .map((dId) => plannerOptions.destinations.find((d) => d.id === dId)?.name || "")
      .filter(Boolean)
      .join(", ");

    const serviceStrings: string[] = [];
    if (bhasmaQuantity > 0) serviceStrings.push(`VIP Bhasma Aarti for ${bhasmaQuantity} pax`);
    if (gangaAartiQuantity > 0) serviceStrings.push(`Ganga Aarti Boat for ${gangaAartiQuantity} pax`);
    
    selectedDestinations.forEach((dId) => {
      const qty = vipDarshanQuantities[dId] || 0;
      if (qty > 0) {
        const tName = plannerOptions.destinations.find((d) => d.id === dId)?.name || "";
        serviceStrings.push(`VIP Darshan at ${tName.split("(")[0].trim()} (${qty} pax)`);
      }
    });

    if (mealsQuantity > 0) serviceStrings.push(`Satvik Meals for ${mealsQuantity} pax`);
    if (hasPandit) serviceStrings.push("Vedic Pandit Ji Puja");

    const message = `Pranam! I want to book a custom Yatra. Selections:

*Total Travelers:* ${passengers} Persons
*Holy Destinations:* ${destinationNames || "None"}
*States Visited:* ${selectedStates.join(", ")}

*Vehicle:* ${transportName} (Qty: ${vehicleQuantity})
*Stays:* ${selectedStay === "stay-none" ? "No Stays Requested" : `${stayName} (${nights} Nights, ${rooms} Rooms)`}
*Devotional Add-ons:* ${serviceStrings.length > 0 ? serviceStrings.join(" + ") : "None"}

*Estimated Quotation:* ₹${totalCost.toLocaleString("en-IN")}

Please confirm availability and booking slots.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/919009966566?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-charcoal-earth">
      {/* 1. Header Navbar */}
      <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />

      {/* 2. Hero Header banner */}
      <section className="relative bg-charcoal-earth py-16 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-bhagwa/10 rounded-full blur-3xl"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-saffron/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-marigold text-charcoal-earth font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Custom Yatra Configurator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif mb-3 leading-tight">
            Dynamic Route Planner & Cost Estimator
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Algorithmic cost estimations based on room capacity, transit passenger sizing, and custom puja distributions.
          </p>
        </div>
      </section>

      {/* 3. Steps and Dynamic Calculator Layout */}
      <main className="flex-1 bg-sacred-cream/25 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8/12 width) - Stepper Forms */}
            <div className="lg:col-span-8 bg-white border border-orange-100/70 rounded-3xl p-6 sm:p-8 shadow-md">
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-bhagwa uppercase tracking-widest">
                    Step {step} of 5
                  </span>
                  <h2 className="text-xl font-bold text-charcoal-earth font-serif">
                    {step === 1 && "Basic Information"}
                    {step === 2 && "Choose Destinations"}
                    {step === 3 && "Choose Transit & Cabs"}
                    {step === 4 && "Select Stay & Rooms"}
                    {step === 5 && "Special Devotional Services"}
                  </h2>
                </div>
                {/* Visual Steps Indicator */}
                <div className="flex space-x-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-2 rounded-full transition-all duration-300 ${
                        i <= step ? "bg-bhagwa" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Passenger Count */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-charcoal-earth uppercase tracking-wider">
                      Number of Pilgrims / Travelers:
                    </label>
                    <div className="flex items-center space-x-3 w-full sm:w-1/2">
                      <button
                        onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                        className="w-10 h-10 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 flex items-center justify-center focus:outline-none"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={passengers}
                        onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-center text-sm font-semibold focus:outline-none focus:border-bhagwa"
                      />
                      <button
                        onClick={() => setPassengers((p) => Math.min(100, p + 1))}
                        className="w-10 h-10 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 flex items-center justify-center focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Selection Mode Selector Toggle */}
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <label className="block text-xs font-bold text-charcoal-earth uppercase tracking-wider">
                      Choose Destination Selection Mode:
                    </label>
                    <div className="grid grid-cols-2 gap-4 w-full sm:w-2/3">
                      <div
                        onClick={() => {
                          setSelectionMode("state");
                          setSelectedDestinations([]);
                        }}
                        className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                          selectionMode === "state"
                            ? "bg-orange-50/50 border-bhagwa text-bhagwa font-bold shadow-sm"
                            : "bg-white border-gray-200 hover:border-orange-200 text-gray-500"
                        }`}
                      >
                        🗺️ Select by State First
                      </div>
                      <div
                        onClick={() => {
                          setSelectionMode("temple");
                          setSelectedDestinations([]);
                          setSelectedStates([]);
                        }}
                        className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                          selectionMode === "temple"
                            ? "bg-orange-50/50 border-bhagwa text-bhagwa font-bold shadow-sm"
                            : "bg-white border-gray-200 hover:border-orange-200 text-gray-500"
                        }`}
                      >
                        🕉️ Select Temples Directly
                      </div>
                    </div>
                  </div>

                  {/* State Selection (only visible in State first selectionMode) */}
                  {selectionMode === "state" && (
                    <div className="space-y-3 pt-4 border-t border-gray-50">
                      <label className="block text-xs font-bold text-charcoal-earth uppercase tracking-wider">
                        Select one or more States (Multiselect):
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {statesList.map((state) => {
                          const isSelected = selectedStates.includes(state);
                          return (
                            <div
                              key={state}
                              onClick={() => handleToggleState(state)}
                              className={`p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer text-xs font-bold ${
                                isSelected
                                  ? "bg-orange-50/50 border-bhagwa text-bhagwa shadow-sm scale-[1.02]"
                                  : "bg-white border-gray-200 hover:border-orange-200 text-gray-600"
                              }`}
                            >
                              📍 {state}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Choose Destinations */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      {selectionMode === "state"
                        ? `Places filtered by chosen states (${selectedStates.join(", ")}):`
                        : "Select destinations directly (States are auto-calculated):"}
                    </p>
                    {selectionMode === "state" && selectedStates.length === 0 && (
                      <span className="text-xs text-red-500 font-bold">Please select states in Step 1 first!</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDestinations.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest.id);
                      return (
                        <div
                          key={dest.id}
                          onClick={() => handleToggleDestination(dest.id)}
                          className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-orange-50/50 border-bhagwa shadow-sm"
                              : "bg-white border-gray-200 hover:border-orange-200"
                          }`}
                        >
                          <div>
                            <h4 className="font-bold text-sm text-charcoal-earth">
                              {dest.name}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                              📍 State: {dest.state}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold ${
                              isSelected
                                ? "bg-bhagwa border-bhagwa text-white"
                                : "border-gray-300 text-transparent"
                            }`}
                          >
                            ✓
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Choose Transit & Cabs */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
                    Cabs auto-sizing for {passengers} passenger{passengers > 1 ? "s" : ""}:
                  </p>
                  <div className="space-y-4">
                    {plannerOptions.transports.map((trans) => {
                      const isSelected = selectedTransport === trans.id;
                      const qtyNeeded = Math.ceil(passengers / trans.capacity);
                      return (
                        <div
                          key={trans.id}
                          onClick={() => setSelectedTransport(trans.id)}
                          className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                            isSelected
                              ? "bg-orange-50/50 border-bhagwa shadow-sm"
                              : "bg-white border-gray-200 hover:border-orange-200"
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-charcoal-earth flex items-center space-x-2">
                              <span>{trans.name}</span>
                              <span className="text-[10px] bg-charcoal-earth/5 text-gray-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                                Capacity: Up to {trans.capacity} Pax
                              </span>
                            </h4>
                            <p className="text-xs text-gray-500">{trans.details}</p>
                          </div>
                          <div className="text-right flex items-center justify-between sm:justify-end space-x-6 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                            <div>
                              <span className="text-sm font-bold text-bhagwa font-serif block">
                                ₹{trans.pricePerDay}/day
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold">
                                {qtyNeeded} vehicle{qtyNeeded > 1 ? "s" : ""} needed
                              </span>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                                isSelected
                                  ? "bg-bhagwa border-bhagwa text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && "●"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Stays & Rooms */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Choose stay category:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {plannerOptions.stays.map((stay) => {
                        const isSelected = selectedStay === stay.id;
                        return (
                          <div
                            key={stay.id}
                            onClick={() => setSelectedStay(stay.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "bg-orange-50/50 border-bhagwa shadow-sm"
                                : "bg-white border-gray-200 hover:border-orange-200"
                            }`}
                          >
                            <div className="space-y-1 mb-3">
                              <h4 className="font-bold text-sm text-charcoal-earth">
                                {stay.name}
                              </h4>
                              <p className="text-xs text-gray-400 leading-tight">{stay.details}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <span className="text-xs font-bold text-bhagwa font-serif">
                                {stay.pricePerNight > 0 ? `₹${stay.pricePerNight}/night` : "Free"}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] ${
                                  isSelected
                                    ? "bg-bhagwa border-bhagwa text-white"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && "●"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedStay !== "stay-none" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                      {/* Nights Input */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-charcoal-earth uppercase">
                          Number of Nights:
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="15"
                          value={nights}
                          onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bhagwa font-semibold"
                        />
                      </div>
                      
                      {/* Rooms Input with validated range */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-bold text-charcoal-earth uppercase">
                            Number of Rooms:
                          </label>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                            Limit: {minRooms} to {maxRooms}
                          </span>
                        </div>
                        <input
                          type="number"
                          min={minRooms}
                          max={maxRooms}
                          value={rooms}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || minRooms;
                            setRooms(Math.max(minRooms, Math.min(maxRooms, val)));
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bhagwa font-semibold"
                        />
                        <p className="text-[10px] text-gray-400 leading-tight">
                          Validated range matches room configurations for {passengers} pilgrim(s).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Devotional Services */}
              {step === 5 && (
                <div className="space-y-6">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
                    Devotional services configured for your {passengers} pilgrim(s):
                  </p>

                  <div className="space-y-5">
                    
                    {/* 1. Contextual Puja: VIP Bhasma Aarti (Only if Ujjain selected) */}
                    {selectedDestinations.includes("dest-1") && (
                      <div className="p-4 sm:p-5 bg-white border border-orange-100 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-charcoal-earth">VIP Bhasma Aarti Pass assistance (Ujjain)</h4>
                          <p className="text-xs text-gray-400">Specify number of devotees attending Bhasma Aarti</p>
                          <span className="inline-block text-[10px] font-bold text-bhagwa bg-orange-50 px-2 py-0.5 rounded-full">
                            ₹500 / person
                          </span>
                        </div>
                        {/* Premium Inline Counter Buttons instead of slider */}
                        <div className="flex items-center space-x-3 bg-gray-50 border border-gray-150/70 p-2 rounded-xl self-end sm:self-center shrink-0">
                          <button
                            onClick={() => setBhasmaQuantity(Math.max(0, bhasmaQuantity - 1))}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-charcoal-earth w-8 text-center">{bhasmaQuantity}</span>
                          <button
                            onClick={() => setBhasmaQuantity(Math.min(passengers, bhasmaQuantity + 1))}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. Contextual Puja: Ganga Aarti (Only if Varanasi selected) */}
                    {selectedDestinations.includes("dest-7") && (
                      <div className="p-4 sm:p-5 bg-white border border-orange-100 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-charcoal-earth">Ganga Aarti VIP Pass & Private Boat (Varanasi)</h4>
                          <p className="text-xs text-gray-400">Specify number of devotees for Ganges boat aarti</p>
                          <span className="inline-block text-[10px] font-bold text-bhagwa bg-orange-50 px-2 py-0.5 rounded-full">
                            ₹600 / person
                          </span>
                        </div>
                        {/* Premium Inline Counter Buttons */}
                        <div className="flex items-center space-x-3 bg-gray-50 border border-gray-150/70 p-2 rounded-xl self-end sm:self-center shrink-0">
                          <button
                            onClick={() => setGangaAartiQuantity(Math.max(0, gangaAartiQuantity - 1))}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold text-charcoal-earth w-8 text-center">{gangaAartiQuantity}</span>
                          <button
                            onClick={() => setGangaAartiQuantity(Math.min(passengers, gangaAartiQuantity + 1))}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 3. Universal Temple VIP Darshan Passes (Configured per selected temple) */}
                    {selectedDestinations.map((dId) => {
                      const dest = plannerOptions.destinations.find((d) => d.id === dId);
                      if (!dest) return null;
                      const qty = vipDarshanQuantities[dId] || 0;
                      
                      return (
                        <div key={`vip-${dId}`} className="p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-charcoal-earth">VIP Fast-Track Pass: {dest.name.split("(")[0].trim()}</h4>
                            <p className="text-xs text-gray-400">Assisted fast-track queue pass for quick darshan</p>
                            <span className="inline-block text-[10px] font-bold text-bhagwa bg-orange-50 px-2 py-0.5 rounded-full">
                              ₹300 / person
                            </span>
                          </div>
                          {/* Premium Inline Counter Buttons */}
                          <div className="flex items-center space-x-3 bg-gray-50 border border-gray-150/70 p-2 rounded-xl self-end sm:self-center shrink-0">
                            <button
                              onClick={() => {
                                setVipDarshanQuantities((prev) => ({
                                  ...prev,
                                  [dId]: Math.max(0, qty - 1)
                                }));
                              }}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold text-charcoal-earth w-8 text-center">{qty}</span>
                            <button
                              onClick={() => {
                                setVipDarshanQuantities((prev) => ({
                                  ...prev,
                                  [dId]: Math.min(passengers, qty + 1)
                                }));
                              }}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {/* 4. Satvik Meals Package */}
                    <div className="p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-charcoal-earth">Satvik Pure Vegetarian Meals Package</h4>
                        <p className="text-xs text-gray-400">Breakfast, lunch, and dinner package (trip duration)</p>
                        <span className="inline-block text-[10px] font-bold text-bhagwa bg-orange-50 px-2 py-0.5 rounded-full">
                          ₹400 / person per day
                        </span>
                      </div>
                      {/* Premium Inline Counter Buttons */}
                      <div className="flex items-center space-x-3 bg-gray-50 border border-gray-150/70 p-2 rounded-xl self-end sm:self-center shrink-0">
                        <button
                          onClick={() => setMealsQuantity(Math.max(0, mealsQuantity - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold text-charcoal-earth w-8 text-center">{mealsQuantity}</span>
                        <button
                          onClick={() => setMealsQuantity(Math.min(passengers, mealsQuantity + 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 font-bold hover:bg-gray-100 flex items-center justify-center text-sm shadow-sm focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 5. Pandit Ji Conduction Conduits (Fixed Group Conduction Toggle) */}
                    <div className="p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-charcoal-earth">Vedic Pandit Ji Puja Conduction</h4>
                        <p className="text-xs text-gray-400">Assisted group sankalp puja Conducted by local Pandit Ji</p>
                        <span className="inline-block text-[10px] font-bold text-bhagwa bg-orange-50 px-2 py-0.5 rounded-full">
                          ₹1,500 / fixed group rate
                        </span>
                      </div>
                      <div className="flex items-center shrink-0">
                        <button
                          onClick={() => setHasPandit(!hasPandit)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                            hasPandit ? "bg-bhagwa" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                              hasPandit ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Stepper Buttons Control */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-8">
                <button
                  onClick={() => setStep((p) => Math.max(1, p - 1))}
                  disabled={step === 1}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 font-bold text-xs focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                {step < 5 ? (
                  <button
                    onClick={() => setStep((p) => Math.min(5, p + 1))}
                    className="px-6 py-2.5 rounded-lg gradient-bg text-white font-bold text-xs shadow-sm hover:shadow focus:outline-none"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="px-6 py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-xs shadow-md hover:shadow-lg focus:outline-none flex items-center space-x-1.5"
                  >
                    <span>Send Custom Request</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column (4/12 width) - Dynamic cost estimator card summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-orange-100/60 rounded-3xl p-6 shadow-md space-y-6 lg:sticky lg:top-24">
                <div>
                  <h3 className="text-lg font-bold font-serif text-charcoal-earth">Yatra Summary</h3>
                  <div className="w-12 h-0.5 bg-bhagwa mt-1"></div>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Transit Estimate */}
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-bold text-gray-700 block">Vehicle Rental</span>
                      <span className="text-gray-400">
                        {transport?.name} ({vehicleQuantity} Cab{vehicleQuantity > 1 ? "s" : ""})
                      </span>
                    </div>
                    <span className="font-bold font-serif text-charcoal-earth">
                      ₹{transportCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Stays Estimate */}
                  {selectedStay !== "stay-none" && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <div>
                        <span className="font-bold text-gray-700 block">Stay Lodging</span>
                        <span className="text-gray-400">
                          {plannerOptions.stays.find((s) => s.id === selectedStay)?.name} ({nights}N, {rooms}R)
                        </span>
                      </div>
                      <span className="font-bold font-serif text-charcoal-earth">
                        ₹{stayCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {/* Devotional Add-ons List */}
                  {servicesCost > 0 && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <div>
                        <span className="font-bold text-gray-700 block">Devotional Add-ons</span>
                        <div className="text-gray-400 space-y-1 mt-1 font-sans text-[11px]">
                          {bhasmaQuantity > 0 && <div>• VIP Bhasma Aarti ({bhasmaQuantity} pax)</div>}
                          {gangaAartiQuantity > 0 && <div>• Ganga Aarti private boat ({gangaAartiQuantity} pax)</div>}
                          
                          {selectedDestinations.map((dId) => {
                            const qty = vipDarshanQuantities[dId] || 0;
                            if (qty > 0) {
                              const tName = plannerOptions.destinations.find((d) => d.id === dId)?.name || "";
                              return <div key={`sum-vip-${dId}`}>• VIP Darshan Pass at {tName.split("(")[0].trim()} ({qty} pax)</div>;
                            }
                            return null;
                          })}

                          {mealsQuantity > 0 && <div>• Satvik Meals package ({mealsQuantity} pax)</div>}
                          {hasPandit && <div>• Vedic Pandit Ji Puja (Group)</div>}
                        </div>
                      </div>
                      <span className="font-bold font-serif text-charcoal-earth">
                        ₹{servicesCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {/* Total Quote Display */}
                  <div className="flex justify-between items-center bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 mt-4">
                    <div>
                      <span className="text-[10px] font-bold text-bhagwa uppercase tracking-wider block">Estimated Price</span>
                      <span className="text-2xl font-black text-bhagwa font-serif">
                        ₹{totalCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 text-right block max-w-[90px] leading-tight">
                      Price calculated for {passengers} pilgrim(s)
                    </span>
                  </div>
                </div>

                {/* Confirm Action */}
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all focus:outline-none"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.116.953 11.487.953c-5.447 0-9.875 4.379-9.879 9.808-.002 1.83.486 3.62 1.414 5.216l-.995 3.63 3.72-.92-.1-.053zm10.965-6.816c-.302-.15-.1.79-1.917-.075-.251-.125-.432-.19-.624-.047-.19.143-.73.903-.895 1.093-.165.19-.33.21-.63.06-.301-.15-1.27-.47-2.42-1.493-.895-.8-1.5-1.787-1.675-2.088-.175-.3-.018-.463.13-.612.134-.133.3-.347.45-.52.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.625-1.505-.856-2.072-.227-.546-.477-.473-.654-.482-.17-.008-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.75 1.16 2.93c.14.19 2 3.08 4.86 4.31.68.29 1.22.47 1.63.6.68.22 1.3.19 1.79.12.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                  <span>Book via WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Booking Modal Popup fallback */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        selectedPackage="Custom Route Planner Enquiry"
        onEnquirySubmit={(formData) => console.log("Custom Planner Booking Request:", formData)}
      />
    </div>
  );
}
