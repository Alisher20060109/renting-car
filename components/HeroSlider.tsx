"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar, Fuel, Gauge } from "lucide-react";
import Image from "next/image";
import useApi from "@/utils/api";

const HeroSlider = () => {
  const { data: cars } = useApi({ url: "cars" });

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const MAX_VIDEO = 4;

  const getEmbedUrl = (url: string): string => {
    if (!url) return "";

    const regExp =
      /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = match?.[2];

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  };

  const next = useCallback(() => {
    if (animating || !cars) return;
    setAnimating(true);
    setCurrent((prev) => (prev + 1) % cars.length);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, cars]);

  const prev = () => {
    if (animating || !cars) return;
    setAnimating(true);
    setCurrent((prev) => (prev - 1 + cars.length) % cars.length);
    setTimeout(() => setAnimating(false), 700);
  };

  useEffect(() => {
    if (!cars || cars.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [current, cars, next]);

  if (!cars || cars.length === 0) {
    return (
      <div className="h-svh flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-svh overflow-hidden bg-black">
      {cars.map((car: any, i: number) => {
        const useVideo = i < MAX_VIDEO && car.videos?.length > 0;

        return (
          <div
            key={car.id || i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {/* MEDIA */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {useVideo ? (
                <iframe
                  src={getEmbedUrl(car.videos[0])}
                  className="absolute inset-0 w-full h-full object-cover"
                  allow="autoplay; fullscreen"
                />
              ) : (
                <Image
                  src={car.images?.[0] || ""}
                  alt={car.model}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  unoptimized
                />
              )}

              {/* overlays */}
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative z-20 flex items-center h-full">
              <div className="container mx-auto px-4 sm:px-6 lg:px-16">
                <div className="max-w-xl sm:max-w-2xl">
                  
                  {/* label */}
                  <p className="text-blue-500 uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 sm:mb-4">
                    Luxury Experience
                  </p>

                  {/* title */}
                  <h1 className="
                    text-3xl 
                    sm:text-5xl 
                    md:text-6xl 
                    lg:text-7xl 
                    font-black text-white mb-4 sm:mb-6 leading-tight
                  ">
                    {car.model}
                  </h1>

                  {/* description */}
                  <p className="
                    text-gray-300 
                    text-sm sm:text-base md:text-lg 
                    mb-6 sm:mb-8 
                    line-clamp-3
                  ">
                    {car.description}
                  </p>

                  {/* stats */}
                  <div className="
                    flex flex-wrap 
                    gap-4 sm:gap-6 
                    mb-6 sm:mb-8 
                    text-white text-sm sm:text-base
                  ">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} /> {car.year}
                    </span>
                    <span className="flex items-center gap-2">
                      <Gauge size={16} /> {car.horsepower} HP
                    </span>
                    <span className="flex items-center gap-2">
                      <Fuel size={16} /> {car.fuel_type}
                    </span>
                  </div>

                  {/* actions */}
                  <div className="
                    flex flex-col sm:flex-row 
                    items-start sm:items-center 
                    gap-4
                  ">
                    <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-400">Daily</p>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        ${car.price_per_day}
                      </p>
                    </div>

                    <button className="
                      w-full sm:w-auto
                      px-6 sm:px-8 
                      h-11 sm:h-12 
                      bg-blue-600 hover:bg-blue-700 
                      text-white rounded-full 
                      font-semibold flex items-center justify-center gap-2
                    ">
                      Book Now <ChevronRight size={18} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* NAV */}
      <div className="
        absolute 
        bottom-4 sm:bottom-6 
        right-4 sm:right-6 
        flex gap-2 sm:gap-3 
        z-30
      ">
        <button
          onClick={prev}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* PROGRESS */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 flex z-30">
        {cars.map((_: any, i: number) => (
          <div
            key={i}
            className="flex-1 bg-white/20"
            onClick={() => setCurrent(i)}
          >
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: i === current ? "100%" : "0%",
                transitionDuration: i === current ? "7000ms" : "0ms",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;