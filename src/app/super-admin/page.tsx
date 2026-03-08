"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaStore, FaUsers, FaMapMarkerAlt, FaUtensils, 
  FaPlus, FaTrash, FaChevronRight, FaTimes, FaChartLine, FaCog
} from 'react-icons/fa';
import { createBrand, createBranch, deleteBranch } from "@/app/actions/super-admin";

export default function SuperAdmin() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRest, setSelectedRest] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('brand');

  // Load Initial Data
  useEffect(() => {
    fetch('/api/restaurants').then(res => res.json()).then(data => setRestaurants(data));
  }, []);

  const handleBrandSelection = (id: string) => {
    const r = restaurants.find(res => res.id === id);
    setSelectedRest(r);
    // Fetch branches for this restaurant
    fetch(`/api/restaurants/${id}/branches`).then(res => res.json()).then(data => setBranches(data));
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-left overflow-hidden">
      
      {/* 1. Sidebar Control */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col shadow-2xl z-30">
        <div className="p-8">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-200">S</div>
             <h1 className="text-xl font-black text-gray-800 tracking-tighter uppercase">Smart Panel</h1>
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Root Administration</p>
        </div>

        <div className="px-6 space-y-4 overflow-y-auto flex-grow">
           <select 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none"
              onChange={(e) => handleBrandSelection(e.target.value)}
           >
              <option value="">-- Choose Brand --</option>
              {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
           </select>

           <div className="mt-8 space-y-2">
              {branches.map(b => (
                <button key={b.id} onClick={() => setSelectedBranch(b)} 
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${selectedBranch?.id === b.id ? 'bg-red-600 text-white shadow-xl' : 'bg-white text-gray-600 border border-gray-50'}`}>
                  <span className="font-black text-sm uppercase">{b.name}</span>
                  <FaChevronRight className="text-xs" />
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="flex-grow overflow-y-auto p-10 relative">
        <div className="absolute top-10 right-10 flex gap-4">
          <button onClick={() => { setModalType('brand'); setShowModal(true); }} className="bg-gray-800 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-gray-200">+ New Brand</button>
          <button onClick={() => { setModalType('branch'); setShowModal(true); }} className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-red-200">+ New Branch</button>
        </div>

        {selectedBranch ? (
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex items-end justify-between">
               <div>
                  <h1 className="text-5xl font-black text-gray-800 uppercase italic tracking-tighter">{selectedBranch.name}</h1>
                  <p className="text-red-600 font-bold uppercase text-xs mt-2 tracking-widest">{selectedRest?.name} Division</p>
               </div>
               <button onClick={() => deleteBranch(selectedBranch.id)} className="text-red-600 p-4 bg-red-50 rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                  <FaTrash />
               </button>
            </div>
            
            <div className="flex bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100 w-fit">
               {['dashboard', 'menu', 'taxes', 'manager'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} 
                   className={`px-10 py-4 rounded-[2rem] font-black text-[10px] uppercase transition-all ${activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400'}`}>
                   {tab}
                 </button>
               ))}
            </div>

            {/* Dynamic Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {activeTab === 'dashboard' && (
                 <>
                   <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-100">
                      <FaChartLine className="text-red-600 mb-4" size={24} />
                      <p className="text-[10px] font-black text-gray-400 uppercase">Current Tax Rate</p>
                      <h2 className="text-4xl font-black text-gray-800 mt-2">{selectedBranch.taxRate}%</h2>
                   </div>
                   <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-100">
                      <FaMapMarkerAlt className="text-red-600 mb-4" size={24} />
                      <p className="text-[10px] font-black text-gray-400 uppercase">Delivery Fee</p>
                      <h2 className="text-4xl font-black text-gray-800 mt-2">Rs. {selectedBranch.deliveryFee}</h2>
                   </div>
                 </>
               )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-10">
            <FaStore size={120} />
            <h2 className="text-3xl font-black uppercase mt-4 italic">Select Unit to Manage</h2>
          </div>
        )}
      </div>

      {/* Modal logic from example... */}
    </div>
  );
}