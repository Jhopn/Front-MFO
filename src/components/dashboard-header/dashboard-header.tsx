"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useUpdateAllocation } from "@/hooks/use-dashboard"
import type { DashboardData } from "@/lib/api"

interface DashboardHeaderProps {
  data: DashboardData
}

export function DashboardHeader({ data }: DashboardHeaderProps) {
  const updateAllocation = useUpdateAllocation()

  const handleUpdate = () => {
    updateAllocation.mutate({})
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : ""
    return `${sign}${value.toFixed(2)}%`
  }

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-12 px-6 text-lg font-medium bg-transparent">
              Matheus Silveira
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <p className="text-sm text-muted-foreground">Total Alocado</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatCurrency(data.totalAllocated)}</span>
            <span className={`text-sm font-medium ${data.totalPercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatPercentage(data.totalPercentage)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Data da Alocação: {data.allocationDate}</span>
        </div>
      </div>

      <Button onClick={handleUpdate} disabled={updateAllocation.isPending} className="h-10 px-6">
        {updateAllocation.isPending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
        Atualizar
      </Button>
    </div>
  )
}
