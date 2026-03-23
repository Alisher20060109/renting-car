import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="relative min-h-65 overflow-hidden rounded-3xl border border-dashed border-[#2f80ed]/70 sm:min-h-80 lg:min-h-105 lg:rounded-[30px]">
      <Image
        src="https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1400&auto=format&fit=crop"
        alt="Rental car"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-black/20" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-lg">
          <span className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md sm:mb-4 sm:px-4 sm:py-1.5 sm:text-xs">
            Fast booking • Premium support • Best prices
          </span>

          <h3 className="text-xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Rent the perfect car for your next trip
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/85 sm:mt-3 sm:text-base">
            Easy booking, flexible return options and trusted service designed
            for comfort, speed and total control.
          </p>
        </div>
      </div>
    </div>
  );
}