/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Armchair,
  Bluetooth,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  DoorOpen,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Snowflake,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
import useApi from "@/utils/api";

type IdValue = string | number;
type MediaValue = string[] | string | null | undefined;

interface Car {
  id: IdValue;
  model?: string | null;
  city?: string | null;
  description?: string | null;
  doors?: number | null;
  drive_type?: string | null;
  engine?: string | null;
  fuel_type?: string | null;
  horsepower?: number | null;
  mileage?: number | null;
  min_rent_days?: number | null;
  seats?: number | null;
  transmission?: string | null;
  year?: number | null;
  deposit?: number | null;
  price_per_day?: number | null;
  price_per_week?: number | null;
  price_per_month?: number | null;
  location?: string | null;
  images?: MediaValue;
  is_available?: boolean | null;
  air_conditioning?: boolean | null;
  bluetooth?: boolean | null;
  cruise_control?: boolean | null;
  gps?: boolean | null;
  parking_sensors?: boolean | null;
  rear_camera?: boolean | null;
}

interface BrandWithCars {
  id: IdValue;
  name?: string | null;
  logo?: string | null;
  brand_cars?: Car[] | null;
}

interface QuickStat {
  label: string;
  value: string;
}

interface SpecItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  active: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop";

const FALLBACK_DESCRIPTION =
  "Ushbu avtomobil kuchli dvigatel, qulay salon va premium boshqaruv hissi bilan ajralib turadi. Shahar ichida ham, uzoq safarlarda ham ishonchli va zavqli haydash tajribasini beradi.";

function normalizeId(value?: IdValue | null): string {
  return String(value ?? "");
}

function formatNumber(value?: number | null): string {
  if (value == null) return "-";
  return value.toLocaleString("uz-UZ");
}

function textOr(value?: string | null, fallback = "Ma'lumot mavjud emas"): string {
  return value?.trim() || fallback;
}

function parseMedia(value?: MediaValue): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0
    );
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) return [];

    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is string =>
              typeof item === "string" && item.trim().length > 0
          );
        }
      } catch {
        return [trimmed];
      }
    }

    return [trimmed];
  }

  return [];
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b14] px-4 text-white">
      <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#f5c518] border-t-transparent" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">
            Yuklanmoqda
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Avtomobil ma'lumotlari tayyorlanmoqda...
          </p>
        </div>
      </div>
    </div>
  );
}


