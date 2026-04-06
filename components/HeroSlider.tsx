"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Armchair,
  Fuel,
  Settings2,
  Search,
} from "lucide-react";
import Image from "next/image";
import useApi from "@/utils/api";


// ─── Types ────────────────────────────────────────────────────────────────────

interface Car {
  id: string;
  model: string;
  description: string;
  brand_id: string;
  category_id: string;
  color_id: string;
  city: string;
  location: string;
  latitude: number;
  longitude: number;
  year: number;
  engine: string;
  fuel_type: string;
  transmission: string;
  drive_type: string;
  horsepower: number;
  seats: number;
  doors: number;
  mileage: number;
  status: "active" | "inactive" | "rented";
  is_available: boolean;
  is_featured: boolean;
  price_per_day: number;
  price_per_week?: number;
  price_per_month?: number;
  deposit: number;
  min_rent_days: number;
  images: string[];
  videos?: string[];
  air_conditioning: boolean;
  bluetooth: boolean;
  cruise_control: boolean;
  gps: boolean;
  parking_sensors: boolean;
  rear_camera: boolean;
  created_at: string;
  updated_at: string;
}

interface FilterItem {
  label: string;
  placeholder: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_VIDEO = 4;

const FILTER_ITEMS: FilterItem[] = [
  { label: "MASHINA TURI", placeholder: "Turni tanlang" },
  { label: "OLIB KETISH JOYI", placeholder: "Manzilni tanlang" },
  { label: "OLIB KETISH SANASI", placeholder: "Sana qo'shing" },
  { label: "QAYTARISH JOYI", placeholder: "Manzilni tanlang" },
  { label: "QAYTARISH SANASI", placeholder: "Sana qo'shing" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEmbedUrl(url: string): string {
  if (!url) return "";
  const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match?.[2];
  if (!videoId) return "";
  return (
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&modestbranding=1&rel=0&playsinline=1`
  );
}

function formatPrice(value?: number): string {
  if (value == null) return "";
  return value.toLocaleString("uz-UZ");
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SlideMediaProps {
  car: Car;
  index: number;
  useVideo: boolean;
  isCurrent: boolean;
}

const SlideMedia: React.FC<SlideMediaProps> = ({
  car,
  index,
  useVideo,
  isCurrent,
}) => (
  <div
    className={`absolute inset-0 transition-opacity duration-700 ${
      isCurrent ? "opacity-100 z-20" : "opacity-0 z-10"
    }`}
  >
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {useVideo ? (
        <iframe
          src={getEmbedUrl(car.videos![0])}
          className="absolute inset-0 w-full h-full scale-110"
          allow="autoplay; fullscreen"
          title={car.model}
        />
      ) : (
        <Image
          src={car.images?.[0] ?? ""}
          alt={car.model}
          fill
          className="object-cover scale-105"
          priority={index === 0}
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black/80 to-transparent" />
    </div>
  </div>
);

interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SpecItem: React.FC<SpecItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-[9px] uppercase tracking-widest">{label}</p>
      <p className="text-white text-sm font-bold">{value}</p>
    </div>
  </div>
);

interface PriceBlockProps {
  label: string;
  value?: number;
}

const PriceBlock: React.FC<PriceBlockProps> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div>
      <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-white text-2xl sm:text-3xl font-black">
        {formatPrice(value)}{" "}
        <span className="text-lg font-semibold text-gray-300">so'm</span>
      </p>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const HeroSlider: React.FC = () => {
  const { data: cars } = useApi<Car[]>({ url: "cars" }) as unknown as { data: Car[] };

  const [current, setCurrent] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  const next = useCallback(() => {
    if (animating || !cars?.length) return;
    setAnimating(true);
    setCurrent((prev) => (prev + 1) % cars.length);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, cars]);

  const prev = useCallback(() => {
    if (animating || !cars?.length) return;
    setAnimating(true);
    setCurrent((prev) => (prev - 1 + cars.length) % cars.length);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, cars]);

  useEffect(() => {
    if (!cars || cars.length <= 1) return;
    const timer = setInterval(next, 7100);
    
    return () => clearInterval(timer);
  }, [current, cars, next]);

  if (!cars || cars.length === 0) {
    return (
      <div className="h-svh flex items-center justify-center bg-[#1a1a1a]">
        <div className="w-10 h-10 border-2 border-[#f5c518] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const car: Car = cars[current];

  return (
    <section className="relative   w-full h-svh overflow-hidden bg-[#1a1a1a]">

      {/* ── SLIDES ── */}
      {cars.map((c: Car, i: number) => (
        <SlideMedia
          key={c.id}
          car={c}
          index={i}
          useVideo={i < MAX_VIDEO && Boolean(c.videos?.length)}
          isCurrent={i === current}
        />
      ))}

      {/* ── CONTENT ── */}
      <div className="relative z-30 flex flex-col h-full">
        <div className="flex-1 flex items-center min-h-0">
          <div className="w-full px-6 sm:px-10 lg:px-20 pb-4 sm:pb-6">

            {/* meta */}
            <p className="text-[#f5c518] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3 opacity-90">
              {car.transmission} · {car.fuel_type} · {car.horsepower} HP
            </p>

            {/* model name */}
            <h1
              className="text-white font-black leading-none mb-3 sm:mb-5"
              style={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 40px rgba(0,0,0,0.4)",
              }}
            >
              {car.model}
            </h1>

            {/* description */}
            <p className="text-gray-300 text-sm sm:text-base max-w-lg mb-5 sm:mb-8 line-clamp-2 leading-relaxed">
              {car.description}
            </p>

            {/* pricing */}
            <div className="flex flex-wrap items-end gap-6 sm:gap-8 mb-6 sm:mb-9">
              <PriceBlock label="Kunlik narx" value={car.price_per_day} />
              <PriceBlock label="Haftalik" value={car.price_per_week} />
              <PriceBlock label="Oylik" value={car.price_per_month} />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
              <button
                className="px-7 sm:px-9 h-11 sm:h-12 rounded-full font-bold text-sm sm:text-base text-black transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "#f5c518",
                  boxShadow: "0 6px 24px rgba(245,197,24,0.35)",
                }}
              >
                Ijaraga olish
              </button>
              <button  className="px-7 sm:px-9 h-11 sm:h-12 rounded-full border border-white/40 text-white text-sm sm:text-base font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                Batafsil
              </button>
            </div>

            {/* specs */}
            <div className="flex flex-wrap gap-5 sm:gap-10">
              {car.seats > 0 && (
                <SpecItem
                  icon={<Armchair size={15} className="text-[#f5c518]" />}
                  label="O'rindiqlar"
                  value={`${car.seats} ta`}
                />
              )}
              <SpecItem
                icon={<Fuel size={15} className="text-[#f5c518]" />}
                label="Yoqilg'i"
                value={car.fuel_type}
              />
              <SpecItem
                icon={<Settings2 size={15} className="text-[#f5c518]" />}
                label="Uzatma"
                value={car.transmission}
              />
            </div>

          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="relative z-30 w-full bg-black/80 backdrop-blur-md border-t border-white/10">
          <div className="flex items-stretch divide-x divide-white/10 overflow-x-auto scrollbar-none">
            {FILTER_ITEMS.map((item: FilterItem) => (
              <button
                key={item.label}
                className="flex-1 min-w-32.5 sm:min-w-35 px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-white/5 transition-colors duration-150 group"
              >
                <p className="text-[#f5c518] text-[8px] sm:text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5 sm:mb-1">
                  {item.label}
                </p>
                <p className="text-white/60 text-xs sm:text-sm group-hover:text-white/80 transition-colors truncate">
                  {item.placeholder}
                </p>
              </button>
            ))}

            <button
              className="min-w-27.5 sm:min-w-32.5 px-5 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 font-bold text-sm text-black transition-all duration-200 hover:brightness-110 shrink-0"
              style={{ background: "#f5c518" }}
            >
              <Search size={15} />
              <span>Qidirish</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3">
        <span className="text-white text-xs font-mono font-bold">{pad(current + 1)}</span>
        <div className="w-px h-10 bg-white/20" />
        <span className="text-white/40 text-xs font-mono">{pad(cars.length)}</span>
      </div>

      {/* ── PREV ── */}
      <button
        onClick={prev}
        aria-label="Oldingi slayd"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
      >
        <ChevronLeft size={18} />
      </button>

      {/* ── NEXT ── */}
      <button
        onClick={next}
        aria-label="Keyingi slayd"
        className="absolute right-10 sm:right-14 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
      >
        <ChevronRight size={18} />
      </button>

      {/* ── PROGRESS DOTS ── */}
      <div className="absolute bottom-14 sm:bottom-17 left-0 right-0 z-30 flex items-center gap-1.5 px-6 sm:px-10 lg:px-20">
        {cars.map((_: Car, i: number) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${i + 1}-slayd`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 sm:w-8 h-1.5 bg-[#f5c518]"
                : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;