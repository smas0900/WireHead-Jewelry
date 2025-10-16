import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_NOT_CONFIGURED: Missing Supabase environment variables. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.",
    )
  }

  // Validate URL format
  if (supabaseUrl.includes("/dashboard/project/")) {
    throw new Error(
      "Invalid NEXT_PUBLIC_SUPABASE_URL: You are using the dashboard URL instead of the API URL. " +
        "Please update your environment variable to use the format: https://[project-ref].supabase.co",
    )
  }

  client = createBrowserClient(supabaseUrl, supabaseKey)

  return client
}
