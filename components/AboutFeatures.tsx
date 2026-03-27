"use client";

const features = [
    {
        title: "Variety Brands",
        desc: "Platea non auctor fermentum sollicitudin. Eget adipiscing augue sit quam natoque ornare cursus viverra odio",
    },
    {
        title: "Awesome Suport",
        desc: "Eget adipiscing augue sit quam natoque ornare cursus viverra odio. Diam quam gravida ultricies velit",
    },
    {
        title: "Maximum Freedom",
        desc: "Diam quam gravida ultricies velit duis consequat integer. Est aliquam posuere vel rhoncus massa volutpat in",
    },
    {
        title: "Flexibility On The Go",
        desc: "Vitae pretium nulla sed quam id nisl semper. Vel non in proin egestas dis. faucibus rhoncus. lacus dignissim aenean pellentesque nisl",
    },
];

const AboutFeatures = () => {
    return (
        <section className="w-full py-16 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

                {/* LEFT TEXT */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
                        Where every <br /> drive feels <br /> extraordinary
                    </h2>
                </div>

                {/* RIGHT CONTENT */}
                <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                    {features.map((item, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-black mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AboutFeatures;