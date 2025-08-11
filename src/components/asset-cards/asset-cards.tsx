"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Bitcoin, TrendingUp, Home, Building } from "lucide-react"
import type { DashboardData } from "@/lib/api"

interface AssetCardsProps {
  data: DashboardData
}

export function AssetCards({ data }: AssetCardsProps) {
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

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "crypto":
        return Bitcoin
      case "fund":
        return TrendingUp
      case "house":
        return Home
      case "apartment":
        return Building
      default:
        return TrendingUp
    }
  }

  return (
    <div className="space-y-6">
      {/* Financial Assets */}
      <div>
        <h3 className="mb-4 text-lg font-medium">Financeiras</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.financialAssets.map((asset) => {
            const Icon = getAssetIcon(asset.type)
            return (
              <Card key={asset.id} className="min-w-[280px] bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{asset.name}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{formatCurrency(asset.value)}</div>
                    <div className="text-sm text-green-500">{formatPercentage(asset.percentage)}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          <Button variant="outline" className="min-w-[60px] h-[120px] border-dashed bg-transparent">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Real Estate Assets */}
      <div>
        <h3 className="mb-4 text-lg font-medium">Imobilizadas</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.realEstateAssets.map((asset) => {
            const Icon = getAssetIcon(asset.type)
            return (
              <Card key={asset.id} className="min-w-[280px] bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{asset.name}</span>
                  </div>
                  <div className="text-xl font-bold">{formatCurrency(asset.value)}</div>
                </CardContent>
              </Card>
            )
          })}
          <Button variant="outline" className="min-w-[60px] h-[120px] border-dashed bg-transparent">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
