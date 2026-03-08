"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Printer, PhoneCall } from 'lucide-react';

export default function ReceiptPage() {
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen pb-10">
      {/* Success Message */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-green-500 rounded-3xl p-6 text-center text-white mb-6 shadow-lg"
      >
        <CheckCircle className="mx-auto mb-2" size={48} />
        <h1 className="text-2xl font-bold">Thank You!</h1>
        <p className="text-sm opacity-90">Your order has been placed successfully</p>
      </motion.div>

      {/* Order Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Order No</p>
            <p className="font-black text-lg">y4jWtx</p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-yellow-700 uppercase">Received</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 flex gap-2 items-start">
           <span className="text-orange-500">⚠️</span>
           <p className="text-[10px] text-orange-800 leading-tight">
             Your order has been received, we might call you for confirmation or address details if required.
           </p>
        </div>
      </div>

      {/* Customer & Delivery Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-4 space-y-4">
        <h2 className="font-bold flex items-center gap-2"><span className="bg-red-100 p-1 rounded text-red-600">👤</span> Customer Information</h2>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div><p className="text-gray-400">Name</p><p className="font-bold">Hurraira</p></div>
          <div><p className="text-gray-400">Mobile</p><p className="font-bold">0313-3553345</p></div>
        </div>
        
        <hr className="border-gray-50" />
        
        <h2 className="font-bold flex items-center gap-2"><span className="bg-red-100 p-1 rounded text-red-600">📍</span> Delivery Information</h2>
        <div className="space-y-3 text-xs">
          <div><p className="text-gray-400">Address</p><p className="font-bold">Hhjhbn ik, Bath Island</p></div>
          <div className="grid grid-cols-2 gap-4">
             <div><p className="text-gray-400">Order Type</p><p className="font-bold uppercase">delivery</p></div>
             <div><p className="text-gray-400">Order Date</p><p className="font-bold">Mar 8, 2026</p></div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
         <h2 className="font-bold flex items-center gap-2 mb-4"><span className="bg-red-100 p-1 rounded text-red-600">💳</span> Payment Type <span className="ml-auto bg-red-600 text-white px-2 py-0.5 rounded text-[10px]">Cash</span></h2>
         <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total</span><span>Rs. 804</span></div>
            <div className="flex justify-between text-green-600"><span>Discount</span><span>Rs. 105</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>Rs. 150</span></div>
            <hr />
            <div className="flex justify-between font-black text-lg"><span>Grand Total</span><span>Rs. 849</span></div>
         </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          <Printer size={18} /> Print Receipt
        </button>
        <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-200">
          Place another order
        </button>
        <div className="text-center pt-4">
           <p className="text-xs text-gray-400">Need Support?</p>
           <a href="tel:03349229122" className="text-red-600 font-bold flex items-center justify-center gap-2 mt-1">
             <PhoneCall size={16} /> 0334-9229122
           </a>
        </div>
      </div>
    </div>
  );
}