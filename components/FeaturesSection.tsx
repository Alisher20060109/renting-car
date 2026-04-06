import Image from "next/image";

const features = [
  {
    num: "01",
    title: "Erat at semper",
    desc: "Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum.",
  },
  {
    num: "02",
    title: "Urna nec vivamus risus duis arcu",
    desc: "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper.",
  },
  {
    num: "03",
    title: "Lobortis euismod imperdiet tempus",
    desc: "Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc luctus viverra nisi.",
  },
  {
    num: "04",
    title: "Cras nulla aliquet nam eleifend amet",
    desc: "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">

          {/* --- IMAGE BLOCK --- */}
          <div className="w-full lg:w-5/12 relative">
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden">
              <Image
                src="/images/salon.jpg"
                alt="salon"
                fill
                priority
                quality={100}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              {/* subtle overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Happy Clients</p>
                  <p
                    className="text-[26px] font-extrabold text-gray-900 tracking-[-0.04em] leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    12,400+
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-100" />
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Fleet Size</p>
                  <p
                    className="text-[26px] font-extrabold text-gray-900 tracking-[-0.04em] leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    240+
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-100" />
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Cities</p>
                  <p
                    className="text-[26px] font-extrabold text-gray-900 tracking-[-0.04em] leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    18
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- TEXT BLOCK --- */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center gap-0">

            {/* Section label */}
            <p className="text-[11px] font-semibold text-[#6347F9] uppercase tracking-widest mb-4">
              Why choose us
            </p>

            <h2
              className="text-[32px] sm:text-[38px] font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.15] mb-10"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Everything you need<br />
              <span className="text-gray-400 font-medium">for a perfect ride</span>
            </h2>

            {/* Feature list */}
            <div className="flex flex-col">
              {features.map((f, i) => (
                <div
                  key={f.num}
                  className={`flex items-start gap-5 py-6 ${i !== features.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  {/* Number */}
                  <span
                    className="text-[13px] font-bold text-gray-300 tracking-widest shrink-0 w-8 pt-0.75"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {f.num}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-[16px] font-bold text-gray-900 tracking-[-0.02em] mb-1 leading-snug"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-[14px] text-gray-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  {/* Arrow — desktop only */}
                  <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-full border border-gray-200 items-center justify-center mt-0.5 group-hover:border-[#6347F9] transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-gray-400">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;