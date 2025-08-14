import { Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/providers/query-provider"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Entrar — Anka",
}

export default function LoginPage() {
  return (
    <main className={cn("min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4")}>
      <div className="w-full max-w-md"> 
        <QueryProvider>
          <section className="flex flex-col">
            <div className="mb-8 flex items-center gap-3">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 blur-sm opacity-60" />
                <div className="relative rounded-full border border-orange-500/30 bg-neutral-900 px-3 py-1 text-sm font-medium tracking-wide text-amber-300">
                  Anka
                </div>
              </div>
              <Separator orientation="vertical" className="mx-1 h-5 bg-neutral-700" />
              <span className="text-sm text-neutral-400">Área Administrativa</span>
            </div>

            <Card className="border-neutral-800/80 bg-neutral-900/70 text-neutral-100 shadow-2xl backdrop-blur">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-2xl">Entrar</CardTitle>
                </div>
                <CardDescription className="text-neutral-400">
                  Acesse o painel para gerenciar seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            <p className="mt-6 flex items-center gap-2 text-xs text-neutral-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/80 shadow-[0_0_12px_2px_rgba(16,185,129,0.7)]" />
              Seus dados são protegidos com criptografia de ponta a ponta.
            </p>
          </section>
        </QueryProvider>
      </div>
    </main>
  )
}