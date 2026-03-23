"use client";

import { useState } from "react";
import CustomSelect from "./CustomSelect";
import DateInput from "./DateInput";
import { carTypes, locations } from "./data";

export default function BookingPanel() {
  const [carType, setCarType] = useState("");
  const [rentalPlace, setRentalPlace] = useState("");
  const [returnPlace, setReturnPlace] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div className="rounded-3xl bg-linear-to-b from-[#5b3df5] via-[#6243fb] to-[#6b4dff] p-4 text-white shadow-[0_18px_50px_rgba(91,61,245,0.32)] sm:rounded-[28px] sm:p-5 lg:rounded-[30px] lg:p-6">
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl font-bold sm:text-2xl">Book your car</h3>
        <p className="mt-2 text-sm text-white/70">
          Pick vehicle, locations and dates in one place.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <CustomSelect
          placeholder="Car type"
          value={carType}
          onChange={setCarType}
          options={carTypes}
        />

        <CustomSelect
          placeholder="Place of rental"
          value={rentalPlace}
          onChange={setRentalPlace}
          options={locations}
        />

        <CustomSelect
          placeholder="Place of return"
          value={returnPlace}
          onChange={setReturnPlace}
          options={locations}
        />

        <DateInput
          value={rentalDate}
          onChange={setRentalDate}
          placeholder="Rental date"
        />

        <DateInput
          value={returnDate}
          onChange={setReturnDate}
          placeholder="Return date"
        />

        <button
          type="submit"
          className="h-12 w-full rounded-2xl bg-[#ff9f1a] text-sm font-semibold text-white transition hover:bg-[#f28d00]"
        >
          Book now
        </button>
      </form>
    </div>
  );
}