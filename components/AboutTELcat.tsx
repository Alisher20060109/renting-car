"use client";

import { Apple, Play } from "lucide-react";

export default function DownloadAppBanner() {
    return (
        <section className="w-full py-10 sm:py-14 lg:py-20 px-4">
            <div className="mx-auto max-w-[1440px] relative">
                {/* PHONE */}
                <div className="absolute z-20 left-1/2 -translate-x-1/2 -top-[50px]
                        sm:-top-[60px]
                        md:left-[80px] md:translate-x-0
                        lg:left-[120px] lg:-top-[65px]
                        xl:left-[200px] xl:-top-[70px]">
                    <div className="relative
                          h-[260px] w-[130px]
                          sm:h-[300px] sm:w-[145px]
                          md:h-[330px] md:w-[155px]
                          lg:h-[370px] lg:w-[170px]
                          xl:h-[410px] xl:w-[190px]
                          rounded-[30px] border-[5px] border-black bg-[#eaeaea] shadow-xl">
                        <div className="absolute left-1/2 top-[10px] h-[12px] w-[50px] -translate-x-1/2 rounded-full bg-black" />
                    </div>
                </div>

                {/* CARD */}
                <div className="relative overflow-visible rounded-[22px] bg-gradient-to-r from-[#6a48f5] to-[#5a39e6]
                        min-h-[520px] sm:min-h-[560px] md:min-h-[420px] lg:min-h-[270px]
                        px-5 pt-[230px] pb-8
                        sm:px-8 sm:pt-[280px]
                        md:px-10 md:pt-10 md:pb-10
                        lg:px-14 lg:py-12">
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
                    <div className="relative z-10
                          ml-0
                          md:ml-[220px]
                          lg:ml-[320px]
                          xl:ml-[470px]">
                        <p className="text-[12px] sm:text-[14px] md:text-[16px] xl:text-[20px] uppercase tracking-[2px] text-white/70">
                            Download our app
                        </p>

                        <h2 className="mt-1 text-[28px] sm:text-[36px] md:text-[38px] lg:text-[44px] xl:text-[60px] font-bold text-white leading-tight">
                            Download our app
                        </h2>

                        <p className="mt-4 max-w-[500px] text-white/70 text-[14px] sm:text-[15px] md:text-[16px] xl:text-[20px] leading-6">
                            Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas
                            semper diam rutrum dictumst et donec. Nisi nisi morbi vel in
                            vulputate.
                        </p>

                        {/* buttons */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 flex-wrap">
                            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-[8px] shadow hover:scale-105 transition">
                                <Apple className="w-[22px] h-[26px] sm:w-[24px] sm:h-[28px] xl:w-[28px] xl:h-[32px]" />
                                <div className="text-left leading-tight">
                                    <p className="text-[11px] sm:text-[12px] xl:text-[16px]">
                                        Download on the
                                    </p>
                                    <p className="text-[20px] sm:text-[22px] md:text-[24px] xl:text-[34px] font-semibold">
                                        App Store
                                    </p>
                                </div>
                            </button>

                            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-[8px] shadow hover:scale-105 transition">
                                <Play className="w-[22px] h-[26px] sm:w-[24px] sm:h-[28px] xl:w-[28px] xl:h-[32px]" />
                                <div className="text-left leading-tight">
                                    <p className="text-[11px] sm:text-[12px] xl:text-[16px]">
                                        Get it on
                                    </p>
                                    <p className="text-[20px] sm:text-[22px] md:text-[24px] xl:text-[34px] font-semibold">
                                        Google Play
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}