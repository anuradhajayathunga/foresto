"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiPost, User } from "../../lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await apiPost<User>("/api/register/", form);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First name" onChange={handleChange} required />
        <br />
        <input name="last_name" placeholder="Last name" onChange={handleChange} required />
        <br />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <br />
        <button type="submit" style={{ marginTop: 12 }}>Create account</button>
      </form>
    </div>
  );
}
