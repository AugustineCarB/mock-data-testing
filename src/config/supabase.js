import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nzxleqozfjxgvowwmkoi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56eGxlcW96Zmp4Z3Zvd3dta29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTE1NDksImV4cCI6MjA5MDI4NzU0OX0.-JIR5zEft_sioAdT0XKae8t7brQ0k5noX64nrojdDOY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
