"use client";

import useApi from "@/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

type Car = {
    id: string;
    model: string;
    images: string[];
};

export default function Contactsiper() {
    const { data: cars, loading, error } = useApi<Car>({ url: "cars" });

    const bannerImages =
        cars?.flatMap((car) => car.images || []).filter((img) => !!img) || [];

    if (loading) {
        return (
            <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-200 animate-pulse" />
        );
    }

    if (error) {
        return (
            <section className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100">
                <p className="text-red-500">Xatolik: {error}</p>
            </section>
        );
    }

    if (!bannerImages.length) {
        return (
            <section className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Rasm topilmadi</p>
            </section>
        );
    }

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade]}
                slidesPerView={1}
                loop={true}
                effect="fade"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="w-full h-full"
            >
                {bannerImages.map((image, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${image})`,
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 bg-black/50 z-10" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                    Contact Us
                </h1>

                <div className="mt-3 text-sm md:text-base text-gray-200 flex items-center gap-2">
                    <span className="hover:text-white cursor-pointer transition">Home</span>
                    <span>/</span>
                    <span className="text-white font-medium">Contact Us</span>
                </div>
            </div>
        </section>
    );
}