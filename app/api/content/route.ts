import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contentType, topic, tone, keywords, targetAudience, wordCount } = body;

    if (!contentType || !topic) {
      return NextResponse.json(
        { error: "contentType and topic are required" },
        { status: 400 }
      );
    }

    const content = await generateContent({
      contentType,
      topic,
      tone: tone || "professional",
      keywords: keywords || [],
      targetAudience: targetAudience || "general audience",
      wordCount: wordCount || 500,
    });

    return NextResponse.json({ content, contentType, topic });
  } catch (error: any) {
    console.error("Content API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
