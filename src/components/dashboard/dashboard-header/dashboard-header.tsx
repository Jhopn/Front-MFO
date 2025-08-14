"use client"
import { Button } from "@/components/ui/button"
import { UserSelector } from "@/components/user-selector/user-selector"
import { RefreshCw } from "lucide-react"

interface DashboardHeaderProps {
  selectedUser: string
  onUserChange: (user: string) => void
  totalAllocated: number
  changePercentage: number
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function DashboardHeader({
  selectedUser,
  onUserChange,
  totalAllocated,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <UserSelector selectedUser={selectedUser} onUserChange={onUserChange} />
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Total Alocado</p>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-white">
            R$ {totalAllocated.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Data da Alocação: {new Date().toLocaleDateString("pt-BR")}</p>
      </div>
    </div>
  )
}
