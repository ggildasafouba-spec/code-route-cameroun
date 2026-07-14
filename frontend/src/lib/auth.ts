import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// === Types ===
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  role: "ELEVE" | "AUTO_ECOLE" | "ADMIN";
  city: string | null;
  permitCategory: string;
  avatar: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  message?: string;
  subscription?: {
    status: string;
    endDate: string;
    daysRemaining: number;
  } | null;
}

// === Token management ===
const TOKEN_KEY = "code_route_token";
const USER_KEY = "code_route_user";

export function saveAuth(data: AuthResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, data.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/connexion";
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  const user = getUser();
  return user?.role === "ADMIN";
}

// === API calls ===
export async function register(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
  role?: "ELEVE" | "AUTO_ECOLE";
  city?: string;
  permitCategory?: string;
  autoEcoleName?: string;
}): Promise<AuthResponse> {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  const authData = response.data;

  // Connexion automatique après inscription
  saveAuth(authData);

  return authData;
}

export async function login(data: {
  identifier: string; // téléphone ou email
  password: string;
}): Promise<AuthResponse> {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  const authData = response.data;

  // Sauvegarder la session
  saveAuth(authData);

  return authData;
}

export async function getMe(): Promise<User & { hasActiveSubscription: boolean }> {
  const token = getToken();
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// === Axios instance avec token automatique ===
export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
