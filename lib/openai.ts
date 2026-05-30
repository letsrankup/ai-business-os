import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialization using your existing free Gemini API key
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// SET TO FREE GEMINI-PRO: Using standard string format compatible with older packages
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// ─── SEO Audit ───────────────────────────────────────────────────────────────
export async function generateAuditReport(url: string) {
  try {
    const prompt = `You are an expert SEO auditor. Analyze the website: ${url}

Return a JSON object with this exact structure (no markdown, pure JSON):
{
  "score": 75,
  "performance": 80,
  "seo": 72,
  "accessibility": 88,
  "summary": "Brief 2-3 sentence summary of the site's SEO health.",
  "issues": ["Issue 1", "Issue 2", "Issue 3", "Issue 4", "Issue 5"],
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3", "Recommendation 4"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"]
}

Base analysis on the URL's domain, likely industry, and general SEO best practices.`;

    const response = await model.generateContent(prompt);
    const content = response.response.text();
    
    // Clean potential markdown blocks if Gemini wraps the response
    const cleanJson = content.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleanJson || "{}");
  } catch (err: any) {
    console.error("Gemini Audit Error:", err);
    throw new Error(err.message || "Failed to generate Gemini audit report");
  }
}

// ─── Content Generation ───────────────────────────────────────────────────────
interface ContentParams {
  contentType: string;
  topic: string;
  tone: string;
  keywords: string[];
  targetAudience: string;
  wordCount?: number;
}

export async function generateContent(params: ContentParams): Promise<string> {
  try {
    const { contentType, topic, tone, keywords, targetAudience, wordCount = 500 } = params;

    const typeInstructions: Record<string, string> = {
      blog: `Write a comprehensive, SEO-optimized blog article of ~${wordCount} words with H2/H3 headers, introduction, body, and conclusion.`,
      linkedin: `Write a high-engagement LinkedIn post (150-300 words) with a hook, value-packed content, and a call-to-action. Use line breaks for readability.`,
      email: `Write a professional email campaign with Subject, Preview text, Body (introduction, value proposition, CTA), and sign-off.`,
      ad: `Write 3 variations of ad copy: one for Facebook, one for Google, one for Instagram. Each should have a headline and body.`,
      product: `Write a compelling product description (100-200 words) focused on benefits, features, and conversion.`,
      social: `Write 3 social media posts (Twitter/Instagram/Facebook) with relevant hashtags.`,
    };

    const prompt = `You are a world-class ${tone} copywriter.

Task: ${typeInstructions[contentType] || "Write high-quality content."}

Topic: ${topic}
Tone: ${tone}
Target Audience: ${targetAudience || "General audience"}
Keywords to include: ${keywords.join(", ") || "None specified"}

Write the content now:`;

    const response = await model.generateContent(prompt);
    return response.response.text() || "";
  } catch (err: any) {
    console.error("Gemini Content Error:", err);
    throw new Error(err.message || "Failed to generate content");
  }
}

// ─── Proposal Generator ───────────────────────────────────────────────────────
interface ProposalParams {
  clientName: string;
  clientBusiness?: string;
  projectType: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  yourName?: string;
  yourCompany?: string;
}

export async function generateProposal(params: ProposalParams): Promise<string> {
  try {
    const { clientName, clientBusiness, projectType, projectDescription, budget, timeline, yourName, yourCompany } = params;

    const prompt = `You are a professional business proposal writer.

Write a complete, professional project proposal with the following details:

Client: ${clientName}${clientBusiness ? ` (${clientBusiness})` : ""}
Project Type: ${projectType}
Project Description: ${projectDescription}
Budget: ${budget || "To be discussed"}
Timeline: ${timeline || "To be agreed"}
From: ${yourName || "Your Name"}, ${yourCompany || "Your Company"}

Structure the proposal with these sections:
1. Executive Summary
2. Project Understanding
3. Proposed Solution & Scope of Work
4. Timeline & Milestones
5. Investment (Pricing)
6. Why Choose Us
7. Next Steps

Make it professional, persuasive, and client-focused.`;

    const response = await model.generateContent(prompt);
    return response.response.text() || "";
  } catch (err: any) {
    console.error("Gemini Proposal Error:", err);
    throw new Error(err.message || "Failed to generate proposal");
  }
}

// ─── Lead Discovery ───────────────────────────────────────────────────────────
interface LeadsParams {
  query: string;
  industry: string;
  count: number;
}

export async function discoverLeads(params: LeadsParams) {
  try {
    const { query, industry, count } = params;

    const prompt = `You are a B2B lead research specialist.

Generate ${count} realistic potential business leads based on this criteria:
Target: ${query}
Industry: ${industry}

Return a JSON array with this exact structure (pure JSON, no markdown):
[
  {
    "name": "Full Name",
    "company": "Company Name",
    "role": "Job Title",
    "email": "email@company.com",
    "website": "https://company.com",
    "industry": "${industry}",
    "score": 85,
    "description": "Brief description of why this is a good lead"
  }
]

Generate realistic but fictional leads. Score should be 60-98.`;

    const response = await model.generateContent(prompt);
    const content = response.response.text();
    
    const cleanJson = content.replace(/```json|```/gi, "").trim();
    const parsed = JSON.parse(cleanJson || "{}");

    return Array.isArray(parsed) ? parsed : parsed.leads || [];
  } catch (err: any) {
    console.error("Gemini Leads Error:", err);
    throw new Error(err.message || "Failed to discover leads");
  }
  }
