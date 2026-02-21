"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  function getSupabase() {
    if (!supabaseRef.current) supabaseRef.current = createClient();
    return supabaseRef.current;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = getSupabase();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Check role and redirect
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        router.push("/ai-cfo");
      } else {
        router.push("/meta-ads");
      }
    }

    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cfo-base flex items-center justify-center px-4 font-cfo">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cfo-green/20 flex items-center justify-center">
              <span className="text-cfo-green font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold text-cfo-text">
              Growth Partner <span className="text-cfo-green">Command Center</span>
            </h1>
          </div>
          <p className="text-cfo-muted text-sm">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="cfo-card p-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-cfo-muted uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cfo-base border border-cfo-border rounded-cfo-inner px-4 py-3 text-cfo-text placeholder-cfo-dim text-sm focus:outline-none focus:border-cfo-green/50 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-cfo-muted uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cfo-base border border-cfo-border rounded-cfo-inner px-4 py-3 text-cfo-text placeholder-cfo-dim text-sm focus:outline-none focus:border-cfo-green/50 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-cfo-red/10 border border-cfo-red/20 rounded-cfo-inner px-4 py-3">
                <p className="text-cfo-red text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cfo-green text-cfo-base font-semibold py-3 rounded-cfo-inner hover:bg-cfo-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <p className="text-center text-cfo-muted text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cfo-green hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
