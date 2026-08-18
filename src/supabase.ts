import { createClient } from '@supabase/supabase-js';

// Retrieve keys from environmental variables (defined in AI Studio UI settings) or fallback
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isUsingCustomSupabase = !!(envUrl && envKey);

// Fallback Sandbox database credentials to allow local development / trial without custom credentials
const sandboxUrl = 'https://ufmarznzzdzjxszmmfio.supabase.co';
const sandboxKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmbWFyem56emR6anhzem1tZmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1ODc2MDAsImV4cCI6MjA5OTE2MzYwMH0.quSPKAmNT4s2NGREzzzs5t-CcANtNvD-JD_r8Y3HFg';

const cleanUrl = (url: string) => {
  return (url || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
};

const finalUrl = isUsingCustomSupabase ? cleanUrl(envUrl) : cleanUrl(sandboxUrl);
const finalToken = (isUsingCustomSupabase ? envKey : sandboxKey).trim();

export const supabase = createClient(finalUrl, finalToken, {
  auth: {
    persistSession: false
  }
});

export const activeSupabaseUrl = finalUrl;
export const isSupabaseConfigured = true;
