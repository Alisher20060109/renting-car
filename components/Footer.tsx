import React from "react";
import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Apple } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f3f3f3] mt-20">
      {/* Konteyner Header bilan bir xil qilindi */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        
        {/* TOP ROW: Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-center border-b border-gray-200 pb-12">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-xl">
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            </div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tighter">
              Car<span className="text-[#6347F9]">Rental</span>
            </h2>
          </div>

          {/* ADDRESS */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
              <h4 className="text-[16px] font-extrabold text-[#222]">Oxford Ave. Cary, NC 27511</h4>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
              <h4 className="text-[16px] font-extrabold text-[#222]">nwiqer@yahoo.com</h4>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">Phone</p>
              <h4 className="text-[16px] font-extrabold text-[#222]">+537 547-6401</h4>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Links & App */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
          <div>
            <p className="text-[#555] text-[16px] leading-relaxed mb-8">
              Faucibus faucibus pellentesque dictum turpis. Id pellentesque
              turpis massa a id iaculis lorem...
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all"><Facebook size={18} fill="currentColor" /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor"><path d="M18.244 2H21l-6.56 7.497L22 22h-5.828l-4.563-5.96L6.4 22H3.64l7.017-8.018L2 2h5.976l4.124 5.447L18.244 2zm-1.02 18h1.527L7.145 3.896H5.506L17.224 20z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white transition-all"><Youtube size={18} fill="currentColor" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-[#222] mb-6">Useful links</h3>
            <ul className="space-y-3">
              {["About us", "Contact us", "Gallery", "Blog", "F.A.Q"].map((item) => (
                <li key={item}><a href="#" className="text-gray-600 hover:text-[#6347F9] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-[#222] mb-6">Vehicles</h3>
            <ul className="space-y-3">
              {["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"].map((item) => (
                <li key={item}><a href="#" className="text-gray-600 hover:text-[#6347F9] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-[#222] mb-6">Download App</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-105 transition-transform">
                <Apple size={24} />
                <div className="leading-none">
                  <p className="text-[10px] text-gray-400 mb-1">Download on the</p>
                  <p className="text-[18px] font-semibold">App Store</p>
                </div>
              </a>
              <a href="#" className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:scale-105 transition-transform">
                {/* Google Play Icon */}
                <svg viewBox="0 0 512 512" className="w-6 h-6"><path fill="#34A853" d="M325.3 234.3L104.6 10.1c-7.3-7.4-17.8-10-27.6-6.9l180.6 180.5 67.7 50.6z" /><path fill="#FBBC04" d="M24.5 27.3C22.9 31.4 22 35.8 22 40.4v431.2c0 4.6.9 9 2.5 13.1L214.3 294 24.5 27.3z" /><path fill="#EA4335" d="M257.6 328.3L76.9 508.9c9.8 3.1 20.3.5 27.6-6.9l220.7-224.2-67.6 50.5z" /><path fill="#4285F4" d="M489.7 244.5L325.3 234.3l-67.7 50.6 67.7 50.5 164.4-10.2c14.8-.9 26.3-13.2 26.3-28s-11.5-27.1-26.3-28.2z" /></svg>
                <div className="leading-none">
                  <p className="text-[10px] text-gray-400 mb-1">GET IT ON</p>
                  <p className="text-[18px] font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-[14px] text-gray-500">
            © {new Date().getFullYear()} Car Rental. Design by Figma.guru
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;