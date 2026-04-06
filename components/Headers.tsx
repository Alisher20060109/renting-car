import { Phone } from 'lucide-react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

const Headers = () => {
    return (
        <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">

            {/* --- TOP BAR --- */}
            <div className="hidden sm:flex items-center justify-between px-6 lg:px-12 py-2 border-b border-gray-100">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-[11px] text-gray-400 tracking-wide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        Mon–Sat 08:00–20:00
                    </span>
                    <span className="flex items-center gap-2 text-[11px] text-gray-400 tracking-wide">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        Tashkent, Uzbekistan
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {['UZ', 'RU', 'EN'].map((lang, i) => (
                        <button
                            key={lang}
                            className={`text-[10px] font-semibold px-2 py-1 rounded border tracking-widest transition-all cursor-pointer
                                ${i === 0
                                    ? 'text-gray-900 border-gray-300 bg-gray-100'
                                    : 'text-gray-400 border-gray-200 bg-transparent hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- MAIN HEADER --- */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 h-[68px] flex items-center justify-between">

                {/* --- LOGO 07 --- */}
                <Link href="/" className="flex items-center gap-[10px] cursor-pointer group flex-shrink-0">
                    <div className="flex flex-col items-center gap-[4px]">
                        <div className="w-[9px] h-[9px] rounded-full bg-gray-900 transition-transform duration-300 group-hover:scale-110" />
                        <div className="w-[6px] h-[6px] rounded-full bg-[#6347F9] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span
                        className="text-[21px] font-extrabold tracking-[-0.04em] text-gray-900 leading-none"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Car<span className="text-gray-300">·</span>Rental
                    </span>
                </Link>

                {/* --- NAVIGATSIYA (DESKTOP) --- */}
                <nav className="hidden md:flex items-center">
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/vehicles', label: 'Vehicles' },
                        { href: '/details', label: 'Details' },
                        { href: '/about-us', label: 'About Us' },
                        { href: '/contact-us', label: 'Contact Us' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="relative text-[13.5px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 px-[16px] py-[6px] rounded-lg tracking-[-0.01em]"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* --- O'NG TOMON --- */}
                <div className="flex items-center gap-3">

                    {/* Phone pill */}
                    <div className="hidden sm:flex items-center gap-[10px] px-2 pr-[14px] py-2 rounded-full border border-gray-200 hover:border-[#6347F9]/40 hover:bg-[#6347F9]/[0.04] transition-all duration-200 cursor-pointer">
                        <div className="w-7 h-7 rounded-full bg-[#6347F9]/10 flex items-center justify-center flex-shrink-0">
                            <Phone size={13} fill="#6347F9" color="#6347F9" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em] leading-none mb-[2px]">
                                Need help?
                            </span>
                            <a
                                href="tel:+9962471680"
                                className="text-[13px] font-semibold text-gray-900 tracking-[-0.02em] leading-none hover:text-[#6347F9] transition-colors"
                            >
                                +996 247-1680
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-5 bg-gray-200" />

                    {/* CTA */}
                    <button className="hidden sm:flex items-center gap-2 h-9.5 px-4.5 bg-gray-900 hover:bg-[#6347F9] text-white rounded-full text-[13px] font-bold tracking-[-0.01em] hover:scale-[1.02] transition-all duration-200 cursor-pointer border-none">
                        Book a Car
                        <span className="w-4.5 h-4.5 rounded-full bg-white/15 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2.5 h-2.5">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </button>

                    {/* Burger — client component */}
                    <MobileMenu />
                </div>
            </div>

          

        </header>
    );
};

export default Headers;