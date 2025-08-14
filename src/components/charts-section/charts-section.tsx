"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { DashboardData } from "@/services/api"

interface ChartsSectionProps {
  data: DashboardData
}

export function ChartsSection({ data }: ChartsSectionProps) {
  const allocationData = [
    { name: "Caixa", value: data.allocation.cash, color: "bg-blue-500" },
    { name: "Renda Fixa", value: data.allocation.fixedIncome, color: "bg-green-500" },
    { name: "Previdência", value: data.allocation.pension, color: "bg-orange-500" },
    { name: "Fundo de Investimentos", value: data.allocation.investmentFunds, color: "bg-red-500" },
    { name: "Alternativos", value: data.allocation.alternatives, color: "bg-purple-500" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Allocation Comparison */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Comparação de Alocações</CardTitle>
          <div className="text-right text-sm text-muted-foreground">Perfil: Conservador</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="18, 100"
                  className="text-orange-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-500">18%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Allocation */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium">KPI Alocação</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">Categoria</Badge>
            <Badge variant="secondary">Indexador</Badge>
            <Badge variant="secondary">Custódia</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {allocationData.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Portfolio Vision */}
      <Card className="bg-card/50 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Patrimônio - Visão geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs">Patrimônio atual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs">Realizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-xs">Meta do ano</span>
            </div>
          </div>
          <div className="h-48 bg-muted/20 rounded-lg flex items-end justify-center p-4">
            <div className="text-center text-muted-foreground">
              <div className="text-sm">Gráfico de barras seria renderizado aqui</div>
              <div className="text-xs">com dados históricos do patrimônio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
