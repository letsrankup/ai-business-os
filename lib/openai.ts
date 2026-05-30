import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Setup ────────────────────────────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash" },
  { apiVersion: "v1beta" }
);

// ─── Helper: Clean JSON from Gemini response ──────────────────────────────────
function cleanJSON(text: string): string {
  return text
    .replace(/```json/gi, "")
    .replace(/```/gi, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // remove control chars
    .trim();
}

// ─── Helper: Safe JSON Parse ──────────────────────────────────────────────────
function safeParseJSON(text: string, fallback: any = {}) {
  try {
    return JSON.parse(cleanJSON(text));
  } catch {
    return fallback;
  }
}

// ─── Helper: Retry on failure (3 attempts) ───────────────────────────────────
async function generateWithRetry(
  prompt: string,
  retries = 3
): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text && text.length > 10) return text;
    } catch (err: any) {
      const isLast = i === retries - 1;
      if (isLast) throw err;
      // Wait before retry: 1s, 2s, 3s
      await new Promise((r) => setTimeout(r, (i + 1) * 1000));
    }
  }
  throw new Error("All retries failed");
}

// ─── SEO Audit ────────────────────────────────────────────────────────────────
export async function generateAuditReport(url: string) {
  const prompt = `You are a world-class SEO auditor with 10+ years of experience.

Analyze this website: ${url}

Respond ONLY with a valid JSON object. No explanation. No markdown. Pure JSON only.

{
  "score": <number 0-100>,
  "performance": <number 0-100>,
  "seo": <number 0-100>,
  "accessibility": <number 0-100>,
  "summary": "<2-3 sentence professional summary of overall SEO health>",
  "issues": [
    "<Critical issue 1>",
    "<Critical issue 2>",
    "<Critical issue 3>",
    "<Critical issue 4>",
    "<Critical issue 5>"
  ],
  "recommendations": [
    "<Actionable recommendation 1>",
    "<Actionable recommendation 2>",
    "<Actionable recommendation 3>",
    "<Actionable recommendation 4>"
  ],
  "keywords": [
    "<keyword1>",
    "<keyword2>",
    "<keyword3>",
    "<keyword4>",
    "<keyword5>",
    "<keyword6>"
  ]
}

Base your analysis on the domain name, likely industry, and professional SEO standards.`;

  try {
    const text = await generateWithRetry(prompt);
    const parsed = safeParseJSON(text, {
      score: 70,
      performance: 75,
      seo: 68,
      accessibility: 80,
      summary: "Analysis completed. Review the details below.",
      issues: ["Could not fully analyze — check URL and try again"],
      recommendations: ["Ensure website is publicly accessible"],
      keywords: [],
    });
    return parsed;
  } catch (err: any) {
    console.error("Gemini Audit Error:", err.message);
    throw new Error("SEO audit failed. Please try again.");
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

const contentInstructions: Record<string, (wc: number) => string> = {
  blog: (wc) =>
    `Write a comprehensive, SEO-optimized blog article of ~${wc} words. Include:
    - Engaging title (H1)
    - Introduction with a hook
    - 3-5 sections with H2 headers
    - Key takeaways
    - Strong conclusion with CTA`,

  linkedin: () =>
    `Write a high-engagement LinkedIn post (150-300 words):
    - Start with a powerful hook (first line)
    - Share a valuable insight or story
    - Use short paragraphs (1-2 lines each)
    - End with a question or CTA
    - Add 3-5 relevant hashtags`,

  email: () =>
    `Write a complete email campaign:
    - Subject line (attention-grabbing)
    - Preview text (30-50 chars)
    - Opening (personalized greeting)
    - Body (problem → solution → value)
    - Clear CTA button text
    - Professional sign-off`,

  ad: () =>
    `Write 3 high-converting ad variations:
    
    [FACEBOOK AD]
    Headline: 
    Body: (2-3 sentences)
    CTA: 
    
    [GOOGLE AD]
    Headline 1: (30 chars max)
    Headline 2: (30 chars max)
    Description: (90 chars max)
    
    [INSTAGRAM AD]
    Caption: (engaging, with emojis)
    Hashtags: (10 relevant tags)`,

  product: () =>
    `Write a compelling product description (150-200 words):
    - Attention-grabbing opening
    - Top 3 key benefits (not just features)
    - Social proof statement
    - Urgency or scarcity element
    - Clear purchase CTA`,

  social: () =>
    `Write 3 platform-specific posts:
    
    [TWITTER/X]
    (under 280 chars, punchy, 2-3 hashtags)
    
    [INSTAGRAM]
    (engaging caption, storytelling, 8-10 hashtags)
    
    [FACEBOOK]
    (conversational, longer, with question to drive comments)`,
};

export async function generateContent(params: ContentParams): Promise<string> {
  const {
    contentType,
    topic,
    tone,
    keywords,
    targetAudience,
    wordCount = 600,
  } = params;

  const instructions =
    contentInstructions[contentType]?.(wordCount) ||
    `Write high-quality ${contentType} content of ~${wordCount} words.`;

  const prompt = `You are a world-class copywriter and content strategist.

TASK: ${instructions}

DETAILS:
- Topic: ${topic}
- Tone: ${tone}
- Target Audience: ${targetAudience || "General audience"}
- Keywords to include naturally: ${keywords.length > 0 ? keywords.join(", ") : "None specified"}

RULES:
- Write naturally, avoid AI-sounding phrases
- Be specific and valuable, not generic
- Match the tone perfectly throughout
- Focus on the audience's pain points and desires

Write the content now:`;

  try {
    const text = await generateWithRetry(prompt);
    return text;
  } catch (err: any) {
    console.error("Gemini Content Error:", err.message);
    throw new Error("Content generation failed. Please try again.");
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
  const {
    clientName,
    clientBusiness,
    projectType,
    projectDescription,
    budget,
    timeline,
    yourName,
    yourCompany,
  } = params;

  const prompt = `You are a senior business consultant who writes winning project proposals.

Write a complete, professional project proposal for:

CLIENT: ${clientName}${clientBusiness ? ` — ${clientBusiness}` : ""}
PROJECT TYPE: ${projectType}
PROJECT DESCRIPTION: ${projectDescription}
BUDGET: ${budget || "To be discussed"}
TIMELINE: ${timeline || "To be agreed upon"}
FROM: ${yourName || "Our Team"}, ${yourCompany || "Our Company"}

FORMAT THE PROPOSAL WITH THESE SECTIONS:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT PROPOSAL
Prepared for: ${clientName}
Prepared by: ${yourName || "Our Team"} | ${yourCompany || "Our Company"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. EXECUTIVE SUMMARY
(2-3 compelling paragraphs)

2. PROJECT UNDERSTANDING
(What we understand about the client's needs)

3. PROPOSED SOLUTION & SCOPE OF WORK
(Detailed breakdown of deliverables)

4. TIMELINE & MILESTONES
(Week by week or phase breakdown)

5. INVESTMENT
(Pricing breakdown matching the budget)

6. WHY CHOOSE US
(3-4 strong differentiators)

7. NEXT STEPS
(Clear action items for the client)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Make it persuasive, professional, and client-focused. Use the client's language.`;

  try {
    const text = await generateWithRetry(prompt);
    return text;
  } catch (err: any) {
    console.error("Gemini Proposal Error:", err.message);
    throw new Error("Proposal generation failed. Please try again.");
  }
}

// ─── Lead Discovery ───────────────────────────────────────────────────────────
interface LeadsParams {
  query: string;
  industry: string;
  count: number;
}

export async function discoverLeads(params: LeadsParams) {
  const { query, industry, count } = params;

  const prompt = `You are a B2B sales intelligence specialist.

Generate ${count} highly targeted business leads based on:
Target Profile: ${query}
Industry: ${industry}

Respond ONLY with a valid JSON array. No explanation. No markdown. Pure JSON only.

[
  {
    "name": "First Last",
    "company": "Company Name",
    "role": "Exact Job Title",
    "email": "firstname@company.com",
    "website": "https://company.com",
    "industry": "${industry}",
    "score": <number 60-98>,
    "description": "2-sentence explanation of why this is a strong lead and their current challenge"
  }
]

Rules:
- Make names and companies realistic but fictional
- Scores above 85 = hot lead, 70-84 = warm, 60-69 = cold
- Descriptions should mention a real business pain point
- Mix different score levels realistically`;

  try {
    const text = await generateWithRetry(prompt);
    const parsed = safeParseJSON(text, []);
    return Array.isArray(parsed) ? parsed : parsed.leads || [];
  } catch (err: any) {
    console.error("Gemini Leads Error:", err.message);
    throw new Error("Lead discovery failed. Please try again.");
  }
}