function ErrorState({ error }: { error?: string | null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070b14] px-4 text-white">
      <div className="w-full max-w-2xl rounded-4xl border border-white/10 bg-[#101826] p-8 text-center shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5c518]">
          Single Page
        </p>
        <h1 className="mt-4 text-3xl font-black">Avtomobil topilmadi</h1>
        <p className="mt-3 text-slate-300">
          ID bo‘yicha avtomobil ma’lumoti kelmadi yoki mavjud emas.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SectionTitle({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5c518]">
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-[#f5c518]" />
    </div>
  );
}

export default function SinglePage() {
  const params = useParams<{ id: string | string[] }>();
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const normalizedId = normalizeId(routeId);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const { data: allBrands, loading, error } = useApi<BrandWithCars>({
    url: "brands_with_cars",
  });

  const brand = allBrands.find((item) =>
    item.brand_cars?.some((car) => normalizeId(car.id) === normalizedId)
  );

  const car = brand?.brand_cars?.find(
    (item) => normalizeId(item.id) === normalizedId
  );

  const gallery = useMemo(() => parseMedia(car?.images), [car?.images]);
  const images = gallery.length > 0 ? gallery : [FALLBACK_IMAGE];
  const activeImage = images[selectedImageIndex] ?? images[0];

  if (loading) return <LoadingState />;
  if (!car) return <ErrorState error={error} />;

  const modelName = textOr(car.model, "Tanlangan avtomobil");
  const description = textOr(car.description, FALLBACK_DESCRIPTION);
  const locationLabel = textOr(car.location || car.city, "Toshkent");
  const availabilityText = car.is_available ? "Hozir mavjud" : "Band";
  const availabilityColor = car.is_available ? "bg-emerald-400" : "bg-rose-400";

  const quickStats: QuickStat[] = [
    {
      label: "Kunlik narx",
      value:
        car.price_per_day != null
          ? `${formatNumber(car.price_per_day)} so'm`
          : "Narx ko‘rsatilmagan",
    },
    {
      label: "Dvigatel",
      value: textOr(car.engine),
    },
    {
      label: "Uzatma",
      value: textOr(car.transmission),
    },
    {
      label: "Yil",
      value: car.year != null ? String(car.year) : "-",
    },
  ];

  const specs: SpecItem[] = [
    {
      icon: MapPin,
      label: "Joylashuv",
      value: locationLabel,
    },
    {
      icon: Gauge,
      label: "Quvvat",
      value: car.horsepower != null ? `${formatNumber(car.horsepower)} HP` : "-",
    },
    {
      icon: Fuel,
      label: "Yoqilg‘i",
      value: textOr(car.fuel_type),
    },
    {
      icon: CarFront,
      label: "Drive",
      value: textOr(car.drive_type),
    },
    {
      icon: Armchair,
      label: "O‘rindiqlar",
      value: car.seats != null ? `${car.seats} ta` : "-",
    },
    {
      icon: DoorOpen,
      label: "Eshiklar",
      value: car.doors != null ? `${car.doors} ta` : "-",
    },
    {
      icon: Gauge,
      label: "Yurilgan masofa",
      value: car.mileage != null ? `${formatNumber(car.mileage)} km` : "-",
    },
    {
      icon: CalendarDays,
      label: "Min. ijara",
      value: car.min_rent_days != null ? `${car.min_rent_days} kun` : "-",
    },
  ];


  const features: FeatureItem[] = [
    {
      icon: Snowflake,
      title: "Konditsioner",
      desc: "Salon haroratini boshqarish",
      active: Boolean(car.air_conditioning),
    },
    {
      icon: Bluetooth,
      title: "Bluetooth",
      desc: "Telefon va audio ulash",
      active: Boolean(car.bluetooth),
    },
    {
      icon: ShieldCheck,
      title: "Kruiz nazorati",
      desc: "Uzoq yo‘lda qulay boshqaruv",
      active: Boolean(car.cruise_control),
    },
    {
      icon: MapPin,
      title: "GPS",
      desc: "Yo‘nalishni oson topish",
      active: Boolean(car.gps),
    },
    {
      icon: CarFront,
      title: "Parking sensor",
      desc: "Parkovkada yordam beradi",
      active: Boolean(car.parking_sensors),
    },
    {
      icon: Camera,
      title: "Orqa kamera",
      desc: "Orqaga yurishda qulay ko‘rish",
      active: Boolean(car.rear_camera),
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={activeImage}
          alt={modelName}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-r from-[#05070d]/95 via-[#05070d]/70 to-[#05070d]/25" />
        <div className="absolute inset-0 bg-linear-to-t from-[#070b14] via-[#070b14]/30 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f5c518] px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-black">
                Premium Cars
              </span>

              {brand?.name ? (
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
                  {brand.name}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 backdrop-blur">
              <span className={`h-2.5 w-2.5 rounded-full ${availabilityColor}`} />
              <span className="text-sm font-medium">{availabilityText}</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#f5c518]">
              {locationLabel}
            </p>

            <h1 className="mt-4 text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
              {modelName}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-black/35 p-4 backdrop-blur md:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_380px]">
          <div className="space-y-8">
            {images.length > 1 ? (
              <div className="rounded-[30px] border border-white/10 bg-[#101826] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5c518]">
                      Galereya
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Banner rasmlar</h2>
                  </div>

                  <p className="text-sm text-slate-300">
                    {selectedImageIndex + 1} / {images.length}
                  </p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-28 min-w-44 overflow-hidden rounded-[20px] border transition ${
                        selectedImageIndex === index
                          ? "border-[#f5c518]"
                          : "border-white/10 hover:border-white/25"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${modelName} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 ${
                          selectedImageIndex === index ? "bg-black/10" : "bg-black/35"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
              <section className="rounded-[30px] border border-white/10 bg-[#0d1320] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <SectionTitle
                  label="Umumiy ma'lumot"
                  title="Haydash tajribasi va tavsif"
                />

                <p className="mt-6 text-base leading-8 text-slate-300">
                  {description}
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "24/7 yo‘l yordami",
                    "Bekor qilish va qaytarish bepul",
                    "Kelishda to‘lash imkoniyati",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f5c518]/30 bg-[#f5c518]/10 text-[#f5c518]">
                        <Check size={16} />
                      </span>
                      <span className="text-base text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#151d2c_0%,#0f1522_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <SectionTitle label="Tezkor ko‘rish" title="Asosiy info" />

                <div className="mt-6 space-y-4">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-sm text-slate-400">Holati</p>
                    <p className="mt-1 text-xl font-bold">{availabilityText}</p>
                  </div>


                  <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-sm text-slate-400">Brend</p>
                    <p className="mt-1 text-xl font-bold">
                      {textOr(brand?.name, "Noma'lum")}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-sm text-slate-400">Shahar</p>
                    <p className="mt-1 text-xl font-bold">
                      {textOr(car.city, locationLabel)}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-[30px] border border-white/10 bg-[#101826] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <SectionTitle
                label="Texnik xususiyatlar"
                title="Barcha asosiy ko‘rsatkichlar"
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {specs.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5c518]/15 text-[#f5c518]">
                        <Icon size={20} />
                      </div>

                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                        {item.label}
                      </p>

                      <p className="mt-2 text-lg font-bold text-white">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[30px] border border-white/10 bg-[#101826] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <SectionTitle
                label="Qulayliklar"
                title="Avtomobil ichidagi imkoniyatlar"
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {features.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`rounded-3xl border p-5 transition ${
                        item.active
                          ? "border-[#f5c518]/20 bg-[#151d2c]"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                            item.active
                              ? "bg-[#f5c518]/15 text-[#f5c518]"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          <Icon size={20} />
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.active
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {item.active ? "Mavjud" : "Yo‘q"}
                        </span>
                      </div>

                      <p className="mt-4 text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>


            <section className="rounded-[30px] border border-white/10 bg-[#101826] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <SectionTitle label="Ijara shartlari" title="Asosiy talablar" />

              <div className="mt-8 space-y-4">
                {[
                  "Shartnoma va ilovalar",
                  "Haydovchilik guvohnomasi va yosh",
                  "Narxlar va to‘lovlar",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[22px] border border-white/10 bg-[#121a29] px-5 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black text-[#f5c518]">
                        {index + 1}.
                      </span>
                      <span className="text-lg font-semibold text-white">{item}</span>
                    </div>

                    <span className="text-slate-400">⌄</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,#171f2f_0%,#0f1522_100%)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5c518]">
                Ijara paketi
              </p>

              <div className="mt-4 flex items-end gap-2">
                <h2 className="text-5xl font-black text-[#f5c518]">
                  {car.price_per_day != null ? formatNumber(car.price_per_day) : "-"}
                </h2>
                <span className="pb-2 text-lg text-slate-300">so‘m / kun</span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Haftalik: {formatNumber(car.price_per_week)} so‘m · Oylik:{" "}
                {formatNumber(car.price_per_month)} so‘m
              </p>

              <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-slate-300">Eshiklar</span>
                  <span className="font-bold text-white">
                    {car.doors != null ? car.doors : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-slate-300">O‘rindiqlar</span>
                  <span className="font-bold text-white">
                    {car.seats != null ? car.seats : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-slate-300">Uzatma</span>
                  <span className="font-bold text-white">
                    {textOr(car.transmission)}
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-slate-300">Yoqilg‘i</span>
                  <span className="font-bold text-white">{textOr(car.fuel_type)}</span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-slate-300">Min. yosh</span>
                  <span className="font-bold text-white">25</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-[22px] bg-[#f5c518] px-5 py-4 text-lg font-black text-black transition hover:bg-[#ffd84d]"
              >
                Ijaraga olish
              </button>


              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>{availabilityText}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-[#0d1320] p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Dvigatel
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {textOr(car.engine)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Yoqilg‘i
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {textOr(car.fuel_type)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Quvvat
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {car.horsepower != null ? `${formatNumber(car.horsepower)} HP` : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Yurgani
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {car.mileage != null ? `${formatNumber(car.mileage)} km` : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Drive
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {textOr(car.drive_type)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Min. ijara
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    {car.min_rent_days != null ? `${car.min_rent_days} kun` : "-"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f5c518]/15 text-[#f5c518]">
                    <TimerReset size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Bron uchun talablar</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Pasport va haydovchilik guvohnomasi bilan shartnoma
                      rasmiylashtiriladi. Depozit va ijara muddati kelishuv asosida
                      tasdiqlanadi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
