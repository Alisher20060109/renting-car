import React from 'react';
import { Calendar, MapPin, Car, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import HeroSlider from './HeroSlider';

const Home = () => {
  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-150 mt-2 overflow-hidden rounded-4xl">

        {/* HeroSlider — background + car image + controls */}
        <HeroSlider />

        {/* Content — ustida turadi */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-8">

            {/* Chap tomon — matn */}
            <div className="flex-1 max-w-xl">

              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Experience <br />
                <span className="text-yellow-400">the road</span> <br />
                like never before
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                Premium vehicles at your fingertips. Book in minutes, drive in style — wherever the road takes you.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2">
                  View all cars
                  <ArrowRight size={18} />
                </button>
                
              </div>
            </div>

            {/* O'ng tomon — Booking card */}
            <div className="hidden lg:block w-90 bg-white rounded-3xl shadow-2xl p-6">
              <h3 className="text-xl font-black text-gray-900 mb-5 text-center">Book your car</h3>

              <div className="space-y-3">
                {/* Car type */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Car size={18} className="text-[#6347F9]" />
                  <span className="flex-1 text-gray-400 text-sm font-medium">Car type</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Place of rental */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <MapPin size={18} className="text-[#6347F9]" />
                  <span className="flex-1 text-gray-400 text-sm font-medium">Place of rental</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Place of return */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <MapPin size={18} className="text-[#6347F9]" />
                  <span className="flex-1 text-gray-400 text-sm font-medium">Place of return</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Rental date */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Calendar size={18} className="text-[#6347F9]" />
                  <span className="flex-1 text-gray-400 text-sm font-medium">Rental date</span>
                  <Calendar size={16} className="text-gray-400" />
                </div>

                {/* Return date */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Calendar size={18} className="text-[#6347F9]" />
                  <span className="flex-1 text-gray-400 text-sm font-medium">Return date</span>
                  <Calendar size={16} className="text-gray-400" />
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-4 rounded-xl transition-all duration-200 hover:shadow-lg mt-2">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      
    </main>
  );
};

export default Home;
