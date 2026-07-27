"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaptureForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Interested in our services?</h1>
        <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
          Staff Login
        </Link>
      </div>
      
      <p className="text-slate-600 mb-8">Leave your details below and our sales team will reach out to you shortly.</p>

      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          Thank you! We have received your information and will be in touch soon.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
