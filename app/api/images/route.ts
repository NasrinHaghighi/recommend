// app/api/images/route.ts (for Next.js App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  try {
    const { keys } = await req.json(); // expecting { keys: [...] }

    if (!Array.isArray(keys)) {
      return NextResponse.json({ error: "Invalid 'keys' format" }, { status: 400 });
    }

    // Perform image searches in parallel
    const imageResults = await Promise.all(
      keys.map(async (key) => {
        const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&q=${encodeURIComponent(key)}&searchType=image&num=1&safe=active`;

        const res = await fetch(url);
        const data = await res.json();

        const imageUrl = data.items?.[0]?.link || null;

        return {
          key,
          imageUrl,
        };
      })
    );

    return NextResponse.json({ images: imageResults });
  } catch (error) {
    console.error("❌ Error in /api/images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
