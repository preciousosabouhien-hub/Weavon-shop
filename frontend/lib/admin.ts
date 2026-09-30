const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Login failed");
  if (data.user?.role !== "admin") throw new Error("This account is not an administrator.");
  localStorage.setItem("admin_token", data.access_token);
  localStorage.setItem("admin_user", JSON.stringify(data.user));
  return data.user;
}

export function adminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function adminUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("admin_user");
  return raw ? JSON.parse(raw) : null;
}

export function adminLogout() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}
