/* =========================
   TYPES
========================= */
export type Option = {
  label: string;
  value: string;
};

export type BlogPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export type BrandLogo = {
  name: string;
  src: string;
  fallbackSrc?: string;
  href: string;
  imageClassName?: string;
};

/* =========================
   FORM DATA
========================= */
export const carTypes: Option[] = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Minivan", value: "minivan" },
  { label: "Pickup", value: "pickup" },
  { label: "Cabriolet", value: "cabriolet" },
];

export const locations: Option[] = [
  { label: "Tashkent", value: "tashkent" },
  { label: "Samarkand", value: "samarkand" },
  { label: "Bukhara", value: "bukhara" },
  { label: "Khiva", value: "khiva" },
];

/* =========================
   BLOG DATA
========================= */
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How To Choose The Right Car",
    category: "News",
    date: "12 April 2024",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/how-to-choose-the-right-car",
  },
  {
    id: 2,
    title: "Which plan is right for me?",
    category: "News",
    date: "12 April 2024",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/which-plan-is-right-for-me",
  },
  {
    id: 3,
    title: "Enjoy Speed, Choice & Total Control",
    category: "News",
    date: "12 April 2024",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/enjoy-speed-choice-total-control",
  },
];

/* =========================
   BRAND LOGOS (FIXED)
========================= */
export const brandLogos: BrandLogo[] = [
  {
    name: "Toyota",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
    href: "/brands/toyota",
    imageClassName: "h-10 w-auto object-contain",
  },
  {
    name: "Ford",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
    href: "/brands/ford",
    imageClassName: "h-9 w-auto object-contain",
  },
  {
    name: "Mercedes",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    href: "/brands/mercedes",
    imageClassName: "h-9 w-auto object-contain",
  },

  /* 🔥 JEEP FIX */
  {
    name: "Jeep",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Jeep_logo.svg",
    fallbackSrc:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Jeep_logo_black.svg",
    href: "/brands/jeep",
    imageClassName: "h-8 w-auto object-contain",
  },

  {
    name: "BMW",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    href: "/brands/bmw",
    imageClassName: "h-9 w-auto object-contain",
  },
  {
    name: "Audi",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
    href: "/brands/audi",
    imageClassName: "h-9 w-auto object-contain",
  },
];