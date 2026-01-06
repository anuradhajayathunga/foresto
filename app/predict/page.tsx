"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function IngredientPredictionForm() {
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API}/predict/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient, quantity, date }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPrediction(data.predicted_price);
    setLoading(false);
  };

  return (
    /* Card Container: Centered, Premium Dark Theme */
    <div className="w-full max-w-xl bg-bg-card border border-border-dark rounded-[32px] p-8 md:p-10 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Price Prediction
        </h1>
        <p className="text-gray-500 text-sm">
          Forecast future ingredient prices using AI models.
        </p>
      </div>

      <form onSubmit={handlePredict} className="space-y-5">
        
        {/* Ingredient Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
            Ingredient
          </label>
          <input
            className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cta-orange/50 transition-all"
            placeholder="e.g. Basmati Rice"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            required
          />
        </div>

        {/* Quantity & Date Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Quantity
            </label>
            <input
              className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cta-orange/50 transition-all"
              type="number"
              placeholder="Kg / Units"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Forecast Month
            </label>
            <input
              className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cta-orange/50 transition-all [color-scheme:dark]"
              type="month"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full bg-cta-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cta-orange/20 transform active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Predict Price"}
        </button>
      </form>

      {/* Result Display Card */}
      {prediction !== null && (
        <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-border-dark flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Estimated Market Price
          </span>
          <div className="text-4xl font-black text-white flex items-baseline gap-1">
            <span className="text-lg text-cta-orange font-bold">Rs.</span>
            {prediction.toLocaleString()}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Based on historical trends and seasonal data.
          </p>
        </div>
      )}
    </div>
  );
}