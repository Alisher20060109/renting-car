import { cn } from "./utils";

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

export default function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div
      className={cn(
        "group flex cursor-pointer items-start gap-4 rounded-2xl bg-white/70 p-4",
        "transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff9f1a] text-white",
          "transition duration-300 group-hover:scale-105"
        )}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-[#151515]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{value}</p>
      </div>
    </div>
  );
}