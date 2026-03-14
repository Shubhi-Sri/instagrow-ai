import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Instagram App ID is a publishable key, safe to use client-side
const INSTAGRAM_APP_ID = "YOUR_INSTAGRAM_APP_ID";

interface InstagramAccount {
  id: string;
  instagram_user_id: string;
  username: string;
  connected_at: string;
}

export function useInstagram() {
  const [account, setAccount] = useState<InstagramAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount();
  }, []);

  async function fetchAccount() {
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
  }

  function connectInstagram() {
    const redirectUri = `${window.location.origin}/instagram/callback`;
    const scope = "instagram_business_basic,instagram_business_manage_insights";
    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  }

  return { account, loading, connectInstagram, refetch: fetchAccount };
}
