"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";
import type { Option } from "./data";

type CustomSelectProps = {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => options.find((item) => item.value === value),
    [options, value]
  );

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl",
          "border border-white/15 bg-white/10 px-5 text-left text-white",
          "backdrop-blur-md transition duration-200 hover:bg-white/15",
          "focus:outline-none focus:ring-2 focus:ring-white/30"
        )}
      >
        <span className={selected ? "text-white" : "text-white/75"}>
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-white/90 transition duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 top-[calc(100%+10px)] z-50 w-full overflow-hidden rounded-2xl",
            "border border-white/15 bg-linear-to-b from-[#7150ff] to-[#5b3df5]",
            "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          )}
        >
          <div className="py-2">
            {options.map((item) => {
              const isActive = value === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full cursor-pointer px-5 py-3 text-left text-sm text-white transition",
                    "hover:bg-white/10",
                    isActive && "bg-white/15"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}