import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/utils/UseAuthUser"

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
const { user } = useAuthUser();
user.value = session?.user || null;
});

export default function useSupabase() {
    return { supabase };
}