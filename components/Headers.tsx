import React from 'react';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

const Headers = () => {
    return (
        <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">

                {/* --- LOGO --- */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="bg-black p-2 rounded-xl group-hover:bg-[#6347F9] transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
                        Car<span className="text-[#6347F9]">Rental</span>
                    </span>
                </div>

                {/* --- NAVIGATSIYA (DESKTOP) --- */}
                <nav className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-[15px] font-bold tracking-wide text-gray-500 hover:text-black transition-all duration-200">Home</Link>
                    <Link href="/vehicles" className="text-[15px] font-bold tracking-wide text-gray-500 hover:text-black transition-all duration-200">Vehicles</Link>
                    <Link href="/details" className="text-[15px] font-bold tracking-wide text-gray-500 hover:text-black transition-all duration-200">Details</Link>
                    <Link href="/about-us" className="text-[15px] font-bold tracking-wide text-gray-500 hover:text-black transition-all duration-200">About Us</Link>
                    <Link href="/contact-us" className="text-[15px] font-bold tracking-wide text-gray-500 hover:text-black transition-all duration-200">Contact Us</Link>
                </nav>

                {/* --- O'NG TOMON --- */}
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-4 border-l pl-6 border-gray-200">
                        <div className="bg-[#6347F9] p-3 rounded-full text-white shadow-lg shadow-indigo-100 transform hover:scale-110 transition-transform cursor-pointer">
                            <Phone size={18} fill="white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Need help?</span>
                            <a href="tel:+9962471680" className="text-base font-extrabold text-gray-900 hover:text-[#6347F9] transition-colors leading-none">
                                +996 247-1680
                            </a>
                        </div>
                    </div>

                    {/* Burger — client component */}
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};

export default Headers;