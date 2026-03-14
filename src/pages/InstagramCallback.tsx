import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function InstagramCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Connecting your Instagram account...");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Instagram connection was cancelled");
      navigate("/dashboard");
      return;
    }

    if (!code) {
      toast.error("No authorization code received");
      navigate("/dashboard");
      return;
    }

    async function exchangeCode(code: string) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error("Please log in first");
          navigate("/");
          return;
        }

        const redirectUri = `${window.location.origin}/instagram/callback`;

        setStatus("Exchanging authorization code...");

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/instagram-connect`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
            body: JSON.stringify({ code, redirect_uri: redirectUri }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to connect Instagram");
        }

        toast.success(`Connected @${data.username}! Fetched ${data.posts_fetched} posts.`);
        navigate("/dashboard");
      } catch (err) {
        console.error("Instagram callback error:", err);
        toast.error(err instanceof Error ? err.message : "Failed to connect Instagram");
        navigate("/dashboard");
      }
    }

    exchangeCode(code);
  }, [searchParams, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="font-display text-lg font-semibold text-foreground">{status}</p>
        <p className="text-sm text-muted-foreground">Please wait, this may take a moment...</p>
      </div>
    </div>
  );
}
