type HeroBannerProps = {
  title: string;
  breadcrumb: string;
};

export default function HeroBanner({ title, breadcrumb }: HeroBannerProps) {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-black sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        <p className="mt-3 text-sm text-neutral-500 sm:text-base">
          {breadcrumb}
        </p>
      </div>
    </section>
  );
}
