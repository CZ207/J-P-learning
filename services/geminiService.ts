import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendChatMessage = async (
  message: string, 
  history: { role: 'user' | 'model', parts: [{ text: string }] }[]
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `你是一个友好、热情的日语助教，专门辅导大学生陈真（Chen Zhen）备考《大学日语II》期末考试。
        你的语气要像动漫角色一样活泼鼓励人。
        请用**简体中文**回答所有问题。
        解释语法时，请针对 N4/N3 水平，简单易懂。
        如果被问到单词，请提供假名读音和中文意思。
        永远鼓励陈真同学坚持学习！`,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateIllustration = async (prompt: string): Promise<string | null> => {
  try {
    // Modified prompt for realistic style
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Generate a realistic, high-quality, photograph-style image representing the concept of: "${prompt}". No text in the image. Cinematic lighting, detailed.` }
        ]
      }
    });
    
    // Iterate through parts to find inline data
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
         return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};

export const generateExplanation = async (topic: string, type: 'grammar' | 'word'): Promise<string> => {
   try {
     const prompt = type === 'grammar' 
        ? `请用**简体中文**详细解释日语语法点 "${topic}"。内容包括：接续方式、含义、适用场景，并给出3个带有中文翻译和假名注音的例句。请使用 Markdown 格式。`
        : `请用**简体中文**解释日语单词 "${topic}"。内容包括：平假名读音、罗马音、详细中文含义、单词语境（Nuance），以及一个有趣的记忆法。请使用 Markdown 格式。`;

     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt
     });
     
     return response.text || "无法生成解释，请重试。";
   } catch (error) {
     console.error("Explanation Error:", error);
     return "AI 服务连接失败。";
   }
};

export const analyzeSelection = async (text: string): Promise<string> => {
  try {
    const prompt = `请分析以下日语文本片段：
    "${text}"
    
    请提供：
    1. 假名读音 (Furigana)
    2. 罗马音 (Romaji)
    3. 中文含义
    4. 如果包含语法点，简要说明。
    
    请用简体中文回答，Markdown格式，简洁明了。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "无法分析选中文本。";
  } catch (error) {
    return "AI 服务连接失败。";
  }
}