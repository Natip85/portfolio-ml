// import floating1 from "../../public/images/img_1.jpeg";
// import floating2 from "../../public/images/img_2.jpeg";
// import floating3 from "../../public/images/test.png";
// import floating4 from "../../public/images/img_4.jpeg";
// import floating5 from "../../public/images/img_5.jpeg";
// import floating6 from "../../public/images/img_5.jpeg";
// import floating7 from "../../public/images/img_5.jpeg";
// import floating8 from "../../public/images/img_5.jpeg";

import FloatingFeaturedImages from "@/components/FloatingFeaturedImages";
import db from "@/db/db";
async function getFeaturedImages() {
  const allFeaturedImages = await db.featuredImages.findMany({});

  const featuredImages = allFeaturedImages.flatMap((featured) =>
    featured.images.flatMap((img) => img)
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
