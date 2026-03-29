"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const images = [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
];

export default function FeatureSection() {
    const [index, setIndex] = useState(0);

    // 🔥 rasm avtomatik almashadi
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full bg-[#f3f3f3] py-16 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT TEXT */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
                        Unlock unforgettable <br /> memories on the road
                    </h2>

                    <p className="mt-4 text-gray-500 max-w-md">
                        Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et <br />gravida. Quis nunc interdum gravida ullamcorper
                        </p>
                    {/* LIST */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {[
                            "Velit semper morbi. Purus non  eu cursus porttitor tristique et gravida",
                            "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor ",
                            "Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum ",
                            "Quis nunc interdum gravida ullamcorper",
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="bg-indigo-600 text-white rounded-full p-2">
                                    <Check size={14} />
                                </div>
                                <p className="text-gray-600 text-sm">{item}</p>
                            </div>
                        ))}

                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="w-full h-100 relative overflow-hidden rounded-2xl">
                    <img
                        src={images[index]}
                        alt="car"
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                </div>

            </div>
        </section>
    );
}