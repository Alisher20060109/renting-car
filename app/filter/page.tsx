"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, CarFront, Info } from "lucide-react";
import Image from "next/image";

interface FiltersProps {
  preSelectedId: string | null;
  allCars: any[];
}

const Filters: React.FC<FiltersProps> = ({ preSelectedId, allCars }) => {
  const [selectedCar, setSelectedCar] = useState<any>(null);

  // HeroSlider'dan ID kelsa, o'sha mashinani topish
  useEffect(() => {
    if (preSelectedId) {
      const car = allCars.find((c) => c.id === preSelectedId);
      setSelectedCar(car);
    }
  }, [preSelectedId, allCars]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-white text-4xl font-bold mb-2">MUKAMMAL AVTOMOBILNI TOPING</h2>
        <div className="h-1 w-20 bg-[#f5c518] mx-auto"></div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-[#1a1a1a] p-2 rounded-[30px] shadow-2xl border border-white/5 flex flex-wrap lg:flex-nowrap items-center gap-2 mb-16">
        <div className="flex-1 min-w-50 p-4 flex items-center gap-3 border-r border-white/10">
          <CarFront className="text-[#f5c518]" />
          <div className="w-full">
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Mashina Turi</p>
            <select 
              className="bg-transparent text-white w-full outline-none text-sm"
              value={selectedCar?.id || ""}
              onChange={(e) => setSelectedCar(allCars.find(c => c.id === e.target.value))}
            >
              <option value="" className="bg-black">Barchasi</option>
              {allCars.map(c => <option key={c.id} value={c.id} className="bg-black">{c.model}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 min-w-50 p-4 flex items-center gap-3 border-r border-white/10">
          <MapPin className="text-[#f5c518]" />
          <div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Olib ketish joyi</p>
            <p className="text-white text-sm font-medium">Toshkent shahri</p>
          </div>
        </div>

        <div className="flex-1 min-w-50 p-4 flex items-center gap-3 border-r border-white/10">
          <Calendar className="text-[#f5c518]" />
          <div>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sana</p>
            <p className="text-white text-sm font-medium">Bugun - 14:00</p>
          </div>
        </div>

        <button className="bg-[#f5c518] text-black h-17.5 px-10 rounded-[25px] font-black flex items-center gap-2 hover:bg-white transition-colors">
          <Search size={20} />
          QIDIRISH
        </button>
      </div>

      {/* SELECTED CAR DISPLAY (Yoyib qo'yish qismi) */}
      {selectedCar ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Rasm qismi */}
          <div className="relative h-100 rounded-[40px] overflow-hidden group">
            <Image 
              src={selectedCar.images[0]} 
              alt={selectedCar.model} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-[#f5c518] px-4 py-1 rounded-full text-xs font-black">
              TOP TANLOV
            </div>
          </div>

          {/* Ma'lumotlar qismi */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[#f5c518] text-sm font-bold tracking-[0.2em] mb-2 uppercase">Tanlangan Avtomobil</h3>
            <h2 className="text-white text-5xl font-black mb-6 italic tracking-tight">{selectedCar.model}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Kunlik Narx</p>
                <p className="text-white text-2xl font-black">{selectedCar.price_per_day.toLocaleString()} <span className="text-sm font-normal opacity-60">so'm</span></p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Dvigatel</p>
                <p className="text-white text-2xl font-black">{selectedCar.horsepower} <span className="text-sm font-normal opacity-60">HP</span></p>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-xs text-white border border-white/10 italic">
                    <Info size={14} className="text-[#f5c518]" /> 
                    {selectedCar.transmission}
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-xs text-white border border-white/10 italic">
                    <Info size={14} className="text-[#f5c518]" /> 
                    {selectedCar.fuel_type}
                </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-8">{selectedCar.description}</p>

            <button className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-[#f5c518] transition-all transform active:scale-95 shadow-xl">
              HOZIROQ BRON QILISH
            </button>
          </div>
        </div>
      ) : (
        <div className="h-75 border-2 border-dashed border-white/10 rounded-[40px] flex items-center justify-center">
            <p className="text-gray-500 font-medium">Batafsil ma'lumot uchun mashinani tanlang</p>
        </div>
      )}
    </div>
  );
};

export default Filters; 