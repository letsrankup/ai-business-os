import { NextRequest, NextResponse } from "next/server";
import { generateAuditReport } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Call the updated Gemini integration function safely
    const report = await generateAuditReport(url);

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to run audit" },
      { status: 500 }
    );
  }
}
