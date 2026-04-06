"use client";

import { Apple, Play } from "lucide-react";

export default function DownloadAppBanner() {
    return (
        <section className="w-full py-25 px-4">
            <div className="mx-auto max-w-[1440px] relative">

                {/* PHONE (carddan tashqariga chiqadi) */}
                <div className="absolute left-[200px] -top-[70px] z-20">
                    <div className="relative h-[410px] w-[190px] rounded-[30px] border-[5px] border-black bg-[#eaeaea] shadow-xl">
                        <div className="absolute left-1/2 top-[10px] h-[12px] w-[50px] -translate-x-1/2 rounded-full bg-black" />
                    </div>
                </div>

                {/* CARD */}
                <div className="relative overflow-visible rounded-[22px] bg-gradient-to-r from-[#6a48f5] to-[#5a39e6] min-h-[270px] px-10 py-10 md:px-14 md:py-12">

                    {/* pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 20px 20px, white 2px, transparent 2px)",
                                backgroundSize: "28px 28px",
                            }}
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 ml-[470px]">
                        <p className="text-[20px] uppercase tracking-[2px] text-white/70">
                            Download our app
                        </p>

                        <h2 className="text-[60px] md:text-[44px] font-bold text-white mt-1">
                            Download our app
                        </h2>

                        <p className="mt-4 max-w-[500px] text-white/70 text-[20px] leading-6">
                            Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas
                            semper diam rutrum dictumst et donec. Nisi nisi morbi vel in
                            vulputate.
                        </p>

                        {/* buttons */}
                        <div className="mt-6 flex gap-3 flex-wrap">
                            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-[8px] shadow hover:scale-105 transition">
                                <Apple className="w-[28px] h-[32px]" />
                                <div className="text-left leading-tight">
                                    <p className="text-[16px]">Download on the</p>
                                    <p className="text-[34px] font-semibold">App Store</p>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-[8px] shadow hover:scale-105 transition">
                                <Play className="w-[28px] h-[32px]" />
                                <div className="text-left leading-tight">
                                    <p className="text-[16px]">Get it on</p>
                                    <p className="text-[34px] font-semibold">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}