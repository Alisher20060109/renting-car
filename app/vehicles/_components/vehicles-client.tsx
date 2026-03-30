"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LucideFuel,
  SlidersHorizontal,
  SlidersVertical,
  Snowflake,
} from "lucide-react";
import type { Brand, Car, Category } from "@/app/vehicles/types";

function getImageList(images: Car["images"]): string[] {
  if (Array.isArray(images)) {
    return images.filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    );
  }

  if (typeof images === "string" && images.trim()) {
    try {
      const parsed = JSON.parse(images);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (image): image is string =>
            typeof image === "string" && image.trim().length > 0,
        );
      }
    } catch {
      return [images];
    }

    return [images];
  }

  return [];
}

function HeroBanner({ cars }: { cars: Car[] }) {
  const bannerCars = useMemo(
    () => cars.filter((car) => getImageList(car.images)[0]).slice(0, 8),
    [cars],
  );
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (fading || bannerCars.length === 0) return;

      setFading(true);

      window.setTimeout(() => {
        setCurrent((index + bannerCars.length) % bannerCars.length);
        setFading(false);
      }, 300);
    },
    [bannerCars.length, fading],
  );

  useEffect(() => {
    if (bannerCars.length === 0) return;

    const timer = window.setInterval(() => goTo(current + 1), 4500);
    return () => window.clearInterval(timer);
  }, [bannerCars.length, current, goTo]);

  const activeCar = bannerCars[current];

  if (!activeCar) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
        <h1 className="text-4xl font-bold text-white">
          Select a vehicle group
        </h1>
      </div>
    );
  }

  const activeImage = getImageList(activeCar.images)[0];

  return (
    <section className="relative h-[420px] w-full overflow-hidden bg-gray-950 md:h-[500px]">
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <Image
          src={activeImage}
          alt={activeCar.model}
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-8 md:px-16">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">
          Premium Car Rental
        </p>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
          Select a vehicle group
        </h1>
        <p className="mb-6 text-base text-gray-300">
          Find the perfect car for your journey
        </p>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <p className="font-bold text-white">{activeCar.model}</p>
            <p className="text-sm text-indigo-300">
              from ${activeCar.price_per_day}/day
            </p>
          </div>
          <Link
            href={`/singl/${activeCar.id}`}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {bannerCars.length > 1 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition hover:bg-black/60"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition hover:bg-black/60"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {bannerCars.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {bannerCars.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "h-2 w-6 bg-indigo-400"
                  : "h-2 w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {bannerCars.length > 1 && (
        <div className="absolute bottom-4 right-6 z-20 hidden gap-2 md:flex">
          {bannerCars.map((car, index) => {
            const image = getImageList(car.images)[0];

            if (!image) return null;

            return (
              <button
                key={car.id}
                onClick={() => goTo(index)}
                className={`overflow-hidden rounded-lg border-2 transition-all ${
                  index === current
                    ? "scale-110 border-indigo-400 opacity-100"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={image}
                  alt={car.model}
                  width={60}
                  height={40}
                  unoptimized
                  className="h-[40px] w-[60px] object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

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
  brands: Brand[];
  selectedBrands: string[];
  toggleBrand: (id: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  maxPrice: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  resetFilters: () => void;
}) {
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);

  return (
    <div className="sticky top-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-xs font-medium text-indigo-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setSortOpen((value) => !value)}
          className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-800"
        >
          Sort by
          {sortOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        {sortOpen && (
          <div className="space-y-2">
            {[
              { value: "default", label: "Default" },
              { value: "price_asc", label: "Price: Low to High" },
              { value: "price_desc", label: "Price: High to Low" },
              { value: "name_asc", label: "Name A-Z" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => setSortBy(option.value)}
                  className="accent-indigo-600"
                />
                <span className="text-sm text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setPriceOpen((value) => !value)}
          className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-800"
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
              onChange={(event) =>
                setPriceRange([
                  Math.min(Number(event.target.value), priceRange[1] - 1),
                  priceRange[1],
                ])
              }
              className="w-full accent-indigo-600"
            />
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(event) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(Number(event.target.value), priceRange[0] + 1),
                ])
              }
              className="w-full accent-indigo-600"
            />
          </div>
        )}
      </div>

      {brands.length > 0 && (
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setBrandsOpen((value) => !value)}
            className="mb-3 flex w-full items-center justify-between text-sm font-semibold text-gray-800"
          >
            Brand
            {brandsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          {brandsOpen && (
            <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="group flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleBrand(brand.id)}
                    className="rounded accent-indigo-600"
                  />
                  {brand.logo && (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={24}
                      height={16}
                      unoptimized
                      className="object-contain grayscale transition group-hover:grayscale-0"
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
  );
}

function VehicleCard({
  car,
  category,
}: {
  car: Car;
  category?: Category;
}) {
  const image = getImageList(car.images)[0];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-[250px] w-full overflow-hidden bg-gray-100 sm:h-[270px] xl:h-[240px]">
        {image ? (
          <Image
            src={image}
            alt={car.model}
            fill
            unoptimized
            className="object-cover object-center transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl text-gray-300">
            Car
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900">{car.model}</h3>
            <p className="text-sm text-gray-400">{category?.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-indigo-600">
              ${car.price_per_day}
            </p>
            <p className="text-xs text-gray-400">per day</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <span className="flex min-w-0 items-center gap-1">
            <span className="text-black">
              <SlidersVertical className="p-0.5" />
            </span>
            <span className="line-clamp-1">{car.transmission || "Automat"}</span>
          </span>
          <span className="flex min-w-0 items-center gap-1">
            <span className="text-black">
              <LucideFuel className="p-0.5" />
            </span>
            <span className="line-clamp-1">{car.fuel_type || "PB 95"}</span>
          </span>
          {car.air_conditioning && (
            <span className="flex items-center gap-1">
              <span className="text-black">
                <Snowflake className="p-0.5" />
              </span>
              <span>A/C</span>
            </span>
          )}
        </div>

        <Link
          href={`/singl/${car.id}`}
          className="mt-auto block w-full rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function VehiclesClient({
  cars,
  categories,
  brands,
}: {
  cars: Car[];
  categories: Category[];
  brands: Brand[];
}) {
  const maxPrice = useMemo(() => {
    if (!cars.length) return 9999;

    return Math.max(...cars.map((car) => car.price_per_day));
  }, [cars]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    0,
    maxPrice,
  ]);
  const [sortBy, setSortBy] = useState("default");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (activeCategory !== "all") {
      result = result.filter((car) => car.category_id === activeCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((car) => selectedBrands.includes(car.brand_id));
    }

    result = result.filter(
      (car) =>
        car.price_per_day >= priceRange[0] &&
        car.price_per_day <= priceRange[1],
    );

    if (sortBy === "price_asc") {
      result.sort((left, right) => left.price_per_day - right.price_per_day);
    } else if (sortBy === "price_desc") {
      result.sort((left, right) => right.price_per_day - left.price_per_day);
    } else if (sortBy === "name_asc") {
      result.sort((left, right) => left.model.localeCompare(right.model));
    }

    return result;
  }, [activeCategory, cars, priceRange, selectedBrands, sortBy]);

  const toggleBrand = (id: string) => {
    setSelectedBrands((current) =>
      current.includes(id)
        ? current.filter((brandId) => brandId !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setSortBy("default");
    setActiveCategory("all");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner cars={cars} />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-indigo-600 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:border-indigo-400"
            }`}
          >
            All vehicles
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-indigo-400"
              }`}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={20}
                  height={20}
                  unoptimized
                  className="object-contain"
                />
              )}
              {category.name}
            </button>
          ))}
        </div>

        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setShowMobileFilter((value) => !value)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          {showMobileFilter && (
            <div className="mt-3">
              <FilterPanel
                brands={brands}
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

        <div className="flex items-start gap-6">
          <div className="hidden w-64 shrink-0 lg:block">
            <FilterPanel
              brands={brands}
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

          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-400">
              {filteredCars.length} vehicles found
            </p>
            <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCars.map((car) => {
                const category = categories.find(
                  (item) => item.id === car.category_id,
                );

                return (
                  <VehicleCard
                    key={car.id}
                    car={car}
                    category={category}
                  />
                );
              })}

              {filteredCars.length === 0 && (
                <div className="py-20 text-center text-gray-400 sm:col-span-2 xl:col-span-3">
                  No vehicles found.
                </div>
              )}
            </div>
          </div>
        </div>

        {brands.length > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-8 py-8">
            <div className="flex flex-wrap items-center justify-center gap-10">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center grayscale transition hover:grayscale-0"
                >
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={80}
                      height={50}
                      unoptimized
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-700">
                      {brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
