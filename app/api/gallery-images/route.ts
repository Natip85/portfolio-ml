import db from "@/db/db";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { images } = body;

    const existingGalleryImages = await db.galleryImages.findMany();

    let galleryImages;
    if (existingGalleryImages.length === 0) {
      galleryImages = await db.galleryImages.create({
        data: {
          images,
        },
      });
    } else {
      galleryImages = await db.galleryImages.updateMany({
        data: {
          images,
        },
      });
    }
    return NextResponse.json(
      { images: galleryImages, message: "Gallery created." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("ERRRRR>>>>>", error);

      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.log("ERROR>>>", error);

      return NextResponse.json(
        { error: "An unexpected error occurred!" },
        {
          status: 500,
        }
      );
    }
  }
}
