"use client"
import { type ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type Props = {
  children: ReactNode
}

export function QueryProvider({ children }: Props) {
  // Garante uma única instância
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Por padrão, invalidaremos no onSuccess de cada mutação específica
          },
        },
      }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
