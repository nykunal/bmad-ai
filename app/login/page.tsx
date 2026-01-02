"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

// Prevent static generation
export const dynamic = "force-dynamic";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function runBMAD() {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/bmad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "API request failed");
      }

      setOutput(data.output);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function signIn() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Supabase is not configured. Please set environment variables.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({ email });

      if (signInError) {
        setError(signInError.message);
      } else {
        alert("Check your email for the login link");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <input
        className="border p-2 w-full mb-4"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <button
        className="bg-black text-white px-4 py-2 mt-4 w-full disabled:opacity-50"
        onClick={signIn}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Login Link"}
      </button>

      {output && (
        <div className="mt-6 bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Output</h3>
          <pre className="whitespace-pre-wrap text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
}