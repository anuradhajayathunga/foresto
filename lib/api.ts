// lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  // Build headers as a simple object to avoid the HeadersInit union issue
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge any headers passed in options
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      // string[][]
      for (const [key, value] of options.headers) {
        headers[key] = value;
      }
    } else {
      // Record<string, string>
      Object.assign(headers, options.headers as Record<string, string>);
    }
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers, // headers is compatible with HeadersInit
  });

  if (!res.ok) {
    const text = await res.text();
    throw  Error(text || `Request failed with status ${res.status}`);
  }

  // Some endpoints (204) have no body; handle that gracefully if needed
  const text = await res.text();
  return (text ? JSON.parse(text) : {}) as T;
}
