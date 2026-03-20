"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  { id: 1, image: "/images/bmw.jpg", bg: "from-[#6347F9] to-[#3b1fa8]" },
  { id: 2, image: "/images/mers.jpg", bg: "from-[#1a1a2e] to-[#16213e]" },
  { id: 3, image: "/images/supra.jpg", bg: "from-[#0f3460] to-[#533483]" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 400);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0  transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
        >
          {/* Gradient bg */}
          <div className={`absolute inset-0 bg-linear-to-br ${slide.bg}`} />

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />

          {/* Car image — o'ng pastda, yarmi ko'rinadi */}
          <div className={`absolute right-0 bottom-0 w-[50%] h-full transition-all duration-700 ${
            i === current && !animating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <Image
              src={slide.image}
              alt={`car-${slide.id}`}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="50vw"
            />
            {/* Chap tarafdan gradient — matn bilan qorishmasin */}
            <div className="absolute inset-0 bg-linear-to-r from-[#6347F9] via-transparent to-transparent" />
          </div>
        </div>
      ))}

      {/* Prev */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110">
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </>
  );
};

export default HeroSlider;