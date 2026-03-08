"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, User, ShoppingCart, Search, Flame, ChevronRight } from 'lucide-react';

export default function RMSCustomerPortal() {
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [location, setLocation] = useState('');
  const [orderType, setOrderType] = useState('Delivery');

  // Categories from your video
  const categories = ["INFUSED FISH", "APPETISERS", "BURGERS", "INFUSED FRIED CHICKEN"];
  
  // Dummy Products based on your screenshots
  const products = [
    { id: 1, name: "Fusion X (Infused Thigh)", price: 751, originalPrice: 863, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 2, name: "Fire BOM (6 Infused Burger)", price: 900, originalPrice: 1034, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 3, name: "Infused Fried Chicken", price: 851, originalPrice: 978, img: "https://images.unsplash.com/photo-1562967914-608f82629710" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. SELECTION MODAL */}
      <AnimatePresence>
        {!isLocationSelected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }}
              className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border-t-[10px] border-[#C41E3A]"
            >
              <div className="p-8 text-center">
                <div className="bg-[#C41E3A] w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">RMS</span>
                </div>
                <h2 className="text-xl font-bold mb-6">Select Your Order Type</h2>
                
                <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
                  {['Delivery', 'Pick-Up', 'Car hop'].map(type => (
                    <button key={type} onClick={() => setOrderType(type)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${orderType === type ? 'bg-[#C41E3A] text-white' : 'text-gray-500'}`}>
                      {type}
                    </button>
                  ))}
                </div>

                <select value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 mb-4 outline-none focus:border-[#C41E3A]">
                  <option value="">Please select your location</option>
                  <option value="Bahadurabad">Bahadurabad</option>
                  <option value="Bath Island">Bath Island</option>
                  <option value="D.H.A Phase 6">D.H.A Phase 6</option>
                </select>

                <button onClick={() => location && setIsLocationSelected(true)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${location ? 'bg-[#C41E3A] text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  Select
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. RED HEADER */}
      <header className="bg-[#C41E3A] text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full"><MapPin size={20} /></div>
            <span className="text-sm font-medium">{location || "Select Location"}</span>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 p-2 rounded-full"><Phone size={20} /></div>
            <div className="bg-white/20 p-2 rounded-full"><User size={20} /></div>
            <div className="bg-white/20 p-2 rounded-full relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-white text-[#C41E3A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO SLIDER AREA */}
      <section className="p-4 max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-[32px] h-48 md:h-64 flex items-center p-8 text-white relative overflow-hidden shadow-xl">
           <div className="z-10">
              <h3 className="text-red-500 font-bold tracking-widest text-xs mb-2 italic">JUST DROPPED</h3>
              <h2 className="text-3xl font-black italic leading-tight">HUNGRY?<br/>LET'S DOUBLE UP.</h2>
           </div>
           <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd" className="absolute right-0 top-0 h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </section>

      {/* 4. CATEGORY SCROLL */}
      <div className="sticky top-[72px] bg-white z-30 border-b border-gray-100">
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-4 max-w-7xl mx-auto">
          {categories.map(cat => (
            <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-full bg-gray-100 text-gray-800 text-xs font-black hover:bg-[#C41E3A] hover:text-white transition-all border-b-2 border-transparent active:border-red-600">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. PRODUCT LIST */}
      <section className="p-4 max-w-7xl mx-auto pb-24">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="text-orange-500" fill="currentColor" />
          <h2 className="text-xl font-black italic">Popular Items</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="h-56 overflow-hidden relative">
                <img src={product.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg cursor-pointer"><Search size={18} className="text-gray-600" /></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice}</span>
                    <span className="text-lg font-black text-[#C41E3A]">Rs. {product.price}</span>
                  </div>
                  <button className="bg-[#C41E3A] text-white p-3 rounded-2xl shadow-lg hover:shadow-red-200 transition-all active:scale-95">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}