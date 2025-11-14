import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createChatSession(systemInstruction: string): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });
}

export async function* runChat(chat: Chat, prompt: string) {
    const result = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of result) {
        yield { text: chunk.text };
    }
}

async function* generateContentStream(model: string, prompt: string, config: any = {}) {
    const result = await ai.models.generateContentStream({
        model,
        contents: prompt,
        ...config,
    });

    let sources: GroundingSource[] = [];
    for await (const chunk of result) {
        const text = chunk.text;
        
        const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
            sources = groundingMetadata.groundingChunks
                .map((c: any) => c.web)
                .filter(Boolean) as GroundingSource[];
        }
        
        yield { text, sources };
    }
}

export function runFast(prompt: string) {
    // FIX: Updated model to 'gemini-flash-lite-latest' to align with the coding guidelines.
    return generateContentStream('gemini-flash-lite-latest', prompt);
}

export function runDeep(prompt: string) {
    return generateContentStream('gemini-2.5-pro', prompt, {
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        }
    });
}

export function runSearch(prompt: string) {
    return generateContentStream('gemini-2.5-flash', prompt, {
        config: {
            tools: [{ googleSearch: {} }]
        }
    });
}
