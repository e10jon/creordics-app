export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          picture?: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          picture?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          picture?: string;
          created_at?: string;
        };
      };
      evaluations: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          actions: number;
          truth_alignment: number;
          meaningful_impact: number;
          transmissibility: number;
          replicability: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          actions: number;
          truth_alignment: number;
          meaningful_impact: number;
          transmissibility: number;
          replicability: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          actions?: number;
          truth_alignment?: number;
          meaningful_impact?: number;
          transmissibility?: number;
          replicability?: number;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          type: "user" | "bot";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          type: "user" | "bot";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          type?: "user" | "bot";
          created_at?: string;
        };
      };
    };
  };
}
