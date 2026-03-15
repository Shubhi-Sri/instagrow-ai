import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirect_uri } = await req.json();

    if (!code || !redirect_uri) {
      return new Response(
        JSON.stringify({ error: "Missing code or redirect_uri" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const INSTAGRAM_APP_ID = Deno.env.get("INSTAGRAM_APP_ID");
    const INSTAGRAM_APP_SECRET = Deno.env.get("INSTAGRAM_APP_SECRET");

    if (!INSTAGRAM_APP_ID || !INSTAGRAM_APP_SECRET) {
      return new Response(
        JSON.stringify({ error: "Instagram credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get auth token from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the user using the anon key client
    const supabaseAuth = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 1: Exchange code for short-lived token
    const tokenParams = new URLSearchParams({
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: redirect_uri,
      code: code,
    });

    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: tokenParams,
    });

    const tokenData = await tokenResponse.json();
    console.log("Token exchange response status:", tokenResponse.status);

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Token exchange failed:", JSON.stringify(tokenData));
      return new Response(
        JSON.stringify({ error: "Failed to exchange code for token", details: tokenData }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const shortLivedToken = tokenData.access_token;
    const igUserId = tokenData.user_id;

    // Step 2: Exchange for long-lived token
    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_APP_SECRET}&access_token=${shortLivedToken}`
    );
    const longLivedData = await longLivedResponse.json();
    console.log("Long-lived token exchange status:", longLivedResponse.status);

    const accessToken = longLivedData.access_token || shortLivedToken;

    // Step 3: Get user profile
    const profileResponse = await fetch(
      `https://graph.instagram.com/v21.0/${igUserId}?fields=id,username&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();
    console.log("Profile fetch status:", profileResponse.status);

    if (!profileResponse.ok) {
      console.error("Profile fetch failed:", JSON.stringify(profileData));
      return new Response(
        JSON.stringify({ error: "Failed to fetch Instagram profile", details: profileData }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 4: Store instagram account (upsert)
    const { error: upsertError } = await supabase
      .from("instagram_accounts")
      .upsert(
        {
          user_id: user.id,
          instagram_user_id: String(igUserId),
          username: profileData.username,
          access_token: accessToken,
          connected_at: new Date().toISOString(),
        },
        { onConflict: "user_id,instagram_user_id" }
      );

    if (upsertError) {
      console.error("DB upsert error:", upsertError);
      return new Response(
        JSON.stringify({ error: "Failed to store Instagram account" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 5: Fetch last 30 posts
    const mediaResponse = await fetch(
      `https://graph.instagram.com/v21.0/${igUserId}/media?fields=id,caption,media_type,media_url,like_count,comments_count,timestamp&limit=30&access_token=${accessToken}`
    );
    const mediaData = await mediaResponse.json();
    console.log("Media fetch status:", mediaResponse.status, "Posts:", mediaData.data?.length);

    if (mediaData.data && mediaData.data.length > 0) {
      const postsToInsert = mediaData.data.map((post: any) => ({
        user_id: user.id,
        instagram_post_id: post.id,
        caption: post.caption || null,
        media_url: post.media_url || null,
        media_type: post.media_type || null,
        like_count: post.like_count || 0,
        comment_count: post.comments_count || 0,
        timestamp: post.timestamp || null,
      }));

      const { error: postsError } = await supabase
        .from("posts")
        .upsert(postsToInsert, { onConflict: "user_id,instagram_post_id" });

      if (postsError) {
        console.error("Posts insert error:", postsError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        username: profileData.username,
        posts_fetched: mediaData.data?.length || 0,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Instagram connect error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
