"use client";

import Link from "next/link";
import useApi from "@/utils/api";

interface Brand {
  id: string;
  name: string;
  logo: string;
  created_at: string;
}

export default function BrandsSection() {
  const { data: brands, loading } = useApi<Brand>({ url: "brands" });

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16">
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-0.5 bg-[#f5c518]" />
            <span className="text-[#f5c518] text-xs font-bold tracking-[0.25em] uppercase">
              Hamkorlar
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Eng yaxshi <span className="text-[#f5c518]">brendlar</span>
          </h2>
        </div>
        <p className="text-gray-400 text-sm max-w-xs leading-relaxed md:text-right">
          Dunyoning eng nufuzli avtomobil brendlari bilan hamkorlikda premium
          ijara xizmatini taqdim etamiz.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand, i) => (
            <Link
              key={brand.id}
              href={`/brends/${brand.id}`}
              className="brand-card group relative flex flex-col items-center justify-center gap-3 px-4 py-8 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#f5c518] hover:bg-yellow-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#f5c518] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-gray-500 text-xs font-semibold tracking-wide group-hover:text-gray-900 transition-colors duration-300 text-center">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {!loading && brands.length > 0 && (
        <p className="mt-12 text-center text-gray-300 text-xs tracking-[0.2em] uppercase">
          {brands.length} ta brend
        </p>
      )}

      <style>{`
        .brand-card {
          opacity: 0;
          animation: brandFadeIn 0.5s ease-out forwards;
        }
        @keyframes brandFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}