import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabase_url = process.env.SUPABASE_URL as string;
const supabase_key = process.env.SUPABASE_KEY as string;

export const supabase = createClient<Database>(supabase_url, supabase_key);
