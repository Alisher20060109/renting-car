import { MapPin, Mail, Phone, Facebook, Instagram, Youtube, Apple } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">

      {/* --- TOP CONTACT BAR --- */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-center">

            {/* LOGO 07 */}
            <Link href="/" className="flex items-center gap-[10px] group cursor-pointer w-fit">
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

            {/* ADDRESS */}
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gray-400 mt-[3px] shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                <p className="text-[14px] font-semibold text-gray-900 leading-tight">Oxford Ave. Cary, NC 27511</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gray-400 mt-[3px] shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <a
                  href="mailto:nwiqer@yahoo.com"
                  className="text-[14px] font-semibold text-gray-900 leading-tight hover:text-[#6347F9] transition-colors"
                >
                  nwiqer@yahoo.com
                </a>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-gray-400 mt-[3px] shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                <a
                  href="tel:+5375476401"
                  className="text-[14px] font-semibold text-gray-900 leading-tight hover:text-[#6347F9] transition-colors"
                >
                  +537 547-6401
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* DESCRIPTION + SOCIAL */}
          <div>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-8">
              Faucibus faucibus pellentesque dictum turpis. Id pellentesque
              turpis massa a id iaculis lorem vel dignissim.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-current">
                  <path d="M18.244 2H21l-6.56 7.497L22 22h-5.828l-4.563-5.96L6.4 22H3.64l7.017-8.018L2 2h5.976l4.124 5.447L18.244 2zm-1.02 18h1.527L7.145 3.896H5.506L17.224 20z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3
              className="text-[13px] font-semibold text-gray-900 mb-5 uppercase tracking-widest"
            >
              Useful links
            </h3>
            <ul className="space-y-3">
              {["About us", "Contact us", "Gallery", "Blog", "F.A.Q"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* VEHICLES */}
          <div>
            <h3
              className="text-[13px] font-semibold text-gray-900 mb-5 uppercase tracking-widest"
            >
              Vehicles
            </h3>
            <ul className="space-y-3">
              {["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-400 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* DOWNLOAD APP */}
          <div>
            <h3
              className="text-[13px] font-semibold text-gray-900 mb-5 uppercase tracking-widest"
            >
              Download App
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-900 transition-colors duration-200 group"
              >
                <Apple size={20} className="text-gray-500 group-hover:text-gray-900 transition-colors shrink-0" />
                <div className="leading-none">
                  <p className="text-[10px] text-gray-400 mb-[3px] uppercase tracking-widest">Download on the</p>
                  <p className="text-[13px] font-semibold text-gray-900 tracking-[-0.01em]">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-900 transition-colors duration-200 group"
              >
                <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0">
                  <path fill="#34A853" d="M325.3 234.3L104.6 10.1c-7.3-7.4-17.8-10-27.6-6.9l180.6 180.5 67.7 50.6z" />
                  <path fill="#FBBC04" d="M24.5 27.3C22.9 31.4 22 35.8 22 40.4v431.2c0 4.6.9 9 2.5 13.1L214.3 294 24.5 27.3z" />
                  <path fill="#EA4335" d="M257.6 328.3L76.9 508.9c9.8 3.1 20.3.5 27.6-6.9l220.7-224.2-67.6 50.5z" />
                  <path fill="#4285F4" d="M489.7 244.5L325.3 234.3l-67.7 50.6 67.7 50.5 164.4-10.2c14.8-.9 26.3-13.2 26.3-28s-11.5-27.1-26.3-28.2z" />
                </svg>
                <div className="leading-none">
                  <p className="text-[10px] text-gray-400 mb-[3px] uppercase tracking-widest">Get it on</p>
                  <p className="text-[13px] font-semibold text-gray-900 tracking-[-0.01em]">Google Play</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-between gap-4">
          <p className="text-[13px] text-gray-400">
            © {new Date().getFullYear()} Car Rental. Design by Figma.guru
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors">Privacy Policy</a>
            <span className="w-px h-3 bg-gray-200" />
            <a href="#" className="text-[13px] text-gray-400 hover:text-gray-900 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;