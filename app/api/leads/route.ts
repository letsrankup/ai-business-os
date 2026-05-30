import { NextRequest, NextResponse } from "next/server";
import { discoverLeads } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { query, industry, count } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const leads = await discoverLeads({
      query,
      industry: industry || "General",
      count: count || 6,
    });

    return NextResponse.json({ leads });
  } catch (error: any) {
    console.error("Leads API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to discover leads" },
      { status: 500 }
    );
  }
}
