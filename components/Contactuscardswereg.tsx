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
            <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] animate-pulse rounded-[12px] bg-gray-200" />
        );
    }

    if (error) {
        return (
            <div className="flex w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] items-center justify-center rounded-[12px] bg-gray-100">
                <p className="text-red-500">Xatolik: {error}</p>
            </div>
        );
    }

    if (!bannerImages.length) {
        return (
            <div className="flex w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] items-center justify-center rounded-[12px] bg-gray-100">
                <p className="text-gray-500">Rasm topilmadi</p>
            </div>
        );
    }

    return (
        <div className="w-full min-w-0">
            <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] overflow-hidden rounded-[12px] shadow-lg">
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