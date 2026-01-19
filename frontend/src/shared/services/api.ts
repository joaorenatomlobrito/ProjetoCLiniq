type ApiError = {
  status: number;
  message: string;
};

const API_BASE =
  (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ||
  "http://localhost:8080";

function buildUrl(path: string) {
  if (!API_BASE || path.startsWith("http")) {
    return path;
  }
  return API_BASE + (path.startsWith("/") ? path : `/${path}`);
}

function authHeader() {
  const token = localStorage.getItem("cliniq_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data.message === "string" ? data.message : "Erro inesperado";
    throw { status: response.status, message } as ApiError;
  }
  return data as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body)
  });
  return handleResponse<T>(response);
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(buildUrl(path), { headers: { ...authHeader() } });
  return handleResponse<T>(response);
}

export async function apiPostForm<T>(path: string, formData: FormData): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: { ...authHeader() },
    body: formData
  });
  return handleResponse<T>(response);
}
