"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function SupplierDataPage() {
  const [supplier, setSupplier] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch(`${API}/supplier-data/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ supplier, ingredient, price, date }),
    });

    if (res.ok) {
      setMessage("✅ Supplier data added successfully!");
      setSupplier("");
      setIngredient("");
      setPrice("");
      setDate("");
    } else {
      const errorText = await res.text();
      setMessage("❌ Failed to add data: " + errorText);
    }

    setLoading(false);
  };

  return (
    /* This container ensures the card sits in the middle of the screen */
    <div className="w-full max-w-xl bg-[#161616] border border-[#262626] rounded-[32px] p-10 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Supplier Price Data
        </h1>
        <p className="text-gray-500 text-sm">
          Add supplier pricing information to improve predictions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Supplier Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
            Supplier Name
          </label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Search or enter supplier..."
            className="w-full bg-black/40 border border-[#262626] rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
            required
          />
        </div>

        {/* Ingredient Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
            Ingredient Name
          </label>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="What are you buying?"
            className="w-full bg-black/40 border border-[#262626] rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
            required
          />
        </div>

        {/* Row for Price and Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Offered Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/40 border border-[#262626] rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-black/40 border border-[#262626] rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6A00]/50 transition-all [color-scheme:dark]"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF6A00] hover:bg-[#FF8533] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FF6A00]/20 transform active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Supplier Price Data"}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-6 p-4 rounded-xl text-sm text-center font-medium border ${
            message.startsWith("✅")
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}