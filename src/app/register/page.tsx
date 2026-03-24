"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (error) {
      console.log("erreur complete", error);
    } else {
      router.push("/vote");
    }

    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Inscription</h1>
        <p className="auth-subtitle">Cree ton compte pour participer au vote</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="auth-input"
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth-button" type="submit" disabled={loading}>
            S'inscrire
          </button>
        </form>
      </div>
    </main>
  );
}
