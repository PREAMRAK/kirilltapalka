import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykticzdutwokmgjtljgl.supabase.co'; // Ввести Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdGljemR1dHdva21nanRsamdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MzE5NDEsImV4cCI6MjAzNjEwNzk0MX0.HmMb-uFXg49CTZy4irHARIMRq-lbhWamKoHIOEE2uRc'; // Ввести Supabase Anon Key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
