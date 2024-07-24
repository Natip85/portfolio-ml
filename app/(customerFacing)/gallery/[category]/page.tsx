import ImageSlider from "@/components/ImageSlider";
import db from "@/db/db";
import Image from "next/image";

async function getCategoryImages(category: string) {
  const galleryImages = await db.galleryImages.findMany({});
  console.log("ALLIMAGES>>>>", galleryImages);
  const singleImgs = galleryImages.flatMap((img) => img.images);
  console.log("SINGLEIMAGES>>>", singleImgs);
  let filteredCategories;
  if (category === "ALL") {
    filteredCategories = singleImgs;
  } else {
    filteredCategories = singleImgs.filter((img) => img.category === category);
  }
  console.log("FILETREDCATEGORIES>>>", filteredCategories);
  const result = filteredCategories.map((img) => ({
    title: img.title,
    description: img.description,
    url: img.image.url,
  }));
  console.log("FINAL RESULT>>>", result);

  return {
    images: result,
  };
}

export default async function CategoryPage({
  params: { category },
}: {
  params: { category: string };
}) {
  console.log("PARAMS>>>", category);
  const { images } = await getCategoryImages(category);
  console.log("THESE???????", images);

  return (
    <div className="relative min-h-screen">
      <Image
        src={"https://utfs.io/f/66c2e1e7-7296-4dfa-9764-5065c8aa6a92-1j.jpeg"}
        alt="Background"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <h2 className="absolute z-20 inset-x-0 top-0 tracking-wider text-center text-2xl sm:text-4xl md:text-6xl my-10 text-white">
        {category}
      </h2>
      <div className="relative p-2 gap-6 z-20">
        <div className="w-full">
          <ImageSlider images={images} />
        </div>
      </div>
    </div>
  );
}
