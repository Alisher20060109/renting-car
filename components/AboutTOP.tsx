"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

type FaqItem = {
    id: number;
    question: string;
    answer: string;
};

const faqData: FaqItem[] = [
    {
        id: 1,
        question: "How does it works?",
        answer:
            "Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna ut at et in. Turpis aliquet cras hendrerit enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus ut integer tristique ut. Pellentesque id nibh sed nulla non nulla.",
    },
    {
        id: 2,
        question: "Can I rent a car without a credit card?",
        answer:
            "Yes, in some cases it may be possible depending on the rental policy. Please check the requirements and accepted payment methods before booking.",
    },
    {
        id: 3,
        question: "What are the requirements for renting a car?",
        answer:
            "You typically need a valid driver's license, identification, and the required payment method. Some rentals may also require a minimum age.",
    },
    {
        id: 4,
        question:
            "Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?",
        answer:
            "Most rental vehicles are not allowed to be used for towing or attaching a hitch unless clearly stated by the rental provider.",
    },
    {
        id: 5,
        question:
            "Does Car Rental offer coverage products for purchase with my rental?",
        answer:
            "Yes, many car rental companies offer optional coverage products to help protect you during your rental period.",
    },
];

export default function CarRentalFaq() {
    const [openId, setOpenId] = useState<number>(1);

    const handleToggle = (id: number) => {
        setOpenId((prev) => (prev === id ? 0 : id));
    };

    return (
        <section className="w-full  py-14 px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl md:text-5xl font-bold text-black">
                    Top Car Rental Questions
                </h2>

                <div className="mt-10 space-y-4">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-gray-300 bg-white px-5 md:px-6"
                            >
                                <button
                                    onClick={() => handleToggle(item.id)}
                                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                                >
                                    <span className="text-lg md:text-[28px] font-semibold text-black leading-snug">
                                        {item.question}
                                    </span>

                                    <ChevronUp
                                        className={`h-5 w-5 shrink-0 text-black transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                            ? "grid-rows-[1fr] pb-6 opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-5xl text-sm md:text-[17px] leading-7 text-gray-500">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}