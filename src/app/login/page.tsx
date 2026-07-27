"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold text-center text-slate-800 mb-8">Staff Login</h1>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-800 text-white font-medium py-2 rounded-lg hover:bg-slate-900 transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-xs text-slate-500 space-y-1">
        <p>Demo Accounts:</p>
        <p>Admin: admin@digitalheroes.com / password123</p>
        <p>Member: member@digitalheroes.com / password123</p>
      </div>
    </div>
  );
}
