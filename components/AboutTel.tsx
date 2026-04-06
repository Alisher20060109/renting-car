"use client";

import { useMemo, useState } from "react";
import useApi from "@/utils/api";

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
    created_at: string;
};

export default function AppDownloadAndReviews() {
    const { data: users, loading, error } = useApi<User>({ url: "users" });
    const [showAll, setShowAll] = useState(false);

    const visibleUsers = useMemo(() => {
        return showAll ? users : users.slice(0, 3);
    }, [showAll, users]);

    if (loading) {
        return (
            <section className="w-full px-4 py-12 md:px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <p className="text-gray-500">Yuklanmoqda...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full px-4 py-12 md:px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <p className="text-red-500">Xatolik: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full px-4 py-8 md:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="mt-14">
                    <h3 className="text-center text-3xl font-bold text-black">
                        Reviews from our customers
                    </h3>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleUsers.map((user) => (
                            <div
                                key={user.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="px-6 pb-14 pt-6 text-center">
                                    <div className="text-4xl font-bold leading-none text-[#5b3df5]">
                                        “
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-gray-700">
                                        {user.name} bizning xizmatimizdan foydalangan mijozlardan
                                        biri. Bog‘lanish uchun: {user.email}
                                    </p>
                                </div>

                                <div className="relative bg-[#5b3df5] px-6 pb-5 pt-8 text-center text-white">
                                    <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-gray-200">
                                        <img
                                            src={user.avatar || "/images/user-placeholder.png"}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <p className="text-[10px] uppercase tracking-[1.6px] text-white/70">
                                        {user.role}
                                    </p>

                                    <h4 className="mt-1 text-sm font-semibold">{user.name}</h4>
                                    <p className="mt-1 text-xs text-white/80">{user.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {users.length > 3 && (
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={() => setShowAll((prev) => !prev)}
                                className="rounded-full bg-[#5b3df5] px-8 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#4729e6]"
                            >
                                {showAll ? "Yopish" : "Batafsil"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}