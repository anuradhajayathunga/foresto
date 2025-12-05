// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    apiFetch<User>("/api/me/")
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
        setError("Failed to load user");
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return { user, loading, error, logout };
}
