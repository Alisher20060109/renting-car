import type { Brand, Car, Category } from "@/app/vehicles/types";

const SUPABASE_URL = "https://ikpfkhvdwjrblaiyniru.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_SbG03902HzuTqSDtUIqsQQ_PE0BqWfA";

async function fetchCollection<T>(table: string): Promise<T[]> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${table}: ${response.status}`);
  }

  return (await response.json()) as T[];
}

export async function getVehiclesPageData(): Promise<{
  cars: Car[];
  categories: Category[];
  brands: Brand[];
}> {
  const [carsResult, categoriesResult, brandsResult] = await Promise.allSettled([
    fetchCollection<Car>("cars"),
    fetchCollection<Category>("categories"),
    fetchCollection<Brand>("brands"),
  ]);

  if (carsResult.status === "rejected") {
    console.error(carsResult.reason);
  }

  if (categoriesResult.status === "rejected") {
    console.error(categoriesResult.reason);
  }

  if (brandsResult.status === "rejected") {
    console.error(brandsResult.reason);
  }

  return {
    cars: carsResult.status === "fulfilled" ? carsResult.value : [],
    categories:
      categoriesResult.status === "fulfilled" ? categoriesResult.value : [],
    brands: brandsResult.status === "fulfilled" ? brandsResult.value : [],
  };
}
