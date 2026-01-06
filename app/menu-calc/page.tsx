"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function MenuPriceCalculator() {
  const [dish, setDish] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [prepCost, setPrepCost] = useState("");
  const [margin, setMargin] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleAddIngredient = () =>
    setIngredients([...ingredients, { name: "", qty: "" }]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/menu-calc/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dish, ingredients, prepCost, margin }),
    });
    if (!res.ok) return;
    setResult(await res.json());
  };

  return (
    /* Card Container: Centered, constrained width, and premium dark background */
    <div className="w-full max-w-xl bg-bg-card border border-border-dark rounded-[32px] p-8 md:p-10 shadow-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Menu Price Calculator
        </h1>
        <p className="text-gray-500 text-sm">
          Calculate the ideal selling price based on ingredient costs and margins.
        </p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-5">
        {/* Dish Name Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
            Dish Name
          </label>
          <input
            className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cta-orange/50 transition-all"
            placeholder="e.g. Signature Pasta"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            required
          />
        </div>

        {/* Dynamic Ingredients Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
            Ingredients & Quantities
          </label>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-3">
              <input
                className="flex-[2] bg-black/40 border border-border-dark rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-cta-orange/50 transition-all outline-none"
                placeholder="Ingredient"
                value={ing.name}
                onChange={(e) => {
                  const copy = [...ingredients];
                  copy[idx].name = e.target.value;
                  setIngredients(copy);
                }}
                required
              />
              <input
                className="flex-1 bg-black/40 border border-border-dark rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-cta-orange/50 transition-all outline-none"
                type="number"
                placeholder="Qty"
                value={ing.qty}
                onChange={(e) => {
                  const copy = [...ingredients];
                  copy[idx].qty = e.target.value;
                  setIngredients(copy);
                }}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-[11px] font-bold text-cta-orange hover:text-white transition-colors flex items-center gap-1 ml-1"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Financial Details Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Prep Cost
            </label>
            <input
              className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-cta-orange/50 transition-all outline-none"
              type="number"
              placeholder="0.00"
              value={prepCost}
              onChange={(e) => setPrepCost(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">
              Margin (%)
            </label>
            <input
              className="w-full bg-black/40 border border-border-dark rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-cta-orange/50 transition-all outline-none"
              type="number"
              placeholder="30"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full bg-cta-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cta-orange/20 transform active:scale-[0.98] transition-all mt-4">
          Calculate Price
        </button>
      </form>

      {/* Results Display */}
      {result && (
        <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-border-dark space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Total Production Cost</span>
            <span className="text-white font-medium">Rs. {result.total_cost}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-border-dark pt-3">
            <span className="text-gray-500">Expected Profit</span>
            <span className="text-green-400 font-medium">Rs. {result.profit}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border-dark">
            <span className="text-sm font-bold text-white">Final Selling Price</span>
            <span className="text-2xl font-black text-cta-orange">Rs. {result.selling_price}</span>
          </div>
        </div>
      )}
    </div>
  );
}