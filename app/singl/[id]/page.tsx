/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Armchair,
  Bluetooth,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  ChevronDown,
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

function cardClass(extra = "") {
  return `rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] ${extra}`;
}

function softInnerCard(extra = "") {
  return `rounded-[22px] border border-slate-200 bg-slate-50 ${extra}`;
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900">
      <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-600">
            Yuklanmoqda
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Avtomobil ma&apos;lumotlari tayyorlanmoqda...
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error?: string | null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-slate-900">
      <div className="w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-violet-600">
          Single Page
        </p>
        <h1 className="mt-4 text-3xl font-black">Avtomobil topilmadi</h1>
        <p className="mt-3 text-slate-500">
          ID bo‘yicha avtomobil ma&apos;lumoti kelmadi yoki mavjud emas.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
      <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-violet-600">
        {label}
      </p>
      <h2 className="mt-2 text-[28px] font-extrabold leading-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-4 h-[3px] w-12 rounded-full bg-amber-400" />
    </div>
  );
}

function BrandLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-md">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3L4 7L12 11L20 7L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M6 10L12 13L18 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 15L12 18L18 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function RentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Ro'yxatdan o'tish:", formData);

    alert("Ro'yxatdan o'tish muvaffaqiyatli yuborildi!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      avatar: "",
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Overlay close"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-slate-900/45 backdrop-blur-[4px]"
      />

      <div className="relative z-10 w-full max-w-[540px] overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.12),transparent_35%)]" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <BrandLogo />
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                AutoRent
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              ✕
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-4xl font-black leading-tight text-slate-900">
              Hisob yaratish
            </h3>
            <p className="mt-3 text-lg text-slate-500">
              Barcha maydonlarni to‘ldiring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-slate-500">
                Ism familiya
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="h-14 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-slate-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="h-14 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-slate-500">
                Telefon
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 90 000 00 00"
                required
                className="h-14 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.08em] text-slate-500">
                Avatar URL <span className="normal-case">(ixtiyoriy)</span>
              </label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://..."
                className="h-14 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="mt-2 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-[18px] bg-amber-400 px-5 text-lg font-black text-black transition hover:brightness-105"
            >
              <span>Ro‘yxatdan o‘tish</span>
              <span>→</span>
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm font-semibold text-slate-400">yoki</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50 px-5 text-lg font-bold text-slate-800 transition hover:bg-slate-100"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.3 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6.2 7.1l6.2 5.2C39 36.9 44 31 44 24c0-1.2-.1-2.3-.4-3.5z"
              />
            </svg>
            <span>Google orqali kirish</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SinglePage() {
  const params = useParams<{ id: string | string[] }>();
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const normalizedId = normalizeId(routeId);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);

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
  const availabilityColor = car.is_available ? "bg-emerald-500" : "bg-rose-500";

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
    { icon: MapPin, label: "Joylashuv", value: locationLabel },
    {
      icon: Gauge,
      label: "Quvvat",
      value: car.horsepower != null ? `${formatNumber(car.horsepower)} HP` : "-",
    },
    { icon: Fuel, label: "Yoqilg‘i", value: textOr(car.fuel_type) },
    { icon: CarFront, label: "Drive", value: textOr(car.drive_type) },
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

  const rentalTerms = [
    {
      title: "Shartnoma va ilovalar",
      text: "Ijara vaqtida pasport yoki ID karta, haydovchilik guvohnomasi va shartnoma asosida rasmiylashtirish amalga oshiriladi.",
    },
    {
      title: "Haydovchilik guvohnomasi va yosh",
      text: "Haydovchi yoshi kamida 25 bo‘lishi tavsiya etiladi. Amaldagi haydovchilik guvohnomasi talab qilinadi.",
    },
    {
      title: "Narxlar va to‘lovlar",
      text: "Kunlik, haftalik va oylik narxlar avtomobil turiga qarab belgilanadi. Depozit va qo‘shimcha xizmatlar alohida kelishiladi.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0">
          <img
            src={activeImage}
            alt={modelName}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_34%,rgba(255,255,255,0.62)_66%,rgba(255,255,255,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.65)_72%,#ffffff_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-14 lg:pt-12">
          <div className="min-h-[82vh] flex items-end">
            <div className="w-full max-w-4xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-amber-400 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.26em] text-black">
                  Premium Cars
                </span>

                {brand?.name ? (
                  <span className="rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-sm text-slate-700 backdrop-blur-md">
                    {brand.name}
                  </span>
                ) : null}

                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-sm text-slate-700 backdrop-blur-md">
                  <span className={`h-2.5 w-2.5 rounded-full ${availabilityColor}`} />
                  <span>{availabilityText}</span>
                </div>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-violet-600">
                {locationLabel}
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                {modelName}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {description}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-md shadow-sm"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-8">
            {images.length > 1 ? (
              <div className={cardClass("p-5")}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-violet-600">
                      Galereya
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                      Banner rasmlar
                    </h2>
                  </div>

                  <p className="text-sm text-slate-500">
                    {selectedImageIndex + 1} / {images.length}
                  </p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative h-28 min-w-44 cursor-pointer overflow-hidden rounded-[18px] border transition ${selectedImageIndex === index
                          ? "border-violet-500"
                          : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <img
                        src={image}
                        alt={`${modelName} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 ${selectedImageIndex === index ? "bg-black/5" : "bg-black/20"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <section className={cardClass("p-6")}>
                <SectionTitle
                  label="Asosiy ma'lumot"
                  title="Haydash tajribasi va tavsif"
                />

                <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
                  {description}
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "24/7 yordam",
                    "Bekor qilish va qaytarish bepul",
                    "Kelishda to‘lash imkoniyati",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-500">
                        <Check size={16} />
                      </span>
                      <span className="text-sm text-slate-800 sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={cardClass("p-6")}>
                <SectionTitle label="Tezkor ko‘rish" title="Asosiy info" />

                <div className="mt-6 space-y-4">
                  <div className={softInnerCard("px-4 py-4")}>
                    <p className="text-sm text-slate-500">Holati</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {availabilityText}
                    </p>
                  </div>

                  <div className={softInnerCard("px-4 py-4")}>
                    <p className="text-sm text-slate-500">Brend</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {textOr(brand?.name, "Noma'lum")}
                    </p>
                  </div>

                  <div className={softInnerCard("px-4 py-4")}>
                    <p className="text-sm text-slate-500">Shahar</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {textOr(car.city, locationLabel)}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <section className={cardClass("p-6")}>
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
                      className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                        <Icon size={20} />
                      </div>

                      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        {item.label}
                      </p>

                      <p className="mt-2 text-base font-extrabold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={cardClass("p-6")}>
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
                      className={`rounded-[22px] border p-5 transition ${item.active
                          ? "border-violet-100 bg-violet-50"
                          : "border-slate-200 bg-slate-50"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.active
                              ? "bg-violet-100 text-violet-600"
                              : "border border-slate-200 bg-white text-slate-400"
                            }`}
                        >
                          <Icon size={20} />
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${item.active
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-slate-200 text-slate-500"
                            }`}
                        >
                          {item.active ? "Mavjud" : "Yo‘q"}
                        </span>
                      </div>

                      <p className="mt-4 text-lg font-extrabold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={cardClass("p-6")}>
              <SectionTitle label="Ijara shartlari" title="Asosiy talablar" />

              <div className="mt-8 space-y-4">
                {rentalTerms.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={item.title}
                      className="overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full cursor-pointer items-center justify-between px-5 py-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-extrabold text-amber-500">
                            {index + 1}.
                          </span>
                          <span className="text-base font-semibold text-slate-900">
                            {item.title}
                          </span>
                        </div>

                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {isOpen ? (
                        <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-sm leading-6 text-slate-600">
                          {item.text}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className={cardClass("p-6")}>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
                Ijara paketi
              </p>

              <div className="mt-4 flex items-end gap-2">
                <h2 className="text-4xl font-extrabold text-violet-600 sm:text-5xl">
                  {car.price_per_day != null ? formatNumber(car.price_per_day) : "-"}
                </h2>
                <span className="pb-2 text-sm text-slate-500 sm:text-base">
                  so‘m / kun
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Haftalik: {formatNumber(car.price_per_week)} so‘m · Oylik:{" "}
                {formatNumber(car.price_per_month)} so‘m
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50">
                {[
                  ["Eshiklar", car.doors != null ? String(car.doors) : "-"],
                  ["O‘rindiqlar", car.seats != null ? String(car.seats) : "-"],
                  ["Uzatma", textOr(car.transmission)],
                  ["Yoqilg‘i", textOr(car.fuel_type)],
                  ["Min. yosh", "25"],
                ].map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between px-4 py-3 ${i !== 4 ? "border-b border-slate-200" : ""
                      }`}
                  >
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsRentModalOpen(true)}
                className="mt-6 w-full cursor-pointer rounded-[18px] bg-amber-400 px-5 py-4 text-base font-extrabold text-black transition hover:brightness-105"
              >
                Ijaraga olish
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600">
                <span className={`h-2.5 w-2.5 rounded-full ${availabilityColor}`} />
                <span>{availabilityText}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Dvigatel
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {textOr(car.engine)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Yoqilg‘i
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {textOr(car.fuel_type)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Quvvat
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {car.horsepower != null ? `${formatNumber(car.horsepower)} HP` : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Yurgani
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {car.mileage != null ? `${formatNumber(car.mileage)} km` : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Drive
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {textOr(car.drive_type)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Min. ijara
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {car.min_rent_days != null ? `${car.min_rent_days} kun` : "-"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                    <TimerReset size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Bron uchun talablar</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
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

      <RentModal
        open={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
      />
    </div>
  );
}