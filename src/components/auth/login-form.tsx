"use client"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { api } from "@/lib/axios"

const schema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
  remember: z.boolean().optional().default(false),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [show, setShow] = useState(false)

  const mutation = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (data: FormValues) => {
      const res = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      })
      return res.data as { token: string; user: { id: string; email: string } }
    },
    onSuccess: async (data, variables) => {
      // Persist token
      const storage = variables.remember ? window.localStorage : window.sessionStorage
      storage.setItem("auth_token", data.token)
      storage.setItem("auth_user", JSON.stringify(data.user))

      // Auto-invalidar todas as queries após a mutação
      await queryClient.invalidateQueries({ predicate: () => true })

      toast("Login realizado", {description: "Redirecionando para o painel..."})
      router.push("/")
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? "Não foi possível entrar. Verifique as credenciais."
      toast("Falha no login",{description: message })
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
    mode: "onChange",
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <FormLabel>Senha</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    placeholder="••••••••"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    className="pl-9 pr-10 bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
                    {...field}
                  />
                  <button
                    type="button"
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:text-neutral-200"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <Label className="text-sm text-neutral-400">Manter conectado</Label>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-500"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Entrando..." : "Entrar"}
        </Button>

        <div className="text-xs text-neutral-500">
          Ao continuar, você concorda com nossos{" "}
          <a className="underline underline-offset-4 hover:text-neutral-300" href="#">
            Termos
          </a>{" "}
          e{" "}
          <a className="underline underline-offset-4 hover:text-neutral-300" href="#">
            Política de Privacidade
          </a>
          .
        </div>
      </form>
    </Form>
  )
}
