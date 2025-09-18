import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function useSupabaseAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    isLoading,
    isAuthenticated,
    fetchAccessToken: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      return session?.access_token ?? null;
    },
  };
}
