"use client";

import React, { useState } from "react";

interface EnquiryFormProps {
  initialPackage?: string;
  onEnquirySubmit: (formData: {
    name: string;
    phone: string;
    date: string;
    package: string;
    message: string;
  }) => void;
}

export default function EnquiryForm({ initialPackage = "", onEnquirySubmit }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Sync state if initialPackage changes in parent
  React.useEffect(() => {
    setSelectedPackage(initialPackage);
  }, [initialPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onEnquirySubmit({
      name,
      phone,
      date,
      package: selectedPackage,
      message,
    });

    setSuccess(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName("");
      setPhone("");
      setDate("");
      setSelectedPackage("");
      setMessage("");
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100/30">
      <h3 className="text-xl sm:text-2xl font-bold text-charcoal-earth font-serif mb-6">
        Send a Free Enquiry
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors text-charcoal-earth"
          />
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors text-charcoal-earth"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Travel Date (Optional)</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors text-charcoal-earth"
            />
          </div>
        </div>

        {/* Selected Tour Dropdown */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Which Yatra Package?</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors text-charcoal-earth"
          >
            <option value="">Select a package...</option>
            <option value="Ujjain Mahakal Darshan Express">Ujjain Mahakal Darshan Express</option>
            <option value="Do Dham Yatra (Ujjain & Omkareshwar)">Do Dham Yatra (Ujjain & Omkareshwar)</option>
            <option value="Jain Tirth & Devotional Circuit">Jain Tirth & Devotional Circuit</option>
            <option value="Custom Spiritual Tour">Other Custom Yatra</option>
          </select>
        </div>

        {/* Devotional requests textarea */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Devotional Requests / Questions</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="E.g., Bhasma Aarti booking, senior citizen assistance, Pandit Ji needed..."
            className="w-full bg-sacred-cream/40 border border-orange-100 focus:border-bhagwa focus:outline-none rounded-lg px-4 py-3 text-sm transition-colors text-charcoal-earth"
          />
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-lg p-4 text-center">
            🙏 Thank you! Your Enquiry has been submitted. Our spiritual coordinator will call you back shortly.
          </div>
        ) : (
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg gradient-bg text-white font-bold tracking-wide hover:opacity-95 shadow-md transition-all text-base focus:outline-none"
          >
            Submit Enquiry Form
          </button>
        )}
      </form>
    </div>
  );
}
