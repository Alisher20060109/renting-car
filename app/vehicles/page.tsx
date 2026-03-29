"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import useApi from "@/utils/api"
import {
  LucideFuel,
  SlidersVertical,
  Snowflake,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"

type Car = {
  id: string
  brand_id: string
  category_id: string
  model: string
  transmission: string
  fuel_type: string
  air_conditioning: boolean
  price_per_day: number
  images: string[]
  is_available: boolean
}

type Category = {
  id: string
  name: string
  image: string
}

type Brand = {
  id: string
  name: string
  logo: string
}

// ─────────────────────────────────────────────
// HERO BANNER SWIPER
// ─────────────────────────────────────────────
function HeroBanner({ cars }: { cars: Car[] }) {
  const bannerCars = cars.filter((c) => c.images?.[0]).slice(0, 8)
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (fading || bannerCars.length === 0) return
      setFading(true)
      setTimeout(() => {
        setCurrent((index + bannerCars.length) % bannerCars.length)
        setFading(false)
      }, 300)
    },
    [fading, bannerCars.length]
  )

  useEffect(() => {
    if (bannerCars.length === 0) return
    const timer = setInterval(() => goTo(current + 1), 4500)
    return () => clearInterval(timer)
  }, [current, goTo, bannerCars.length])

  const activeCar = bannerCars[current]

  if (bannerCars.length === 0) {
    return (
      <div className="w-full h-[420px] bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Select a vehicle group</h1>
      </div>
    )
  }

  return (
    <section className="relative w-full h-[420px] md:h-[500px] overflow-hidden bg-gray-950">
      {/* Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <Image
          src={activeCar.images[0]}
          alt={activeCar.model}
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
          Premium Car Rental
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Select a vehicle group
        </h1>
        <p className="text-gray-300 text-base mb-6">
          Find the perfect car for your journey
        </p>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
            <p className="text-white font-bold">{activeCar.model}</p>
            <p className="text-indigo-300 text-sm">from ${activeCar.price_per_day}/day</p>
          </div>
          <Link
            href={`/singl/${activeCar.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Arrows */}
      {bannerCars.length > 1 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {bannerCars.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerCars.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${idx === current ? "bg-indigo-400 w-6 h-2" : "bg-white/40 w-2 h-2"
                }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip — bottom right */}
      {bannerCars.length > 1 && (
        <div className="absolute bottom-4 right-6 z-20 hidden md:flex gap-2">
          {bannerCars.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => goTo(idx)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${idx === current
                  ? "border-indigo-400 opacity-100 scale-110"
                  : "border-white/20 opacity-50 hover:opacity-80"
                }`}
            >
              <Image
                src={car.images[0]}
                alt={car.model}
                width={60}
                height={40}
                unoptimized
                className="object-cover w-[60px] h-[40px]"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────────
// FILTER PANEL
// ─────────────────────────────────────────────
function FilterPanel({
  brands,
  selectedBrands,
  toggleBrand,
  priceRange,
  setPriceRange,
  maxPrice,
  sortBy,
  setSortBy,
  resetFilters,
}: {
  brands: Brand[]
  selectedBrands: string[]
  toggleBrand: (id: string) => void
  priceRange: [number, number]
  setPriceRange: (v: [number, number]) => void
  maxPrice: number
  sortBy: string
  setSortBy: (v: string) => void
  resetFilters: () => void
}) {
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [sortOpen, setSortOpen] = useState(true)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5 sticky top-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-indigo-600 hover:underline font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Sort */}
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
        >
          Sort by
          {sortOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {sortOpen && (
          <div className="space-y-2">
            {[
              { value: "default", label: "Default" },
              { value: "price_asc", label: "Price: Low → High" },
              { value: "price_desc", label: "Price: High → Low" },
              { value: "name_asc", label: "Name A–Z" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={sortBy === opt.value}
                  onChange={() => setSortBy(opt.value)}
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-600">{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
        >
          Price per day
          {priceOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {priceOpen && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 1), priceRange[1]])
              }
              className="w-full accent-indigo-600"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 1)])
              }
              className="w-full accent-indigo-600"
            />
          </div>
        )}
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setBrandsOpen(!brandsOpen)}
            className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
          >
            Brand
            {brandsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          {brandsOpen && (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                    className="accent-indigo-600 rounded"
                  />
                  {brand.logo && (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={24}
                      height={16}
                      unoptimized
                      className="object-contain grayscale group-hover:grayscale-0 transition"
                    />
                  )}
                  <span className="text-sm text-gray-600">{brand.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function VehiclesPage() {
  const { data: cars } = useApi<Car>({ url: "cars" })
  const { data: categories } = useApi<Category>({ url: "categories" })
  const { data: brands } = useApi<Brand>({ url: "brands" })

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999])
  const [sortBy, setSortBy] = useState<string>("default")
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const maxPrice = useMemo(() => {
    if (!cars?.length) return 9999
    return Math.max(...cars.map((c) => c.price_per_day))
  }, [cars])

  useEffect(() => {
    if (cars?.length) setPriceRange([0, Math.max(...cars.map((c) => c.price_per_day))])
  }, [cars])

  const filteredCars = useMemo(() => {
    let result = [...(cars || [])]
    if (activeCategory !== "all") result = result.filter((c) => c.category_id === activeCategory)
    if (selectedBrands.length > 0) result = result.filter((c) => selectedBrands.includes(c.brand_id))
    result = result.filter((c) => c.price_per_day >= priceRange[0] && c.price_per_day <= priceRange[1])
    if (sortBy === "price_asc") result.sort((a, b) => a.price_per_day - b.price_per_day)
    else if (sortBy === "price_desc") result.sort((a, b) => b.price_per_day - a.price_per_day)
    else if (sortBy === "name_asc") result.sort((a, b) => a.model.localeCompare(b.model))
    return result
  }, [cars, activeCategory, selectedBrands, priceRange, sortBy])

  const toggleBrand = (id: string) =>
    setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]))

  const resetFilters = () => {
    setSelectedBrands([])
    setPriceRange([0, maxPrice])
    setSortBy("default")
    setActiveCategory("all")
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── 1. HERO BANNER ── */}
      <HeroBanner cars={cars || []} />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ── 2. CATEGORY TABS ── */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${activeCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-400"
              }`}
          >
            All vehicles
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${activeCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-400"
                }`}
            >
              {cat.image && (
                <Image src={cat.image} alt={cat.name} width={20} height={20} unoptimized className="object-contain" />
              )}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          {showMobileFilter && (
            <div className="mt-3">
              <FilterPanel
                brands={brands || []}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resetFilters={resetFilters}
              />
            </div>
          )}
        </div>

        {/* ── 3. FILTER LEFT + CARDS RIGHT ── */}
        <div className="flex gap-6 items-start">

          {/* Left filter — desktop only */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterPanel
              brands={brands || []}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resetFilters={resetFilters}
            />
          </div>

          {/* Cars grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-4">{filteredCars.length} vehicles found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
              {filteredCars.map((car) => {
                const category = categories?.find((c) => c.id === car.category_id)
                return (
                  <div
                    key={car.id}
                    className="bg-white w-full h-[360px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    <div className="bg-gray-100 h-48 flex items-center justify-center p-0.5">
                      {car.images?.[0] ? (
                        <Image
                          src={car.images[0]}
                          alt={car.model}
                          width={280}
                          height={160}
                          unoptimized
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-gray-300 text-6xl">🚗</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{car.model}</h3>
                          <p className="text-sm text-gray-400">{category?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-indigo-600 font-bold text-lg">${car.price_per_day}</p>
                          <p className="text-xs text-gray-400">per day</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 my-3">
                        <span className="flex items-center gap-1">
                          <span className="text-black"><SlidersVertical className="p-0.5" /></span>
                          <span className="line-clamp-1">{car.transmission || "Automat"}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-black"><LucideFuel className="p-0.5" /></span>
                          {car.fuel_type || "PB 95"}
                        </span>
                        {car.air_conditioning && (
                          <span className="flex items-center gap-1">
                            <span className="text-black"><Snowflake className="p-0.5" /></span>
                            <span className="line-clamp-1">A/C</span>
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/singl/${car.id}`}
                        className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                )
              })}

              {filteredCars.length === 0 && (
                <div className="col-span-3 text-center py-20 text-gray-400">
                  No vehicles found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 4. BRANDS BAR ── */}
        {brands && brands.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-8 py-8">
            <div className="flex flex-wrap items-center justify-center gap-10">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-center grayscale hover:grayscale-0 transition">
                  {brand.logo ? (
                    <Image src={brand.logo} alt={brand.name} width={80} height={50} unoptimized className="object-contain" />
                  ) : (
                    <span className="text-lg font-bold text-gray-700">{brand.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}