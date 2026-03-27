"use client";

import { useEffect, useState } from "react";

const images = [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
];

export default function Aboutussiper() {
    const [index, setIndex] = useState(0);

   
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[300px] overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(${images[index]})`,
                }}
            />

            <div className="absolute inset-0 bg-black/50" />

     
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    About Us
                </h1>

                <div className="mt-2 text-sm text-gray-300 flex items-center gap-2">
                    <span className="hover:text-white cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="text-white font-medium">About Us</span>
                </div>
            </div>
        </section>
    );
}