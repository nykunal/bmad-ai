"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 mt-4 w-full"
        onClick={signIn}
      >
        Send Login Link
      </button>
    </div>
  );
}
