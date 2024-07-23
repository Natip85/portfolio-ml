import AddGalleryImagesForm from "@/components/AddGalleryImagesForm";
import db from "@/db/db";

export default async function GalleryImagesPage() {
  const galleryImages = await db.galleryImages.findMany();
  return (
    <div className="flex flex-col gap-10 min-h-screen p-4 md:p-12">
      <AddGalleryImagesForm images={galleryImages} />
    </div>
  );
}
