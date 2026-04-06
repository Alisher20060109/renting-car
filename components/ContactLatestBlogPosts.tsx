"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useApi from "@/utils/api";

import "swiper/css";

type Car = {
    id: string;
    model?: string;
    images?: string[];
    brand_id?: string;
};

export default function LatestBlogPostsNews() {
    const { data: cars = [], loading, error } = useApi<Car>({ url: "cars" });

    const posts = useMemo(() => {
        return cars
            .filter((car) => car.images && car.images.length > 0)
            .map((car, index) => ({
                id: car.id,
                title: car.model || `Car ${index + 1}`,
                category: "News",
                date: "12April 2024",
                image: car.images?.[0] || "",
            }));
    }, [cars]);

    if (loading) {
        return (
            <section className="w-full bg-[#f3f3f3] py-12">
                <div className="mx-auto max-w-[1200px] px-4">
                    <h2 className="mb-10 text-center text-[28px] font-extrabold text-black md:text-[40px]">
                        Latest blog posts & news
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item}>
                                <div className="h-[220px] w-full animate-pulse rounded-[18px] bg-gray-300" />
                                <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-gray-300" />
                                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full bg-[#f3f3f3] py-12">
                <div className="mx-auto max-w-[1200px] px-4 text-center">
                    <p className="text-red-500">Xatolik: {error}</p>
                </div>
            </section>
        );
    }

    if (!posts.length) {
        return (
            <section className="w-full bg-[#f3f3f3] py-12">
                <div className="mx-auto max-w-[1200px] px-4 text-center">
                    <p className="text-gray-600">Mashina rasmlari topilmadi</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-12">
            <div className="mx-auto max-w-[1400px] px-4">
                <h2 className="mb-10 text-center text-[28px] font-extrabold leading-tight text-black md:text-[40px]">
                    Latest blog posts & news
                </h2>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    loop={posts.length > 3}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <div className="group">
                                <div className="overflow-hidden rounded-[18px] bg-white">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <h3 className="mt-4 text-[18px] font-extrabold leading-[1.35] text-black md:text-[20px]">
                                    {post.title}
                                </h3>

                                <p className="mt-3 text-[14px] text-[#777]">
                                    {post.category} / {post.date}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}