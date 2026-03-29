"use client"

import {  useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useApi from "@/utils/api"
import { LucideFuel, SlidersVertical, Snowflake } from "lucide-react"

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

export default function VehiclesPage() {

  const { data: cars } = useApi<Car>({ url: "cars" })
  const { data: categories } = useApi<Category>({ url: "categories" })
  const { data: brands } = useApi<Brand>({ url: "brands" })

  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredCars =
    activeCategory === "all"
      ? cars
      : cars.filter((car) => car.category_id === activeCategory)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Select a vehicle group
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${activeCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-400"
              }`}
          >
            All vehicles
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${activeCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-400"
                }`}
            >
              {cat.image && (
                <Image src={cat.image} alt={cat.name} width={20} height={20}
                  unoptimized className="object-contain" />
                
              )}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCars.map((car) => {
            const category = categories.find((c) => c.id === car.category_id)
            return (
              <div key={car.id} className="bg-white w-full h-[360px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition">
                {/* Car Image */}
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
                  {/* Name & Price */}
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

                  {/* Features */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 my-3">
                    <span className="flex items-center gap-1">
                      <span className="text-black"><SlidersVertical className="p-0.5" /></span> <span className="line-clamp-1"> {car.transmission || "Automat"}</span>
                    </span> 
                    <span className="flex items-center gap-1">
                      <span className="text-black"><LucideFuel className="p-0.5" /></span> {car.fuel_type || "PB 95"}
                    </span>
                    {car.air_conditioning && (
                      <span className="flex items-center gap-1">
                        <span className="text-black"> <Snowflake className="p-0.5" /></span> <span className="line-clamp-1">Air Conditioner</span>
                      </span>
                    )}
                  </div>

                  {/* Button */}
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
        </div>

        {/* Brands */}
        {brands.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-8 py-8">
            <div className="flex flex-wrap items-center justify-center gap-10">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-center grayscale hover:grayscale-0 transition">
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