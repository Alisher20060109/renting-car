"use client";

import { useEffect, useState } from "react";

const stats = [
    { id: 1, value: 20000, label: "Happy customers", suffix: "k+" },
    { id: 2, value: 540, label: "Count of cars", suffix: "+" },
    { id: 3, value: 25, label: "Years of experience", suffix: "+" },
];

export default function StatsSection() {
    const [counts, setCounts] = useState([0, 0, 0]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        const start = () => {
            interval = setInterval(() => {
                setCounts((prev) => {
                    let allReached = true;

                    const updated = prev.map((num, i) => {
                        const target = stats[i].value;
                        const increment = Math.ceil(target / 100);

                        if (num < target) {
                            allReached = false;
                            return Math.min(num + increment, target);
                        }

                        return num;
                    });

                    if (allReached) {
                        clearInterval(interval);

                        timeout = setTimeout(() => {
                            setCounts([0, 0, 0]);
                            start();
                        }, 10000);
                    }

                    return updated;
                });
            }, 80);
        };

        start();

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <section className="w-full py-5">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-center md:grid-cols-3">
                {stats.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-center transition duration-300 hover:scale-105"
                    >
                        <h2 className="text-4xl font-bold text-indigo-600 md:text-5xl">
                            {item.suffix === "k+"
                                ? Math.floor(counts[index] / 1000)
                                : counts[index]}
                            {item.suffix}
                        </h2>

                        <p className="mt-2 text-sm font-medium text-gray-600">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}