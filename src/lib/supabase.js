import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing env vars — blog will not load.');
  supabase = null;
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
