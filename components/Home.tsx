
import HeroSlider from './HeroSlider';

import Image from 'next/image';
import BrandsSection from './BrandsSection';
import FeatureSection from './AbouFeture';



const Home = () => {

  return (
    <main className="  ">
      <section className="relative w-full h-155   overflow-hidden ">

        <HeroSlider />


      </section>
      <section className="container mx-auto  ">
        <BrandsSection />
      </section>
      <section className='container mx-auto px-5'>
       <FeatureSection />
      </section>
      <section className="container mx-auto px-5">

        <div className="relative bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl py-16   text-center text-white overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-10">
            <svg viewBox="0 0 900 300" fill="white" className="w-full max-w-4xl">
              <ellipse cx="450" cy="260" rx="380" ry="55" />
              <path d="M100 230 Q220 100 380 75 L520 75 Q680 100 800 230 Z" />
              <ellipse cx="240" cy="238" rx="65" ry="65" />
              <ellipse cx="660" cy="238" rx="65" ry="65" />
              <ellipse cx="240" cy="238" rx="35" ry="35" fill="#6c47ff" />
              <ellipse cx="660" cy="238" rx="35" ry="35" fill="#6c47ff" />
              <rect x="270" y="100" width="360" height="80" rx="10" fill="rgba(255,255,255,0.15)" />
            </svg>
          </div>



          <h2 className="relative text-3xl md:text-4xl font-bold mb-3">
            Facts In Numbers
          </h2>

          <p className="relative max-w-xl mx-auto text-sm opacity-80 mb-10">
            Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien bibendum ullamcorper in.
            Diam tincidunt tincidunt erat at semper fermentum
          </p>

          <div className="relative flex flex-wrap justify-center gap-8">

            {/* Card 1 */}
            <div className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-2xl shadow-xl w-full sm:w-[40%] lg:w-auto">
              <div className="flex items-center justify-center bg-orange-400 text-white p-3 rounded-xl w-12 h-12 shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl leading-tight">540+</h3>
                <span className="text-sm text-gray-400">Cars</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-2xl shadow-xl w-full sm:w-[45%] lg:w-auto">
              <div className="flex items-center justify-center bg-orange-400 text-white p-3 rounded-xl w-12 h-12 shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl leading-tight">20k+</h3>
                <span className="text-sm text-gray-400">Customers</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-2xl shadow-xl w-full sm:w-[45%] lg:w-auto">
              <div className="flex items-center justify-center bg-orange-400 text-white p-3 rounded-xl w-12 h-12 shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl leading-tight">25+</h3>
                <span className="text-sm text-gray-400">Years</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex items-center gap-4 bg-white text-black px-6 py-4 rounded-2xl shadow-xl w-full sm:w-[45%] lg:w-auto">
              <div className="flex items-center justify-center bg-orange-400 text-white p-3 rounded-xl w-12 h-12 shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl leading-tight">20m+</h3>
                <span className="text-sm text-gray-400">Miles</span>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className=" container mx-auto px-5">

        <div className="flex  flex-col lg:flex-row items-center justify-between gap-12 py-12 md:py-16 px-6 md:px-10 overflow-hidden ">
          {/* O'ng tomon (Telefonlar) - Endi mobil ekranlarda TEPADA chiqadi */}
          <div className="flex-1 relative h-87.5 sm:h-112.5 lg:h-125 w-full max-w-sm sm:max-w-md lg:max-w-lg order-1 lg:order-2">

            {/* Orqa fon uchun telefon */}
            <div className="absolute right-4 sm:right-10 bottom-0 w-40 sm:w-56 lg:w-64 transform translate-x-4 sm:translate-x-0" style={{ zIndex: 1 }}>
              <svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-xl opacity-90">
                <rect x="2" y="2" width="216" height="436" rx="36" fill="white" stroke="#1a1a1a" strokeWidth="6" />
                <rect x="72" y="18" width="76" height="22" rx="11" fill="#1a1a1a" />
                <rect x="10" y="50" width="200" height="378" rx="28" fill="#f3f4f6" />
              </svg>
            </div>

            {/* Oldindagi telefon */}
            <div className="absolute left-4 sm:left-10 bottom-6 w-40 sm:w-56 lg:w-64 transform -translate-x-4 sm:translate-x-0" style={{ zIndex: 2 }}>
              <svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
                <rect x="2" y="2" width="216" height="436" rx="36" fill="white" stroke="#111827" strokeWidth="6" />
                <rect x="72" y="18" width="76" height="22" rx="11" fill="#111827" />
                <rect x="10" y="50" width="200" height="378" rx="28" fill="#ffffff" />
                <rect x="30" y="80" width="100" height="12" rx="6" fill="#e5e7eb" />
                <rect x="30" y="110" width="160" height="80" rx="12" fill="#f3f4f6" />
              </svg>
            </div>

          </div>

          {/* Chap tomon (Matn va Tugmalar) - Mobil ekranda telefonning TAGIDA bo'ladi */}
          <div className="flex-1 max-w-xl text-center lg:text-left z-10 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Download <br className="hidden sm:block" /> mobile app
            </h2>

            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus
              turpis nibh placerat massa. Fermentum urna ut at et in.
            </p>

            {/* Tugmalar */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider opacity-70 leading-none">Download on the</div>
                  <div className="text-base font-semibold leading-tight">App Store</div>
                </div>
              </a>

              <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
                <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none">
                  <path d="M3.18 23.5c.3.17.64.2.96.1L15.5 12 12 8.5 3.18 23.5z" fill="#EA4335" />
                  <path d="M20.5 10.5l-2.93-1.67L14.1 12l3.47 3.47 2.94-1.68c.84-.48.84-1.81-.01-2.29z" fill="#FBBC04" />
                  <path d="M3.18.5C2.86.4 2.5.45 2.2.65 1.6 1.02 1.5 1.7 1.5 2.3V21.7c0 .6.1 1.28.7 1.65.3.2.66.25.98.15L15.5 12 3.18.5z" fill="#4285F4" />
                  <path d="M3.18.5L12 8.5l3.5-3.5L4.14.4c-.32-.1-.66-.07-.96.1z" fill="#34A853" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider opacity-70 leading-none">GET IT ON</div>
                  <div className="text-base font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default Home;
