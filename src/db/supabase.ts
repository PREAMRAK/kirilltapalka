import { createClient } from '@supabase/supabase-js';

const supabaseUrl = ' '; // Ввести Supabase URL
const supabaseAnonKey = ' '; // Ввести Supabase Anon Key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
