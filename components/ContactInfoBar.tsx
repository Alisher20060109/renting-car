"use client";

import {
    MapPin,
    Mail,
    Phone,
    Clock3,
} from "lucide-react";

const contactItems = [
    {
        id: 1,
        icon: MapPin,
        title: "Address",
        value: "Tashkent City, Uzbekistan",
        href: "https://www.google.com/maps/search/?api=1&query=Tashkent+City+Uzbekistan",
    },
    {
        id: 2,
        icon: Mail,
        title: "Email",
        value: "info@example.com",
        href: "mailto:info@example.com",
    },
    {
        id: 3,
        icon: Phone,
        title: "Phone",
        value: "+998 90 123 45 67",
        href: "tel:+998901234567",
    },
    {
        id: 4,
        icon: Clock3,
        title: "Opening hours",
        value: "Mon–Sun: 10am – 10pm",
        href: "",
    },
];

export default function ContactInfoBar() {
    return (
        <section className="w-full  py-8 px-4">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {contactItems.map((item) => {
                        const Icon = item.icon;

                        const content = (
                            <div className="flex items-center gap-4 rounded-[18px] bg-white px-5 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-[#F59E0B] text-white">
                                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[15px] font-medium text-[#444]">
                                        {item.title}
                                    </p>
                                    <p className="truncate text-[20px] font-semibold leading-tight text-[#111]">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );

                        if (!item.href) {
                            return <div key={item.id}>{content}</div>;
                        }

                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                target={item.title === "Address" ? "_blank" : undefined}
                                rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                                className="block"
                            >
                                {content}
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}