
import { supabase } from '../../utils/supabaseClient';

export default function LoginButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
}