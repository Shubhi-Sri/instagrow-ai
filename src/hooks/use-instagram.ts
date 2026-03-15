import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface InstagramAccount {
  id: string;
  instagram_user_id: string;
  username: string;
  connected_at: string;
}

export function useInstagram() {
  const [account, setAccount] = useState<InstagramAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("instagram_accounts")
        .select("id, instagram_user_id, username, connected_at")
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setAccount(data);
      }
    } catch (err) {
      console.error("Error fetching Instagram account:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  async function connectInstagram() {
    // Fetch app ID from edge function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/instagram-app-id`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      }
    );
    const { app_id } = await response.json();

    if (!app_id) {
      throw new Error("Instagram App ID not configured");
    }

    // TODO: This redirect URI MUST match exactly the value configured in
    // Meta Developer Console → App Settings → Valid OAuth Redirect URIs
    const redirectUri = `${window.location.origin}/instagram/callback`;
    const scope = "instagram_business_basic,instagram_business_manage_insights";

    // Use the Facebook/Meta OAuth dialog for Instagram Graph API scopes
    // See: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
    const authUrl =
      `https://www.instagram.com/oauth/authorize` +
      `?enable_fb_login=0` +
      `&force_authentication=1` +
      `&client_id=${app_id}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  }

  return { account, loading, connectInstagram, refetch: fetchAccount };
}
