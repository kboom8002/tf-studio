import { GoogleGenAI } from '@google/genai'

let geminiClient: GoogleGenAI | null = null

export function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.')
    }
    // gemini 3.1 pro (high) or gemini 2.5 pro etc fallback
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  }
  return geminiClient
}

export async function generateContent(systemPrompt: string, userPrompt: string, modelStr = 'gemini-2.5-pro') {
  const ai = getGeminiClient()
  return await ai.models.generateContent({
    model: modelStr,
    contents: userPrompt,
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.7, // Adjust for creativity vs stability
    }
  })
}
