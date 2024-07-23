import { ImageType } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export default function GalleryImagesDisplay({
  images,
}: {
  images: ImageType[];
}) {
  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-fit h-[19rem] overflow-y-auto">
        {images.map((img) => (
          <div key={img.key} className="relative size-36 ">
            <Image src={img.url} alt="Featured images" fill />
          </div>
        ))}
      </div>
      <Link
        href={"/admin/galleryImages"}
        className={buttonVariants({ variant: "outline" })}
      >
        Edit gallery images
      </Link>
    </div>
  );
}
