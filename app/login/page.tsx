"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // NextAuth의 signIn 함수를 호출합니다.
    const result = await signIn("credentials", {
      username: email, // WordPress JWT 플러그인 설정에 따라 username/email 혼용
      password: password,
      redirect: false,
    });

    if (result?.error) {
      setError("Login failed. Please check your credentials.");
    } else {
      router.push("/"); // 로그인 성공 시 메인 페이지로 이동
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-classico">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border border-zinc-200">
        <h1 className="text-2xl font-bold mb-6 uppercase tracking-tighter">Login</h1>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-[11px] font-black uppercase mb-1">Email / Username</label>
          <input
            type="text"
            className="w-full p-2 border border-zinc-300 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] font-black uppercase mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-zinc-300 focus:outline-none focus:border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 text-[13px] font-bold uppercase hover:bg-zinc-800 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}