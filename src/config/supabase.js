import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nzxleqozfjxgvowwmkoi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6wYucwXH4Ndt5D3QII-V3w_XHNvHDXR';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
