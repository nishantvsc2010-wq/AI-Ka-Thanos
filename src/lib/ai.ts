import { GoogleGenAI } from "@google/genai";

const getGeminiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (key && key !== "MY_GEMINI_API_KEY" && key !== "") return key;
  const env = (import.meta as any).env || {};
  const secretKey = env.VITE_GEMINI_API_KEY || env.Gemini_api_key || "";
  if (secretKey) return secretKey;
  
  // Fallback to the key you provided in chat
  return "AIzaSyCp2XnkQQty3xPcl07fhEpSKbUIDICXS4o";
};

const getOpenRouterKey = () => {
  const key = process.env.OPENROUTER_API_KEY;
  if (key && key !== "sk-or-v1-..." && key !== "") return key;
  const env = (import.meta as any).env || {};
  return env.VITE_OPENROUTER_API_KEY || env.Openrouter_api_key || "";
};

export const MODELS = [
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'google', color: 'neon-teal' },
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'google', color: 'neon-purple' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'openrouter', color: 'neon-green' },
  { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B', provider: 'openrouter', color: 'neon-teal' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', provider: 'openrouter', color: 'neon-purple' },
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openrouter', color: 'neon-green' },
];

let genAI: GoogleGenAI | null = null;

function getAI() {
  const key = getGeminiKey();
  if (!key || key === "MY_GEMINI_API_KEY") {
    throw new Error("Gemini API Key is missing. Please add GEMINI_API_KEY to Secrets.");
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: key });
  }
  return genAI;
}

export async function callGemini(modelId: string, prompt: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text || "No response received.";
  } catch (error) {
    console.error(`Gemini Error (${modelId}):`, error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
}

export async function callOpenRouter(modelId: string, prompt: string) {
  try {
    const key = getOpenRouterKey();
    if (!key || key === "sk-or-v1-...") {
      throw new Error("OpenRouter API Key is missing. Please add OPENROUTER_API_KEY to Secrets.");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "AI ka Thanos",
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}: Failed to fetch`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error(`OpenRouter Error (${modelId}):`, error);
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
}
