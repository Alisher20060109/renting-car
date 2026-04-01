"use client";

import { useMemo, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../app/vodeswiper.css"
import useApi from "@/utils/api";

type Car = {
  id: string;
  brand_id?: string;
  model?: string;
  videos?: string[];
  images?: string[];
};

type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster?: string;
};

export default function VideoSwiper() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const { data: cars = [], loading, error } = useApi<Car>({ url: "cars" });

  const videos = useMemo<VideoItem[]>(() => {
    return cars.flatMap((car, carIndex) =>
      (car.videos || []).map((videoUrl, videoIndex) => ({
        id: `${car.id}-${videoIndex}`,
        title: car.model ? `${car.model} Video` : `Car Video ${carIndex + 1}`,
        src: videoUrl,
        poster: car.images?.[0] || undefined,
      }))
    );
  }, [cars]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);

    if (mainSwiperRef.current?.autoplay) {
      mainSwiperRef.current.autoplay.stop();
    }
  };

  const closeModal = () => {
    setIsOpen(false);

    setTimeout(() => {
      if (mainSwiperRef.current?.autoplay) {
        mainSwiperRef.current.autoplay.start();
      }
    }, 100);
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-12 md:py-16">
        <div className=" px-4">
          <div className="h-[260px] w-full animate-pulse rounded-[24px] bg-gray-200 md:h-[320px]" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-red-500">
          Xatolik: {error}
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return (
      <section className="w-full ">
        <div className=" px-4 text-center text-gray-700">
          Video topilmadi
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-white ">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Our Videos
            </p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Watch Our Premium Collection
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
              API dan kelgan avtomobil videolarini tomosha qiling.
            </p>
          </div>

          <Swiper
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            loop={videos.length > 1}
            speed={900}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="video-swiper !pb-14"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div
                  onClick={() => openModal(index)}
                  className="group relative cursor-pointer overflow-hidden rounded-[24px] bg-black shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="relative h-[240px] w-full md:h-[280px]">
                    <video
                      src={video.src}
                      poster={video.poster}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl transition duration-300 group-hover:scale-110">
                        <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-black" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="line-clamp-1 text-lg font-semibold text-white md:text-xl">
                        {video.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/75">
                        Bosib katta ekranda ko‘ring
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md">
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-[1000] rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-gray-200 md:right-8 md:top-8"
          >
            Yopish
          </button>

          <div className="flex h-full w-full items-center justify-center px-4 py-8 md:px-8">
            <div className="w-full max-w-6xl">
              <Swiper
                modules={[Navigation, Pagination]}
                initialSlide={selectedIndex}
                navigation
                pagination={{ clickable: true }}
                className="modal-video-swiper"
              >
                {videos.map((video) => (
                  <SwiperSlide key={video.id}>
                    <div className="overflow-hidden rounded-[28px] bg-[#0b0b0b] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        autoPlay
                        playsInline
                        className="h-[260px] w-full bg-black object-contain sm:h-[380px] md:h-[520px] lg:h-[78vh]"
                      />

                      <div className="border-t border-white/10 px-5 py-4 md:px-6">
                        <h3 className="text-lg font-semibold text-white md:text-xl">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
}