import { supabase } from "../api/supabase.config";
import { Database } from "../types/database.types";

type Evaluation = Database["public"]["Tables"]["evaluations"]["Row"];

export class CompassService {
  static async saveEvaluation(
    evaluation: Omit<Evaluation, "id" | "created_at">
  ): Promise<Evaluation> {
    const { data, error } = await supabase
      .from("evaluations")
      .insert([evaluation])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserEvaluations(userId: string): Promise<Evaluation[]> {
    const { data, error } = await supabase
      .from("evaluations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static onEvaluationsUpdate(
    userId: string,
    callback: (evaluations: Evaluation[]) => void
  ) {
    return supabase
      .channel("evaluations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "evaluations",
          filter: `user_id=eq.${userId}`,
        },
        async () => {
          const { data } = await supabase
            .from("evaluations")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
          callback(data || []);
        }
      )
      .subscribe();
  }
}
