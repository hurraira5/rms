"use client";
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Plus, Search } from 'lucide-react';

interface Props {
  restaurantName: string;
  branches: any[];
}

export default function CustomerUI({ restaurantName, branches }: Props) {
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. Branch Selection Modal */}
      {!selectedBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-[40px] w-full max-w-md p-10 text-center shadow-2xl border-t-[12px] border-[#C41E3A]">
            <h2 className="text-2xl font-black italic mb-6 uppercase text-gray-800">{restaurantName}</h2>
            <select 
              onChange={(e) => setSelectedBranch(e.target.value)} 
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 mb-6 outline-none font-bold"
            >
              <option value="">Please select your branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
              <option value="Default Branch">Default Branch</option>
            </select>
          </div>
        </div>
      )}

      {/* 2. Header */}
      <header className="bg-[#C41E3A] text-white p-4 sticky top-0 z-40 flex justify-between items-center px-6 shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span className="text-[10px] font-black uppercase tracking-tighter">{selectedBranch || "Loading..."}</span>
        </div>
        <button className="bg-white/20 p-3 rounded-full relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-white text-[#C41E3A] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">0</span>
        </button>
      </header>

      {/* 3. Hero Section */}
      <section className="p-4 max-w-5xl mx-auto">
        <div className="bg-black rounded-[40px] h-56 flex flex-col justify-center p-10 text-white relative overflow-hidden shadow-2xl">
           <h2 className="text-4xl font-black italic leading-none uppercase">{restaurantName}<br/>Official Portal</h2>
           <img src="https://images.unsplash.com/photo-1550547660-d9450f859349" className="absolute right-[-10%] top-0 h-full opacity-40 rotate-6" />
        </div>
      </section>

      {/* 4. Menu Grid */}
      <section className="p-6 max-w-5xl mx-auto pb-32">
        <h2 className="text-2xl font-black italic uppercase text-gray-800 tracking-tighter mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex justify-between items-center">
                 <div>
                    <h4 className="font-black text-xl text-gray-800 italic uppercase mb-1">Fusion X Burger</h4>
                    <span className="text-2xl font-black text-[#C41E3A] italic">Rs. 851</span>
                 </div>
                 <button className="bg-[#C41E3A] text-white p-4 rounded-3xl shadow-lg active:scale-90 transition-all">
                    <Plus size={24} />
                 </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}