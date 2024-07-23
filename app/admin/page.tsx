import FeaturedImagesDisplay from "@/components/FeaturedImagesDisplay";
import GalleryImagesDisplay from "@/components/GalleryImagesDisplay";
import db from "@/db/db";

async function getFeaturedImages() {
  const allFeaturedImages = await db.featuredImages.findMany();
  const featuredImages = allFeaturedImages.flatMap((featured) =>
    featured.images.flatMap((img) => img)
  );
  return { featuredImages };
}

async function getGalleryImages() {
  const allGalleryImages = await db.galleryImages.findMany({});

  const galleryImages = allGalleryImages.flatMap((gallery) =>
    gallery.images.map((img) => img.image)
  );

  return { galleryImages };
}

export default async function AdminPage() {
  const [{ featuredImages }, { galleryImages }] = await Promise.all([
    getFeaturedImages(),
    getGalleryImages(),
  ]);

  return (
    <div className="min-h-screen p-2 md:p-10">
      <div className="mx-auto">
        <h1 className="text-white text-2xl md:text-4xl my-10">
          Admin dashboard
        </h1>
        <div className="flex flex-col xl:flex-row gap-10">
          <FeaturedImagesDisplay images={featuredImages} />
          <GalleryImagesDisplay images={galleryImages} />
        </div>
      </div>
    </div>
  );
}
