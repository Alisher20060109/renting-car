import type { Metadata } from "next";
import VehiclesClient from "@/app/vehicles/_components/vehicles-client";
import { getVehiclesPageData } from "@/app/vehicles/data";

export const metadata: Metadata = {
  title: "Vehicles",
  description: "Browse available rental vehicles with server-rendered listings.",
};

export default async function VehiclesPage() {
  const { cars, categories, brands } = await getVehiclesPageData();

  return (
    <VehiclesClient cars={cars} categories={categories} brands={brands} />
  );
}
