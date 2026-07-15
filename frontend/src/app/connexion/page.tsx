"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function ConnexionPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");
  const [identifier, setIdentifier] = useState("");
  const [countryCode, setCountryCode] = useState("+237");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalIdentifier =
        loginMethod === "phone"
          ? `${countryCode}${identifier}`
          : identifier;

      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: finalIdentifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Identifiants incorrects");
        setLoading(false);
        return;
      }

      // Sauvegarder le token et l'utilisateur
      localStorage.setItem("code_route_token", data.accessToken);
      localStorage.setItem("code_route_user", JSON.stringify(data.user));

      toast.success(`Bienvenue ${data.user.firstName} !`);

      // Redirection selon le rôle
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else if (data.user.role === "AUTO_ECOLE") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">CR</span>
          </div>
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-gray-500 mt-1">
            Accédez à votre espace de formation
          </p>
        </div>

        {/* Toggle méthode */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              loginMethod === "phone"
                ? "bg-white shadow text-primary-600"
                : "text-gray-500"
            }`}
          >
            Téléphone
          </button>
          <button
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              loginMethod === "email"
                ? "bg-white shadow text-primary-600"
                : "text-gray-500"
            }`}
          >
            Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "phone" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone
              </label>
              <div className="flex">
                <select
                  className="px-2 py-2.5 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg text-sm text-gray-600 outline-none"
                  defaultValue="+237"
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+237">🇨🇲 +237</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+32">🇧🇪 +32</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+225">🇨🇮 +225</option>
                  <option value="+221">🇸🇳 +221</option>
                  <option value="+241">🇬🇦 +241</option>
                  <option value="+235">🇹🇩 +235</option>
                </select>
                <input
                  type="tel"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@coderoute.cm"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Se souvenir de moi</span>
            </label>
            <Link
              href="/mot-de-passe-oublie"
              className="text-primary-500 hover:text-primary-600"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            S&apos;inscrire
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
