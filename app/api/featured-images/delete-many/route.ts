import db from "@/db/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    await db.featuredImages.deleteMany({});

    return NextResponse.json(
      {
        message: "All images deleted.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting images:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred!" },
      { status: 500 }
    );
  }
}
