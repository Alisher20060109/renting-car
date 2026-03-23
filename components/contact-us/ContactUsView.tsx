import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import BookingPanel from "./BookingPanel";
import HeroVisual from "./HeroVisual";
import InfoCard from "./InfoCard";
import BlogCard from "./BlogCard";
import BrandLogoCard from "./BrandLogoCard";
import SectionTitle from "./SectionTitle";
import HeroBanner from "./HeroBanner";
import { blogPosts, brandLogos } from "./data";

export default function ContactUsView() {
  return (
    <main className="min-h-screen overflow-x-hidden text-black">
      <div className="w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
        <HeroBanner title="Contact Us" breadcrumb="Home / Contact Us" />
      </div>

      <section className="mx-auto w-full max-w-444 py-10 sm:py-12 lg:py-14">
        <div className="rounded-[34px] p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
            <BookingPanel />
            <HeroVisual />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            title="Address"
            value="Oxford Ave. Cary, NC 27511"
          />
          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            value="rwfjer@yahoo.com"
          />
          <InfoCard
            icon={<Phone className="h-5 w-5" />}
            title="Phone"
            value="+537 547-6401"
          />
          <InfoCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Opening hours"
            value="Sun-Mon: 10am - 10pm"
          />
        </div>

        <section className="mt-14 sm:mt-16 lg:mt-20">
          <SectionTitle title="Latest blog posts & news" />

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[30px] bg-[#fafafa] px-4 py-5 sm:mt-12 sm:px-6 sm:py-6 lg:mt-14 lg:px-8 lg:py-7">
          <div className="grid grid-cols-2 items-center gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {brandLogos.map((logo) => (
              <BrandLogoCard key={logo.name} logo={logo} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
