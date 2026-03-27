"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../app/aboutswiper.css";


type VideoItem = {
  id: number;
  title: string;
  src: string;
  poster?: string;
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Video 1",
    src: "/videos/video1.mp4",
    poster: "/images/poster1.jpg",
  },
  {
    id: 2,
    title: "Video 2",
    src: "/videos/video2.mp4",
    poster: "/images/poster2.jpg",
  },
  {
    id: 3,
    title: "Video 3",
    src: "/videos/video3.mp4",
    poster: "/images/poster3.jpg",
  },
  {
    id: 4,
    title: "Video 4",
    src: "/videos/video4.mp4",
    poster: "/images/poster4.jpg",
  },
];

export default function VideoSwiper() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Kichik swiper */}
      <div className="w-full max-w-6xl mx-auto py-10 px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={video.id}>
              <div
                onClick={() => openModal(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-black shadow-lg"
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  muted
                  className="h-[220px] w-full object-cover"
                />

                {/* play icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                    <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-black" />
                  </div>
                </div>

                {/* title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">
                    {video.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          {/* close button */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-md hover:bg-gray-200"
          >
            Yopish
          </button>

          <div className="flex h-full w-full items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl">
              <Swiper
                initialSlide={selectedIndex}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="rounded-2xl"
              >
                {videos.map((video) => (
                  <SwiperSlide key={video.id}>
                    <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        autoPlay
                        className="max-h-[80vh] w-full bg-black object-contain"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">
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