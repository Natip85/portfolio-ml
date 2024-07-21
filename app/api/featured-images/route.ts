import db from "@/db/db";
import { NextResponse } from "next/server";
import * as z from "zod";
const addFeaturedImagesSchema = z.object({
  images: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
      url: z.string(),
      size: z.number(),
      serverData: z.object({
        uploadedBy: z.string(),
      }),
    })
  ),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { images } = addFeaturedImagesSchema.parse(body);

    const existingFeaturedImages = await db.featuredImages.findMany();

    let featuredImages;
    if (existingFeaturedImages.length === 0) {
      featuredImages = await db.featuredImages.create({
        data: {
          images,
        },
      });
    } else {
      featuredImages = await db.featuredImages.updateMany({
        data: {
          images,
        },
      });
    }
    return NextResponse.json(
      {
        images: featuredImages,
        message: "Featured images uploaded successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred!" },
        { status: 500 }
      );
    }
  }
}
