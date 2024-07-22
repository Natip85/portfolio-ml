import { FeaturedImages, ImageType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function FeaturedImagesDisplay({
  images,
}: {
  images: ImageType[];
}) {
  console.log("THIS>>", images);

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white text-2xl md:text-4xl">Featured images</h1>
        <Link
          href={"/admin/featuredImages"}
          className={buttonVariants({ variant: "outline" })}
        >
          Edit images
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-fit border-[5px]">
        {images.map((img) => (
          <div key={img.key} className="relative size-36 border-[5px] -m-[1px">
            <Image src={img.url} alt="Featured images" fill />
          </div>
        ))}
      </div>
    </div>
  );
}
