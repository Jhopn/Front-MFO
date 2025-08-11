"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/api"

interface IndicatorsSectionProps {
  data: DashboardData
}

export function IndicatorsSection({ data }: IndicatorsSectionProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const sportsProgress = (data.goals.sports.current / data.goals.sports.target) * 100
  const yieldProgress = (data.goals.yield.current / data.goals.yield.target) * 100

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Indicadores</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Retirement Indicators */}
        <Card className="bg-card/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm">Aposentadoria</span>
            </div>
            <div className="text-lg font-bold">{data.indicators.retirement.age} anos</div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm">Renda desejada/mês</span>
            </div>
            <div className="text-lg font-bold">{formatCurrency(data.indicators.desiredIncome)}</div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm">Target rendimento</span>
            </div>
            <div className="text-lg font-bold">{data.indicators.targetYield}</div>
          </CardContent>
        </Card>

        {/* PGBL */}
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">PGBL</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-green-500">{formatCurrency(data.pgbl.target)}</div>
            <div className="text-sm text-muted-foreground">Aporte anual: {formatCurrency(data.pgbl.current)}</div>
          </CardContent>
        </Card>

        {/* Sports Goal */}
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Meta sports</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="relative h-16 w-16 mx-auto">
              <svg className="h-16 w-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${sportsProgress}, 100`}
                  className="text-green-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{Math.round(sportsProgress)}%</span>
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-green-500">{formatCurrency(data.goals.sports.current)}</div>
              <div className="text-xs text-muted-foreground">{formatCurrency(data.goals.sports.target)}</div>
            </div>
          </CardContent>
        </Card>

        {/* Yield Goal */}
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Meta rendimento</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="relative h-16 w-16 mx-auto">
              <svg className="h-16 w-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${yieldProgress}, 100`}
                  className="text-blue-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{Math.round(yieldProgress)}%</span>
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-blue-500">{formatCurrency(data.goals.yield.current)}</div>
              <div className="text-xs text-muted-foreground">{formatCurrency(data.goals.yield.target)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
