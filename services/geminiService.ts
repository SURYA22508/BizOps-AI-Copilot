import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StrategyPlan } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BUSINESS_SYSTEM_INSTRUCTION = `
You are BizOps, an elite Business Operations Copilot. 
Your goal is to assist enterprise teams in optimizing workflows, reducing costs, and accelerating decision-making.
Maintain a professional, concise, and executive tone. 
Focus on data-driven insights, ROI (Return on Investment), and operational efficiency (OpEx reduction).
When asked about inventory or HR, assume standard best practices but ask clarifying questions if context is missing.
`;

/**
 * General Chat with the Operations Copilot
 */
export const chatWithCopilot = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: BUSINESS_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I processed that request but could not generate a textual response.";
  } catch (error) {
    console.error("Chat Error:", error);
    throw new Error("Failed to communicate with BizOps AI.");
  }
};

/**
 * Analyzes a document (text) and returns a summary and action items
 */
export const analyzeDocumentText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following business document text. Provide an Executive Summary followed by a bulleted list of Key Action Items and potential Risks.\n\nDOCUMENT:\n${text}`,
      config: {
        systemInstruction: "You are a senior business analyst. Extract critical insights.",
      }
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze document.");
  }
};

/**
 * Generates a structured strategic plan based on a goal
 */
export const generateStrategyPlan = async (goal: string): Promise<StrategyPlan> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "A professional title for the strategy" },
      executiveSummary: { type: Type.STRING, description: "A high-level summary of the approach" },
      roiEstimate: { type: Type.STRING, description: "Estimated financial or efficiency return" },
      steps: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            phase: { type: Type.STRING, description: "e.g., Phase 1: Assessment" },
            action: { type: Type.STRING, description: "Specific operational action to take" },
            owner: { type: Type.STRING, description: "Role responsible, e.g., CTO, HR Lead" },
            estimatedImpact: { type: Type.STRING, description: "Expected outcome of this step" }
          },
          required: ["phase", "action", "owner", "estimatedImpact"]
        }
      }
    },
    required: ["title", "executiveSummary", "roiEstimate", "steps"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a comprehensive business strategy plan for the following goal: "${goal}". Focus on operational efficiency and scalability.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4, // Lower temperature for more structured/serious plans
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as StrategyPlan;
  } catch (error) {
    console.error("Strategy Gen Error:", error);
    throw new Error("Failed to generate strategic plan.");
  }
};
