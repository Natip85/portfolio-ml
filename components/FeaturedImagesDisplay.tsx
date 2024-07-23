import { FeaturedImages, ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function FeaturedImagesDisplay({
  images,
}: {
  images: ImageType[];
}) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-fit">
        {images.map((img) => (
          <div key={img.key} className="relative size-36 ">
            <Image src={img.url} alt="Featured images" fill />
          </div>
        ))}
      </div>
      <Link
        href={"/admin/featuredImages"}
        className={buttonVariants({ variant: "outline" })}
      >
        Edit featured images
      </Link>
    </div>
  );
}
