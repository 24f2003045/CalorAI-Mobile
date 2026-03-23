import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://raqgwkycnszydllmtmtd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcWd3a3ljbnN6eWRsbG10bXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzM2NjcsImV4cCI6MjA4OTcwOTY2N30.P_v-Lrs5fbQhv0gOhNGUThXWtmxuAGzlqhRYc0I_auQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export const MY_USER_ID = '8521917731';