"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Car, Info, Users, Mail, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/vehicles", label: "Vehicles", icon: Car },
    { href: "/details", label: "Details", icon: Info },
    { href: "/about-us", label: "About Us", icon: Users },
    { href: "/contact-us", label: "Contact Us", icon: Mail },
];

const MobileMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            {/* BURGER TUGMA - lg:hidden olib tashlandi */}
            <button
                onClick={() => setMenuOpen(true)}
                className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <Menu size={28} className="text-gray-800" />
            </button>

            {/* OVERLAY */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
                    menuOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#6347F9] p-2 rounded-xl">
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                            </svg>
                        </div>
                        <span className="text-lg font-black tracking-tighter text-gray-900 uppercase">
                            Car<span className="text-[#6347F9]">Rental</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={22} className="text-gray-600" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-[#6347F9] hover:text-white transition-all duration-200 group"
                                style={{ transitionDelay: menuOpen ? `${index * 50}ms` : '0ms' }}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} className="text-[#6347F9] group-hover:text-white transition-colors" />
                                    <span className="font-semibold text-[15px]">{link.label}</span>
                                </div>
                                <ChevronRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Need help?</p>
                    <a href="tel:+9962471680" className="flex items-center gap-3 group">
                        <div className="bg-[#6347F9] p-2.5 rounded-full text-white group-hover:scale-110 transition-transform">
                            <Phone size={16} fill="white" />
                        </div>
                        <span className="text-base font-extrabold text-gray-900 group-hover:text-[#6347F9] transition-colors">
                            +996 247-1680
                        </span>
                    </a>
                </div>
            </aside>
        </>
    );
};

export default MobileMenu;