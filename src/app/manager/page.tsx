"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Clock, MapPin, Phone, Package, Loader2 } from 'lucide-react';
import { acceptOrder, declineOrder } from "@/app/actions/order";

export default function ManagerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const prevOrdersCount = useRef(0);

  // Real-time polling logic
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        
        // Agar naya order aaya hai toh sound bajao
        if (data.length > prevOrdersCount.current) {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.play().catch(e => console.log("Audio play blocked by browser"));
        }
        
        prevOrdersCount.current = data.length;
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders");
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Har 5 sec baad check
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (id: string, action: 'accept' | 'decline') => {
    setProcessingId(id);
    if (action === 'accept') {
      await acceptOrder(id); //
    } else {
      await declineOrder(id); //
    }
    setProcessingId(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 bg-white p-8 rounded-[40px] shadow-sm border border-gray-50">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-gray-800 tracking-tighter">Manager Panel</h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Live Terminal Online</p>
          </div>
        </div>
        <div className="relative bg-red-600 p-4 rounded-3xl shadow-xl shadow-red-100">
          <Bell className="text-white" size={24} />
          {orders.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              {orders.length}
            </span>
          )}
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]"><Loader2 className="animate-spin text-red-600" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[45px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                {/* Yellow Bar for 'Received' Status */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-yellow-400"></div>

                <div className="flex justify-between items-start mb-6 pl-2">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</span>
                    <h3 className="text-2xl font-black italic text-[#C41E3A]">{order.orderNo}</h3>
                  </div>
                  <div className="bg-yellow-50 px-4 py-2 rounded-2xl text-[10px] font-black text-yellow-600 uppercase border border-yellow-100">
                    {order.status}
                  </div>
                </div>

                <div className="space-y-4 mb-8 pl-2">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl">
                    <MapPin size={18} className="text-[#C41E3A]" /> {order.address}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-600 bg-gray-50 p-3 rounded-2xl">
                    <Phone size={18} className="text-[#C41E3A]" /> {order.phone}
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase italic">
                    <Clock size={14} /> Received at {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="bg-gray-900 rounded-[30px] p-6 mb-8 text-white shadow-inner">
                   <div className="flex justify-between text-[10px] font-bold opacity-60 mb-1">
                      <span>{order.customerName}</span>
                      <span>{order.paymentMethod}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                      <span className="text-xl font-black text-yellow-400 italic">Rs. {order.grandTotal}</span>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    disabled={processingId === order.id}
                    onClick={() => handleAction(order.id, 'accept')}
                    className="flex-1 bg-green-500 text-white py-5 rounded-3xl font-black text-xs uppercase shadow-lg shadow-green-100 hover:bg-green-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {processingId === order.id ? <Loader2 className="animate-spin" size={16}/> : <Check size={18} />}
                    Accept
                  </button>
                  <button 
                    disabled={processingId === order.id}
                    onClick={() => handleAction(order.id, 'decline')}
                    className="flex-1 bg-gray-100 text-gray-400 py-5 rounded-3xl font-black text-xs uppercase hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <X size={18} />
                    Decline
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {orders.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-50">
            <Package size={80} className="text-gray-100 mx-auto mb-6" />
            <p className="font-black text-gray-300 uppercase tracking-[0.3em] italic">No active orders</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}