"use client";

import { useState } from "react";
import { ChevronDown, CalendarDays } from "lucide-react";

export default function BookYourCar() {
    const [carType, setCarType] = useState("");
    const [rentalPlace, setRentalPlace] = useState("");
    const [returnPlace, setReturnPlace] = useState("");
    const [rentalDate, setRentalDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!carType || !rentalPlace || !returnPlace || !rentalDate || !returnDate) {
            alert("Iltimos, barcha maydonlarni to‘ldiring.");
            return;
        }

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="w-full h-full">
            <div className="w-full rounded-[20px] bg-gradient-to-b from-[#5C3BEE] to-[#5A33DA] px-8 py-9 shadow-xl">
                <h2 className="text-white text-[20px] font-semibold text-center mb-8">
                    Book your car
                </h2>

                <div className="space-y-4">
                    <div className="relative">
                        <select
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                            className="w-full appearance-none rounded-[12px] bg-white/10 text-white placeholder:text-white/70 px-4 pr-10 h-[42px] outline-none border border-white/10 text-sm"
                        >
                            <option value="" className="text-black">
                                Car type
                            </option>
                            <option value="sedan" className="text-black">
                                Sedan
                            </option>
                            <option value="suv" className="text-black">
                                SUV
                            </option>
                            <option value="sport" className="text-black">
                                Sport
                            </option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={rentalPlace}
                            onChange={(e) => setRentalPlace(e.target.value)}
                            className="w-full appearance-none rounded-[12px] bg-white/10 text-white px-4 pr-10 h-[42px] outline-none border border-white/10 text-sm"
                        >
                            <option value="" className="text-black">
                                Place of rental
                            </option>
                            <option value="tashkent" className="text-black">
                                Tashkent
                            </option>
                            <option value="samarkand" className="text-black">
                                Samarkand
                            </option>
                            <option value="bukhara" className="text-black">
                                Bukhara
                            </option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={returnPlace}
                            onChange={(e) => setReturnPlace(e.target.value)}
                            className="w-full appearance-none rounded-[12px] bg-white/10 text-white px-4 pr-10 h-[42px] outline-none border border-white/10 text-sm"
                        >
                            <option value="" className="text-black">
                                Place of return
                            </option>
                            <option value="tashkent" className="text-black">
                                Tashkent
                            </option>
                            <option value="samarkand" className="text-black">
                                Samarkand
                            </option>
                            <option value="bukhara" className="text-black">
                                Bukhara
                            </option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            value={rentalDate}
                            onChange={(e) => setRentalDate(e.target.value)}
                            className="w-full rounded-[12px] bg-white/10 text-white px-4 pr-10 h-[42px] outline-none border border-white/10 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full rounded-[12px] bg-white/10 text-white px-4 pr-10 h-[42px] outline-none border border-white/10 text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 w-4 h-4 pointer-events-none" />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-8 h-[46px] rounded-[12px] bg-[#FFA30D] text-white font-semibold text-sm hover:scale-[1.02] active:scale-[0.99] transition"
                >
                    Book now
                </button>

                {submitted && (
                    <div className="mt-4 rounded-[12px] bg-white/15 border border-white/20 px-4 py-3 text-center text-white text-sm">
                        Jo‘natildi. So‘rovingiz muvaffaqiyatli yuborildi.
                    </div>
                )}
            </div>
        </div>
    );
}