import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./data";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={post.href}
      className="group block rounded-[22px] transition duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-[22px] bg-white shadow-sm">
        <div className="relative h-50 w-full sm:h-55 lg:h-47.5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-semibold leading-snug text-[#171717] sm:text-xl">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          {post.category} / {post.date}
        </p>
      </div>
    </Link>
  );
}