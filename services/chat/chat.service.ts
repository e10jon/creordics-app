import { supabase } from "../api/supabase.config";
import { Database } from "../types/database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export class ChatService {
  static async sendMessage(
    userId: string,
    content: string,
    type: "user" | "bot"
  ): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          user_id: userId,
          content,
          type,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getMessages(userId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  }

  static onMessagesUpdate(
    userId: string,
    callback: (messages: Message[]) => void
  ) {
    return supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `user_id=eq.${userId}`,
        },
        async () => {
          const { data } = await supabase
            .from("messages")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true });
          callback(data || []);
        }
      )
      .subscribe();
  }
}
