"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function PredictionResultPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/prediction-result/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (res.ok) {
          setData(await res.json());
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 1. Premium Loading State (Skeleton Pulse)
  if (loading) return (
    <div className="w-full max-w-xl mx-auto mt-10 p-10 rounded-[32px] border border-border-dark bg-bg-card space-y-6 animate-pulse">
       <div className="h-8 bg-white/5 rounded w-1/3"></div>
       <div className="h-24 bg-white/5 rounded-xl w-full"></div>
       <div className="h-40 bg-white/5 rounded-xl w-full"></div>
    </div>
  );

  // 2. Empty State
  if (!data) return (
    <div className="w-full max-w-xl mx-auto mt-10 text-center p-10 border border-border-dark rounded-[32px] bg-bg-card">
       <h2 className="text-xl font-bold text-white">No Results Found</h2>
       <p className="text-gray-500 mt-2 text-sm">Run a prediction first to see analysis here.</p>
       <a href="/predict" className="mt-4 inline-block text-cta-orange hover:text-white font-bold text-sm transition-colors">Go to Predict →</a>
    </div>
  );

  return (
    /* Main Dashboard Card */
    <div className="w-full max-w-xl bg-bg-card border border-border-dark rounded-[32px] p-8 md:p-10 shadow-2xl">
      
      {/* Header with Divider */}
      <div className="mb-8 border-b border-border-dark pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Prediction Results</h1>
        <p className="text-gray-500 text-sm">AI-driven market analysis and supplier scoring.</p>
      </div>

      {/* Hero Section: Price & Confidence */}
      <div className="flex justify-between items-end mb-10">
        <div>
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Forecasted Price</p>
           <div className="text-5xl font-black text-white tracking-tighter">
             <span className="text-cta-orange text-2xl font-bold align-top mr-1">Rs.</span>
             {data.predicted_price?.toLocaleString()}
           </div>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Model Confidence</p>
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${data.confidence > 80 ? 'text-green-500 bg-green-500' : 'text-yellow-500 bg-yellow-500'}`}></span>
              <span className="text-sm font-bold text-white">{data.confidence}%</span>
           </div>
        </div>
      </div>

      {/* Supplier Recommendations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Supplier Insights</h2>
            <span className="text-[10px] uppercase font-bold text-gray-600 bg-white/5 px-2 py-1 rounded">
                {data.suppliers?.length || 0} Sources
            </span>
        </div>
        
        <div className="space-y-3">
          {data.suppliers?.map((s: any, idx: number) => {
             // Logic to style badges dynamically
             const isBest = s.label === "Best Choice";
             const isWarn = s.label === "Avoid"; // Adjust string if your API returns something else
             
             // Dynamic Colors
             const badgeStyle = isBest 
                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                : isWarn 
                ? "bg-red-500/10 text-red-400 border-red-500/20" 
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            
             const cardBorder = isBest ? "border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : "border-border-dark";

             return (
                <div key={idx} className={`p-5 rounded-2xl bg-black/40 border ${cardBorder} transition-all hover:bg-black/60 group`}>
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-white text-lg">{s.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide border ${badgeStyle}`}>
                        {s.label}
                      </span>
                   </div>
                   
                   {/* Metrics Grid */}
                   <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Reliability</p>
                        <p className="text-gray-300 font-medium text-sm">{s.reliability}</p>
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Fairness</p>
                         <p className="text-gray-300 font-medium text-sm">{s.fairness}</p>
                      </div>
                   </div>
                </div>
             )
          })}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border-dark text-center">
         <p className="text-xs text-gray-600">
            *Recommendations are based on historical price/performance data.
         </p>
      </div>
    </div>
  );
}