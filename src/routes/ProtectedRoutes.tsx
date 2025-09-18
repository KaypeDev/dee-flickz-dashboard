import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { api } from '../../convex/_generated/api';
import { useQuery } from "convex/react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
    };
    fetchUser();
  }, []);

  const isAuthorized = useQuery(
    api.users.isAuthorized,
    email ? { email } : 'skip' 
  );


  if (email === null || isAuthorized === undefined) {
    return <div>Loading...</div>;
  }


  if (!isAuthorized) {
    return <div>Access denied</div>;
  }

  return <>{children}</>;
}
