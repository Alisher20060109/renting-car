// app/brends/[id]/page.tsx

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useApi from "@/utils/api";
import Image from "next/image";

interface Car {
  id: string;
  model: string;
  brand_id: string;
  price_per_day: number;
  images: string[];
  year: number;
  city: string;
  horsepower: number;
  engine: string;
  is_available: boolean;
  is_featured: boolean;
}

interface BrandWithCars {
  id: string;
  name: string;
  logo: string;
  brand_cars: Car[];
}

export default function BrendSinglePage() {
  const { id } = useParams<{ id: string }>();

  const { data: allBrands, loading } = useApi<BrandWithCars>({ url: "brands_with_cars" });

  const brand = allBrands.find((b) => b.id === id);
  const brandCars = brand?.brand_cars ?? [];

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative bg-[#0d0d0f] overflow-hidden">
        {brand?.logo && (
          <div className="absolute right-0 top-0 h-full flex items-center pr-16 opacity-[0.06] pointer-events-none select-none">
            <img src={brand.logo} alt="" className="h-72 w-72 object-contain" />
          </div>
        )}
        <div className="relative z-10 px-6 md:px-16 py-14">
          {loading ? (
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl bg-white/10 animate-pulse" />
              <div className="space-y-3">
                <div className="w-24 h-3 rounded bg-white/10 animate-pulse" />
                <div className="w-56 h-8 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              {brand?.logo && (
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg shrink-0">
                  <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <div>
                <p className="text-[#f5c518] text-xs font-bold tracking-[0.25em] uppercase mb-1">Premium Brend</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">{brand?.name ?? "Brend"}</h1>
              </div>
            </div>
          )}
          {!loading && (
            <p className="mt-4 text-gray-500 text-sm">{brandCars.length} ta avtomobil mavjud</p>
          )}
        </div>
        <div className="h-px bg-white/10" />
      </div>

      {/* CARS SECTION */}
      <div className="px-6 md:px-16 py-14">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-10 h-0.5 bg-[#f5c518]" />
          <span className="text-[#f5c518] text-xs font-bold tracking-[0.25em] uppercase">Mavjud mashinalar</span>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-100" />
                <div className="p-5 space-y-3 bg-[#0d0d0f]">
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/10 rounded" />
                  <div className="h-10 bg-white/10 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bo'sh holat */}
        {!loading && brandCars.length === 0 && (
          <div className="text-center py-24 text-gray-400">Bu brend uchun avtomobillar mavjud emas</div>
        )}

        {/* CAR CARDS - TO'G'RILANGAN */}
        {!loading && brandCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCars.map((car, i) => (
              <div
                key={car.id}
                className=" group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* ==================== RASM QISMI ==================== */}
                <div className="relative w-full bg-gray-100 ">
                  <img
                    src={car.images[0]}
                    alt={car.model}
                
                    className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Year */}
                  <span className="absolute top-3 left-3 bg-black/75 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {car.year}
                  </span>

                  {/* Mavjud / Band */}
                  <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 border ${
                    car.is_available
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-red-500/20 text-red-400 border-red-500/40"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${car.is_available ? "bg-green-400" : "bg-red-400"}`} />
                    {car.is_available ? "Mavjud" : "Band"}
                  </span>

                  
                </div>

                {/* ==================== CARD TANASI ==================== */}
                <div className="flex flex-col flex-1 p-5 bg-[#0d0d0f]">
                  {/* Model + Narx */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-black text-lg leading-tight pr-3 flex-1">
                      {car.model}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-[#f5c518] font-black text-2xl leading-none block">
                        {car.price_per_day?.toLocaleString()}
                      </span>
                      <p className="text-gray-500 text-xs mt-0.5">so'm/kun</p>
                    </div>
                  </div>

                  {/* Joylashuv */}
                  <p className="text-gray-500 text-xs mb-5 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {car.city}
                  </p>

                  {/* Engine + HP */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-gray-400 text-xs">{car.engine}</span>
                    <span className="text-[#f5c518] font-black text-sm">{car.horsepower} HP</span>
                  </div>

                  {/* Button - Kattaroq qilindi */}
                  <Link
                    href={`/singl/${car.id}`}
                    className="mt-6 block w-full text-center bg-[#1a1a0a] border border-[#f5c518]/30 hover:bg-[#f5c518] hover:text-black text-[#f5c518] font-bold py-4 rounded-xl transition-all duration-300 text-sm tracking-wide"
                  >
                    Batafsil ko'rish
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .car-card {
          opacity: 0;
          animation: carFadeIn 0.5s ease-out forwards;
        }
        @keyframes carFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}