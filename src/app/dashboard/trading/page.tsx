"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

interface Signal {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  price: number;
  confidence: number;
  timestamp: string;
  detail_line: { time: string; price: number }[];
}

export default function TradingDashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch("/api/trading/signals");
        const data = await res.json();

        if (data.signals && data.signals.length > 0) {
          setSignals(data.signals);
          // Only set the initial selected signal if none is selected yet
          setSelectedSignal(prev => prev || data.signals[0]);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error("Failed to fetch trading signals:", error);
      }
    };

    fetchSignals(); // Initial fetch

    // Poll every 10 seconds
    const interval = setInterval(() => {
      fetchSignals();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Ensure selected signal stays updated when signals change
  useEffect(() => {
     if (selectedSignal && signals.length > 0) {
        const updatedSelected = signals.find(s => s.id === selectedSignal.id);
        if (updatedSelected && updatedSelected.timestamp !== selectedSignal.timestamp) {
           setSelectedSignal(updatedSelected);
        }
     }
  }, [signals, selectedSignal]);

  if (!selectedSignal || !lastUpdate) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading Trading Data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">Algorithmic Trading Dashboard</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
             <Activity className="h-4 w-4 text-[#00E5FF] animate-pulse" />
             Live Signals Polling Active
          </p>
        </div>
        <div className="text-xs text-muted-foreground bg-black/40 px-3 py-1.5 rounded-lg border border-[var(--card-border)] flex items-center gap-2">
           <Clock className="h-3 w-3" /> Last Update: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signals List */}
        <div className="glass-strong rounded-2xl p-4 lg:col-span-1 space-y-4">
           <h2 className="font-medium px-2">Recent Signals</h2>
           <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
             {signals.map(signal => (
               <button
                 key={signal.id}
                 onClick={() => setSelectedSignal(signal)}
                 className={`w-full text-left p-3 rounded-xl border transition-all ${selectedSignal.id === signal.id ? 'border-[#00E5FF] bg-[#00E5FF]/10' : 'border-[var(--card-border)] hover:border-[#00E5FF]/50 bg-black/20'}`}
               >
                 <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm">{signal.pair}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${signal.type === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {signal.type}
                    </span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-lg font-mono">${signal.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3 text-accent" />
                      {(signal.confidence * 100).toFixed(0)}% Conf.
                    </span>
                 </div>
               </button>
             ))}
           </div>
        </div>

        {/* Chart Area */}
        <div className="glass-strong rounded-2xl p-6 lg:col-span-2 flex flex-col">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <h2 className="text-2xl font-bold">{selectedSignal.pair}</h2>
                 <p className="text-muted-foreground text-sm">Market Overview</p>
              </div>
              <div className="text-right">
                 <div className="text-2xl font-mono">${selectedSignal.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})}</div>
                 <div className={`text-sm font-medium flex items-center justify-end gap-1 ${selectedSignal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedSignal.type === 'BUY' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    Signal: {selectedSignal.type} ({(selectedSignal.confidence * 100).toFixed(0)}%)
                 </div>
              </div>
           </div>

           <div className="flex-1 min-h-[300px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={selectedSignal.detail_line} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis
                   domain={['auto', 'auto']}
                   stroke="#666"
                   fontSize={12}
                   tickLine={false}
                   axisLine={false}
                   tickFormatter={(value) => `$${value.toLocaleString()}`}
                 />
                 <Tooltip
                   contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#00E5FF', borderRadius: '8px' }}
                   itemStyle={{ color: '#00E5FF' }}
                   labelStyle={{ color: '#aaa' }}
                 />
                 <Line
                   type="monotone"
                   dataKey="price"
                   stroke="#00E5FF"
                   strokeWidth={2}
                   dot={false}
                   activeDot={{ r: 6, fill: "#00E5FF", stroke: "#000", strokeWidth: 2 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
