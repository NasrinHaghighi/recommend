import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.json();

  const { usage, budget, brand } = formData;

  const prompt = `
You are a helpful assistant recommending laptops.

User preferences:
- Usage: ${usage.join(", ")}
- Budget: between $${budget[0]} and $${budget[1]}
- Preferred Brands: ${brand.join(", ")}

Return ONLY a valid JSON array of EXACTLY 10 laptops.
Each object MUST have EXACTLY these keys and types:

[
  {
    "brand": "string",
    "model": "string",
    "cpu": "string",
    "ram": "string",
    "storage": "string",
    "gpu": "string",
    "display": "string",
    "weightKg": "string (e.g., \"1.3 kg\"; if unknown, \"\")",
    "batteryHours": "string (e.g., \"10–12 h\"; if unknown, \"\")",
    "year": "string (e.g., \"2024\"; if unsure, \"\")",
    "formFactor": "string (e.g., \"Ultrabook\", \"2-in-1\", \"Workstation\")",
    "os": "string (e.g., \"Windows\", \"macOS\", \"Linux-compatible\")",
    "match": "number (0–100; how well it fits the user's usage and budget)",
    "plainSummary": "string (max 140 chars, non-technical benefits in simple language)",
    "pros": "string (2–3 short items separated by ' · ')",
    "cons": "string (1–2 short items separated by ' · ' — e.g., 'RAM soldered · Average webcam')",
    "priceAmazon": "string (range like \"$1200 - $1500\"; if unsure, use \"\")",
    "priceWorten": "string (range like \"€1300 - €1600\"; if unsure, use \"\")",
    "amazonLink": "string (Amazon SEARCH URL for brand+model, e.g., https://www.amazon.com/s?k=brand+model)",
    "wortenLink": "string (Worten SEARCH URL for brand+model, e.g., https://www.worten.pt/search?query=brand%20model)",
    "imageQuery": "string (brand+model for image search, e.g., \"HP Spectre x360 14\")",
    "reason": "string (2–3 concise technical highlights separated by ' · ', e.g., 'Great OLED · Strong i7 for coding · Quiet thermals')"
  }
]

Rules:
- Strictly match Usage and Budget. Prefer preferred brands, but include strong alternatives.
- DO NOT invent exact prices. Ranges only; if uncertain, leave price fields empty.
- Links MUST be SEARCH URLs (no product pages).
- Keep 'plainSummary' non-technical and friendly; keep 'reason' technical and concise.
- Output ONLY the JSON array. No markdown, no extra text, no code fences.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ only this
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
