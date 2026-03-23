"use client";

import { CalendarDays } from "lucide-react";
import { formatDate, cn } from "./utils";

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function DateInput({
  value,
  onChange,
  placeholder,
}: DateInputProps) {
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />

      <div
        className={cn(
          "flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl",
          "border border-white/15 bg-white/10 px-5 text-white backdrop-blur-md",
          "transition duration-200 hover:bg-white/15"
        )}
      >
        <span className={value ? "text-white" : "text-white/75"}>
          {value ? formatDate(value) : placeholder}
        </span>
        <CalendarDays className="h-5 w-5 text-white/90" />
      </div>
    </div>
  );
}