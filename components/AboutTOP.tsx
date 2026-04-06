"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const faqData = [
    {
        id: 1,
        question: "How does it works?",
        answer:
            "Imported ut tristique viverra nunc. Ultrices orci vel auctor cursus turpis nibh placerat massa. Fermentum urna at in turpis aliquet cras habitant enim condimentum. Condimentum interdum risus bibendum urna. Augue aliquet varius faucibus at integer tristique vel. Pellentesque nibh sed nulla non nulla.",
    },
    {
        id: 2,
        question: "Can I rent a car without a credit card?",
        answer:
            "Yes, in some cases it is possible. It depends on the rental company policy, your location, and the type of vehicle you choose.",
    },
    {
        id: 3,
        question: "What are the requirements for renting a car?",
        answer:
            "Usually you need a valid driver's license, identification document, minimum age requirement, and sometimes a deposit or payment card.",
    },
    {
        id: 4,
        question:
            "Does Car Rental allow me to tow with or attach a hitch to the rental vehicle?",
        answer:
            "Most rental companies do not allow towing or attaching external hitch equipment unless it is clearly stated in the rental agreement.",
    },
    {
        id: 5,
        question:
            "Does Car Rental offer coverage products for purchase with my rental?",
        answer:
            "Yes, many rental services offer optional coverage plans such as collision damage waiver, theft protection, and third-party liability coverage.",
    },
];

export default function TopCarRent() {
    const [openId, setOpenId] = useState<number | null>(1);

    const handleToggle = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className=" py-6 px-3">
            <div className="mx-auto w-full max-w-[1450px]">
                <h2 className="text-center text-[30px] font-extrabold text-black mb-4">
                    Top Car Rental Questions
                </h2>

                <div className="space-y-3">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="rounded-[10px] border border-[#cfcfcf] bg-white overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => handleToggle(item.id)}
                                    className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left"
                                >
                                    <span className="text-[14px] sm:text-[15px] font-semibold text-[#1f1f1f] leading-[1.4]">
                                        {item.question}
                                    </span>

                                    <span className="shrink-0 text-[#444]">
                                        {isOpen ? (
                                            <ChevronUp size={16} strokeWidth={2} />
                                        ) : (
                                            <ChevronDown size={16} strokeWidth={2} />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-4 text-[12px] sm:text-[13px] leading-5 text-[#666]">
                                            {item.answer}
                                        </div>
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