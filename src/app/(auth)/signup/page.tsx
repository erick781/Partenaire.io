"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  function getSupabase() {
    if (!supabaseRef.current) supabaseRef.current = createClient();
    return supabaseRef.current;
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = getSupabase();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cfo-base flex items-center justify-center px-4 font-cfo">
        <div className="w-full max-w-[400px] text-center">
          <div className="cfo-card p-8">
            <div className="w-12 h-12 rounded-full bg-cfo-green/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-cfo-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-cfo-text mb-2">Check your email</h2>
            <p className="text-cfo-muted text-sm mb-6">
              We sent a confirmation link to <span className="text-cfo-text">{email}</span>
            </p>
            <Link
              href="/login"
              className="text-cfo-green text-sm hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
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
          <p className="text-cfo-muted text-sm">Create your account</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="cfo-card p-6 space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-cfo-muted uppercase tracking-wider mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-cfo-base border border-cfo-border rounded-cfo-inner px-4 py-3 text-cfo-text placeholder-cfo-dim text-sm focus:outline-none focus:border-cfo-green/50 transition-colors"
                placeholder="Erick David"
                required
              />
            </div>

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
                minLength={6}
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="text-center text-cfo-muted text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cfo-green hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
