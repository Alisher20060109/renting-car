"use client";

const reviews = [
    {
        id: 1,
        text: "Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat. In gravida neque",
        name: "Emanuel Boyle",
        role: "Kuphal LLC",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 2,
        text: "Purus consectetur varius quis urna phasellus enim mattis. Sed tincidunt tortor nunc egestas amet adipiscing ligula",
        name: "River Graves",
        role: "Oliver - Orn",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    },
    {
        id: 3,
        text: "Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna. Nisl non eget sit pellentesque tristique et",
        name: "Ryder Malone",
        role: "Hagel LLC",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    },
];

export default function AppDownloadAndReviews() {
    return (
        <section className="w-full py-12 px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
                {/* Top Banner */}
                <div className="relative overflow-hidden rounded-[22px] bg-[#5b3df5] px-6 py-8 md:px-10 md:py-10">
                    <div className="grid items-center gap-8 md:grid-cols-2">
                        {/* Phone Mockup */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative h-[540px] w-[267px] rounded-[24px] border-[4px] border-black bg-white shadow-2xl ">
                                <div className="absolute left-1/2 top-[6px] h-[10px] w-[42px] -translate-x-1/2 rounded-full bg-black" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-white">
                            <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-white/70">
                                Download our app
                            </p>

                            <h2 className="mt-1 text-3xl font-bold leading-tight md:text-4xl">
                                Download our app
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                                Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas
                                semper amet ut urna dictum ut donec. Nisi nisi morbi vel in
                                vulputate, nulla nam quis urna massa vulputate at.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <button className="rounded-md bg-black px-4 py-2 text-left text-white shadow-md transition hover:scale-105">
                                    <span className="block text-[9px] leading-none text-white/70">
                                        Download on the
                                    </span>
                                    <span className="block text-sm font-semibold">App Store</span>
                                </button>

                                <button className="rounded-md bg-black px-4 py-2 text-left text-white shadow-md transition hover:scale-105">
                                    <span className="block text-[9px] leading-none text-white/70">
                                        Get it on
                                    </span>
                                    <span className="block text-sm font-semibold">Google Play</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* soft background decoration */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%] bg-white/5 blur-3xl" />
                </div>

                {/* Reviews */}
                <div className="mt-14">
                    <h3 className="text-center text-3xl font-bold text-black">
                        Reviews from our customers
                    </h3>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="px-6 pb-14 pt-6 text-center">
                                    <div className="text-4xl font-bold leading-none text-[#5b3df5]">
                                        “
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-gray-700">
                                        {review.text}
                                    </p>
                                </div>

                                <div className="relative bg-[#5b3df5] px-6 pb-5 pt-8 text-center text-white">
                                    <div className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-gray-200">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <p className="text-[10px] uppercase tracking-[1.6px] text-white/70">
                                        {review.role}
                                    </p>
                                    <h4 className="mt-1 text-sm font-semibold">{review.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}