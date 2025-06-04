import { supabase } from "../api/supabase.config";
import { Database } from "../types/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) throw userError;

    return user;
  }

  static async signup(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: data.user.id,
          name,
          email,
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`,
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    return user;
  }

  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}
