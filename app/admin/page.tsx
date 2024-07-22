import FeaturedImagesDisplay from "@/components/FeaturedImagesDisplay";
import { buttonVariants } from "@/components/ui/button";
import db from "@/db/db";
import Link from "next/link";
async function getFeaturedImages() {
  const allFeaturedImages = await db.featuredImages.findMany({});

  const featuredImages = allFeaturedImages.flatMap((featured) =>
    featured.images.flatMap((img) => img)
  );

  return { featuredImages };
}
export default async function AdminPage() {
  const { featuredImages } = await getFeaturedImages();
  console.log("PAGE IMGZ>>", featuredImages);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      {/* {!featuredImages.length ? (
        <FeaturedImagesDisplay images={featuredImages} />
      ) : (
        <Link
          href={"/admin/featuredImages"}
          className={buttonVariants({ variant: "outline" })}
        >
          Add featured images
        </Link>
      )} */}
      <FeaturedImagesDisplay images={featuredImages} />
    </div>
  );
}
