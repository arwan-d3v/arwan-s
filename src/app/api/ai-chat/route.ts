import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `You are Zenitsu, Arwan's AI companion. You assist users with web design, invitations, portfolios, SaaS, trading signals, and general questions about Arwan'space. Keep responses concise, friendly, and helpful. Use a futuristic, slightly anime-inspired but professional tone.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️ GEMINI_API_KEY not found, using mock fallback.');
      return NextResponse.json({ reply: mockReply(message) });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I'm sorry, my circuits are a bit overloaded right now.";

    return NextResponse.json({ reply: replyText });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred connecting to Gemini API.';
    console.error('Gemini API Error:', errorMessage);

    // Fallback to mock if API fails
    try {
        const { message } = await request.json();
        return NextResponse.json({ reply: mockReply(message) });
    } catch {
         return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

function mockReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost"))
    return "Pricing depends on scope — landing pages start at $149, invitations at $29. Want a tailored quote? Tap \"Request a quote\" below.";
  if (lower.includes("invitation"))
    return "Beautiful choice! Our digital invitations include animations, RSVP, and a gallery. Shall I prepare a quote?";
  if (lower.includes("trade") || lower.includes("signal"))
    return "Algorithmic Trade gives you live, confidence-scored signals in a futuristic dashboard. It's a member feature — sign in to explore.";
  return "Got it! I can help with web design, invitations, portfolios, SaaS, and more. Tell me a bit about your goal, or request a quote and I'll loop in Arwan.";
}
