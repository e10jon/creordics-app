import { supabase } from "../api/supabase.config";

interface ChatCompletionResponse {
  message: string;
  error?: string;
}

export class ChatGPTService {
  static async getCompletion(
    messages: { role: "user" | "assistant"; content: string }[],
    userId: string
  ): Promise<ChatCompletionResponse> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "chat-completion",
        {
          body: {
            messages,
            userId,
          },
        }
      );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("ChatGPT API error:", error);
      throw error;
    }
  }

  static async getPhilosophicalAnalysis(
    idea: string,
    userId: string
  ): Promise<ChatCompletionResponse> {
    try {
      const { data, error } = await supabase.functions.invoke(
        "philosophical-analysis",
        {
          body: {
            idea,
            userId,
          },
        }
      );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Philosophical analysis error:", error);
      throw error;
    }
  }
}
