import Image from "next/image"
import Link from "next/link"
import { Shield, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/providers/query-provider"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Entrar — Anka",
}

export default function LoginPage() {
  return (
    <main className={cn("min-h-screen bg-neutral-950 text-neutral-100")}>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2 lg:gap-10 lg:py-16">
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

        <section className="relative hidden min-h-[520px] overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.05) 45%, rgba(34,197,94,0) 70%)",
              filter: "blur(12px)",
            }}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-neutral-800/70" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 ring-1 ring-neutral-700">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-200">Painel de Clientes</p>
                  <p className="text-xs text-neutral-500">Pré-visualização</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:bg-neutral-800">
                Ver detalhes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <Image
                src="/images/clientes.png"
                alt="Pré-visualização do dashboard de clientes"
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-neutral-800/60" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
