"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"


const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha é obrigatória.").max(80),
});

type LoginCredentials = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (data: LoginCredentials) => {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, 
      });

      if (!res?.ok) {
        throw new Error(res?.error || "Credenciais inválidas. Verifique seu e-mail e senha.");
      }

      return res;
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const onSubmit = (values: LoginCredentials) => {
    setApiError(null); 
    loginUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {apiError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Falha na autenticação</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    placeholder="voce@empresa.com"
                    type="email"
                    autoComplete="email"
                    className="pl-9 bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* 5. Label de senha simplificada */}
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="pl-9 pr-10 bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-500"
          disabled={isPending}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}