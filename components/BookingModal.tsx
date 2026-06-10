"use client";

import React, { useState, useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
  onEnquirySubmit: (formData: {
    name: string;
    phone: string;
    date: string;
    package: string;
    message: string;
  }) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedPackage,
  onEnquirySubmit,
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset success state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onEnquirySubmit({
      name,
      phone,
      date,
      package: selectedPackage || "Custom Devotional Tour",
      message,
    });

    setSuccess(true);
    
    // Close modal after brief success window
    setTimeout(() => {
      setName("");
      setPhone("");
      setDate("");
      setMessage("");
      setSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-orange-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="gradient-bg p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-serif">Plan Your Sacred Yatra</h3>
            <p className="text-xs text-orange-100 mt-1">Get free quotes & puja booking assistance</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl focus:outline-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Disabled package text field showing the target yatra */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Selected Yatra Package</label>
              <input
                type="text"
                disabled
                value={selectedPackage || "Custom Devotional Tour"}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 font-semibold cursor-not-allowed"
              />
            </div>

            {/* Client input details */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-2.5 text-sm text-charcoal-earth"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile"
                  className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-2.5 text-sm text-charcoal-earth"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-2.5 text-sm text-charcoal-earth"
                />
              </div>
            </div>

            {/* Special remarks */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Special Requests (Bhasma Aarti / Puja / Food)</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="E.g., Senior citizen wheelchair assistance, Pandit Ji for Abhishek, satvik meals..."
                className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-2 text-sm text-charcoal-earth"
              />
            </div>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg p-4 text-center">
                🙏 Submitting enquiry... Our spiritual coordinator will contact you shortly!
              </div>
            ) : (
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 rounded-lg border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-lg gradient-bg text-white font-bold tracking-wide hover:opacity-95 shadow-md transition-all text-sm"
                >
                  Enquire Now
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
