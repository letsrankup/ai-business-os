import { NextRequest, NextResponse } from "next/server";
import { generateProposal } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientName,
      clientBusiness,
      projectType,
      projectDescription,
      budget,
      timeline,
      yourName,
      yourCompany,
    } = body;

    if (!clientName || !projectType || !projectDescription) {
      return NextResponse.json(
        { error: "clientName, projectType, and projectDescription are required" },
        { status: 400 }
      );
    }

    const proposal = await generateProposal({
      clientName,
      clientBusiness,
      projectType,
      projectDescription,
      budget,
      timeline,
      yourName,
      yourCompany,
    });

    return NextResponse.json({ proposal });
  } catch (error: any) {
    console.error("Proposal API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate proposal" },
      { status: 500 }
    );
  }
}
