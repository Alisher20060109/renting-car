"use client";

import Image from "next/image";
import Link from "next/link";
import type { BrandLogo } from "./data";

type BrandLogoCardProps = {
  logo: BrandLogo;
};

export default function BrandLogoCard({ logo }: BrandLogoCardProps) {
  return (
    <Link
      href={logo.href}
      title={logo.name}
      className="group flex h-14 items-center justify-center rounded-2xl transition duration-300 hover:bg-white/70 sm:h-16"
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={140}
        height={48}
        unoptimized
        className={`${logo.imageClassName ?? "h-9 w-auto object-contain"} max-w-27.5 grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0 sm:max-w-35`}
      />
    </Link>
  );
}