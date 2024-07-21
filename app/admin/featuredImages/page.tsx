import AddFeaturedImages from "@/components/AddFeaturedImages";
import db from "@/db/db";

export default async function FeaturedImagesPage() {
  const featuredImages = await db.featuredImages.findMany();

  return (
    <div className="min-h-screen p-2 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div>
          <h2 className="text-white text-2xl md:text-4xl my-12">
            Featured images
          </h2>
        </div>
        <AddFeaturedImages featuredImages={featuredImages} />
      </div>
    </div>
  );
}
