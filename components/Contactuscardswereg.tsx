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

export default function ContactSwipercard() {
    const { data: cars, loading, error } = useApi<Car>({ url: "cars" });

    const bannerImages =
        cars?.flatMap((car) => car.images || []).filter((img) => !!img) || [];

    if (loading) {
        return (
            <div className="w-full h-[420px] bg-gray-200 animate-pulse rounded-[12px]" />
        );
    }

    if (error) {
        return (
            <div className="w-full h-[420px] flex items-center justify-center bg-gray-100 rounded-[12px]">
                <p className="text-red-500">Xatolik: {error}</p>
            </div>
        );
    }

    if (!bannerImages.length) {
        return (
            <div className="w-full h-[420px] flex items-center justify-center bg-gray-100 rounded-[12px]">
                <p className="text-gray-500">Rasm topilmadi</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="w-[950px] h-[480px] overflow-hidden rounded-[12px] shadow-lg">
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
                        <SwiperSlide key={i} className="!h-full">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}