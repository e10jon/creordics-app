import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PHILOSOPHICAL_PROMPT = `Analyze the following idea from a philosophical perspective, considering:
1. Truth Alignment: How well does it align with objective truth and reality?
2. Meaningful Impact: What potential positive impact could it have on individuals and society?
3. Transmissibility: How effectively can its value be communicated to others?
4. Replicability: How easily can its benefits be reproduced and scaled?
5. Actions: What concrete actions would be needed to implement this idea?

Provide a brief analysis for each factor and suggest areas for improvement.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { idea, userId } = await req.json();

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });
    const openai = new OpenAIApi(configuration);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check rate limit
    const { data: rateLimit } = await supabaseClient
      .from("rate_limits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (rateLimit && rateLimit.count >= 50) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get analysis from OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: PHILOSOPHICAL_PROMPT },
        { role: "user", content: idea },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Update rate limit
    await supabaseClient.from("rate_limits").upsert({
      user_id: userId,
      count: (rateLimit?.count ?? 0) + 1,
      last_request: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ message: completion.data.choices[0].message?.content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
