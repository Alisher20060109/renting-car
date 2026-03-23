type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm text-neutral-500">{subtitle}</p>
      ) : null}
    </div>
  );
}