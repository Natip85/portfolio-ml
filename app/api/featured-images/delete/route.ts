import db from "@/db/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { index } = body;
    const featuredImages = await db.featuredImages.findMany();
    if (featuredImages.length > 0) {
      const updatedImages = featuredImages[0].images.filter(
        (_, i) => i !== index
      );
      await db.featuredImages.updateMany({
        data: {
          images: updatedImages,
        },
      });
    }
    return NextResponse.json(
      {
        message: "Image deleted.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred!" },
      { status: 500 }
    );
  }
}
