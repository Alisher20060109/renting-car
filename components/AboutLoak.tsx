"use client";

import { useEffect, useState } from "react";

const images = [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
];

export default function CarCTA() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full py-10 px-4">
            <div className="relative overflow-hidden rounded-2xl">

                {/* BACKGROUND IMAGE */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-100"
                    style={{
                        backgroundImage: `url(${images[index]})`,
                    }}
                />

                {/* PURPLE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 opacity-90" />

                {/* BLUR CAR EFFECT (o‘ng tomonda) */}
                <div
                    className="absolute right-0 top-0 h-full w-[60%] bg-cover bg-center blur-xl opacity-60"
                    style={{
                        backgroundImage: `url(${images[index]})`,
                    }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-12 md:py-14 text-white max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Looking for a car?
                    </h2>

                    <p className="mt-2 text-xl font-semibold">
                        +537 547-6401
                    </p>

                    <p className="mt-3 text-sm text-white/80 leading-6">
                        Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
                        bibendum ullamcorper in...
                    </p>

                    <button className="mt-6 w-fit rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-black shadow-md transition hover:scale-105 hover:bg-yellow-300">
                        Book now
                    </button>
                </div>

            </div>
        </section>
    );
}