import { Calendar, MapPin, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSliderCard = () => {
    return (
        <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 py-10 lg:py-0">

                {/* Chap tomon — matn */}
                <div className="w-full lg:flex-1 lg:max-w-xl text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight mb-4">
                        Experience <br />
                        <span className="text-yellow-400">the road</span> <br />
                        like never before
                    </h1>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
                        Premium vehicles at your fingertips. Book in minutes, drive in style — wherever the road takes you.
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <Link
                            href="/vehicles"
                            className="bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                        >
                            View all cars
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* O'ng tomon — Booking card, faqat lg da ko'rinadi */}
                <div className="hidden lg:block w-85 shrink-0 bg-white rounded-3xl shadow-2xl p-6">
                    <h3 className="text-xl font-black text-gray-900 mb-5 text-center">Book your car</h3>
                    <div className="space-y-3">

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <Car size={18} className="text-[#6347F9] shrink-0" />
                            <span className="flex-1 text-gray-400 text-sm font-medium">Car type</span>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <MapPin size={18} className="text-[#6347F9] shrink-0" />
                            <span className="flex-1 text-gray-400 text-sm font-medium">Place of rental</span>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <MapPin size={18} className="text-[#6347F9] shrink-0" />
                            <span className="flex-1 text-gray-400 text-sm font-medium">Place of return</span>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <Calendar size={18} className="text-[#6347F9] shrink-0" />
                            <span className="flex-1 text-gray-400 text-sm font-medium">Rental date</span>
                            <Calendar size={16} className="text-gray-400 shrink-0" />
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
                            <Calendar size={18} className="text-[#6347F9] shrink-0" />
                            <span className="flex-1 text-gray-400 text-sm font-medium">Return date</span>
                            <Calendar size={16} className="text-gray-400 shrink-0" />
                        </div>

                        <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-4 rounded-xl transition-all duration-200 hover:shadow-lg mt-2">
                            Book now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSliderCard;