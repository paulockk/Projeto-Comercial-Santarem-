import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, PawPrint, Waves } from "lucide-react";
import toast from "react-hot-toast";

import { loginSchema, type LoginFormData } from "../../schemas/auth.schema";

import { useAuth } from "../../contexts/AuthContext";
import { AuthError } from "../../services/auth.service";
import { ROUTES } from "../../constants/routes";
import { Logo } from "../../components/ui/Logo";

const APP_VERSION = "v2.4";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  if (!isAuthLoading && isAuthenticated) {
    const from =
      (location.state as { from?: Location })?.from?.pathname ||
      ROUTES.ADMIN_DASHBOARD;

    return <Navigate to={from} replace />;
  }

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);

    try {
      await login(data.email, data.password, data.rememberMe);

      toast.success("Login realizado com sucesso!");

      navigate(ROUTES.ADMIN_DASHBOARD, {
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof AuthError
          ? error.message
          : "Erro inesperado. Tente novamente.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      <main className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
            <Logo size={64} />
          </div>

          <h1 className="text-2xl font-bold text-primary text-center">
            Acesso Administrativo
          </h1>

          <p className="text-on-surface-variant text-center mt-2">
            Entre com suas credenciais para gerenciar a loja.
          </p>
        </div>

        {/* Card */}
        <div
          className={`
            bg-white
            rounded-xl
            border
            p-6
            transition-all
            duration-300
            hover:shadow-xl
            hover:shadow-primary-900/10
            ${
              focused
                ? "border-primary-600 shadow-lg shadow-primary-600/10"
                : "border-gray-200"
            }
          `}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                E-mail
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  onFocus={() => setFocused(true)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg outline-none transition-all focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  {...register("email", { onBlur: () => setFocused(false) })}
                />
              </div>

              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Senha
                </label>

                <Link
                  to="#"
                  className="text-sm text-primary-700 hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  onFocus={() => setFocused(true)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg outline-none transition-all focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  {...register("password", { onBlur: () => setFocused(false) })}
                />

                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                {...register("rememberMe")}
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-600 select-none cursor-pointer"
              >
                Manter conectado neste dispositivo
              </label>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                h-12
                rounded-lg
                bg-primary-700
                hover:bg-primary-800
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? (
                "Entrando..."
              ) : (
                <>
                  Entrar
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Suporte */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Dúvidas sobre o acesso?{" "}
            <Link
              to="#"
              className="font-semibold text-primary-700 hover:underline"
            >
              Fale com o suporte técnico
            </Link>
          </p>

          {/* Rodapé */}
          <div className="mt-6 flex justify-center items-center gap-4 text-gray-400">
            <PawPrint size={16} />

            <div className="h-4 w-px bg-gray-300" />

            <Waves size={16} />

            <div className="h-4 w-px bg-gray-300" />

            <span className="text-xs">Comercial Santarém {APP_VERSION}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
