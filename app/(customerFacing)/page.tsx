import FloatingFeaturedImages from "@/components/FloatingFeaturedImages";
import db from "@/db/db";
async function getFeaturedImages() {
  const allFeaturedImages = await db.featuredImages.findMany({});

  const featuredImages = allFeaturedImages.flatMap((featured) =>
    featured.images.map((img) => img)
  );

  return { featuredImages };
}
export default async function Home() {
  const { featuredImages } = await getFeaturedImages();

  return (
    <div>
      <FloatingFeaturedImages images={featuredImages} />
    </div>
  );
}
