"use client";
import Image from "next/image";
import "../../globals.css";
import ImageSlider from "@/components/ImageSlider";

export default function FeaturedPage() {
  const imageUrls = [
    "https://utfs.io/f/2fc37173-07f9-427a-b8ea-78b0c880d5e0-1g.jpg",
    "https://utfs.io/f/fc3940b1-130d-4a36-93e3-cc744d7a3ad6-1e.jpeg",
    "https://utfs.io/f/e2c0e225-b7ff-448e-99d4-22a4bf18e885-1h.jpg",
    "https://utfs.io/f/a7b65733-e5ae-4002-a272-2a1ee1b0bd12-1d.jpeg",
  ];

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
        FEATURED PIECES
      </h2>
      <div className="relative p-2 gap-6 z-20">
        <div className="w-full">
          <ImageSlider urls={imageUrls} />
        </div>
      </div>
    </div>
  );
}
