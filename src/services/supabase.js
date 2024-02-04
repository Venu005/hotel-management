import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lyndfqfbxwbyuvmgbyar.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bmRmcWZieHdieXV2bWdieWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0MTMzNTQsImV4cCI6MjAyMTk4OTM1NH0.n5iXoJIGq0O_4mw104pkl-PXrRLnPvfYJndOUjVTyNw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
