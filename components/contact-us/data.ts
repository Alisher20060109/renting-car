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
      "https://i.pinimg.com/736x/11/ee/ec/11eeec868f528be972314d1f07ac212f.jpgdata:image/jpeg;base64,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",
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