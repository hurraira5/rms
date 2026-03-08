"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Landmark, CheckCircle2, MessageCircle } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('COD'); // COD or Bank
  const [isProcessing, setIsProcessing] = useState(false);

  // Totals from your screenshot
  const summary = {
    total: 804,
    delivery: 150,
    discount: 105,
    grandTotal: 849
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      window.location.href = "/receipt"; // Redirect to receipt page
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Checkout</h1>

      {/* Payment Information */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setPaymentMethod('COD')}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'COD' ? 'border-red-600 bg-red-50' : 'border-gray-100'}`}
          >
            <Wallet className={paymentMethod === 'COD' ? 'text-red-600' : 'text-gray-400'} />
            <span className="text-xs font-bold">Cash on Delivery</span>
          </button>
          
          <button 
            onClick={() => setPaymentMethod('Bank')}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'Bank' ? 'border-red-600 bg-red-50' : 'border-gray-100'}`}
          >
            <Landmark className={paymentMethod === 'Bank' ? 'text-red-600' : 'text-gray-400'} />
            <span className="text-xs font-bold">Bank Transfer</span>
          </button>
        </div>

        {/* Conditional Instructions for Bank Transfer */}
        {paymentMethod === 'Bank' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-sm">
            <h3 className="font-bold mb-2">Deposit Instructions</h3>
            <p>Please deposit <b>Rs. {summary.grandTotal}</b> to:</p>
            <p className="mt-2">Bank: <b>Jazz Cash</b></p>
            <p>Account: <b>03219229122</b></p>
            <p>Name: <b>Adil Feroz</b></p>
            <p className="mt-4 text-xs text-blue-800 font-medium">
              Share screenshot of payment to our WhatsApp (0334-9229122)
            </p>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex justify-between text-sm"><span>Total</span><span>Rs. {summary.total}</span></div>
        <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>Rs. {summary.delivery}</span></div>
        <div className="flex justify-between text-sm text-green-600 font-bold"><span>Discount</span><span>- Rs. {summary.discount}</span></div>
        <hr className="border-dashed" />
        <div className="flex justify-between text-lg font-black text-red-600">
          <span>Grand Total</span><span>Rs. {summary.grandTotal}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button 
        onClick={handlePlaceOrder}
        disabled={isProcessing}
        className="w-full mt-8 bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
      >
        {isProcessing ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            Processing...
          </>
        ) : (
          <>Place Order</>
        )}
      </button>
    </div>
  );
}