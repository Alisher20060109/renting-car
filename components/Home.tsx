
import Link from 'next/link';
import { Car, MapPin, Wallet } from 'lucide-react';
import HeroSlider from './HeroSlider';
import HeroSliderCard from './HeroSliderCard';
import Image from 'next/image';


const Home = () => {
  return (
    <main>
      <section className="relative w-full h-150 mt-2 overflow-hidden rounded-4xl">

        <HeroSlider />

        <HeroSliderCard />

      </section>
      <section className="container mx-auto  ">
        <div className="w-full py-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Link href="/availability" className="flex flex-col items-center text-center px-10 py-10 group rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#6347F9] transition-all duration-300">
              <div className="mb-5 text-gray-800 group-hover:text-[#6347F9] transition-colors duration-300">
                <MapPin size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#6347F9] transition-colors duration-300">
                Availability
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis
              </p>
            </Link>

            <Link href="/comfort" className="flex flex-col items-center text-center px-10 py-10 group rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#6347F9] transition-all duration-300">
              <div className="mb-5 text-gray-800 group-hover:text-[#6347F9] transition-colors duration-300">
                <Car size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#6347F9] transition-colors duration-300">
                Comfort
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis
              </p>
            </Link>

            <Link href="/savings" className="flex flex-col items-center text-center px-10 py-10 group rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#6347F9] transition-all duration-300">
              <div className="mb-5 text-gray-800 group-hover:text-[#6347F9] transition-colors duration-300">
                <Wallet size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#6347F9] transition-colors duration-300">
                Savings
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pretium convallis id diam sed commodo vestibulum lobortis volutpat
              </p>
            </Link>

          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-10">

          {/* Rasm bloki */}
          <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl shadow-lg aspect-square">
            <Image
              src="/images/salon.jpg"
              alt="salon"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Matn bloki */}
          <div className="w-full md:w-1/2 flex flex-col gap-8">

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Erat at semper</h3>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum...
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Urna nec vivamus risus duis arcu</h3>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Lobortis euismod imperdiet tempus</h3>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc luctus viverra nisi
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Cras nulla aliquet nam eleifend amet et</h3>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper sed integer. Quisque eleifend tincidunt vulputate libero
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
