"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { Wallet } from "@/types"

interface FinancialAssetsCardProps {
  assets: Wallet[]
  onAdd: () => void
  onEdit: (asset: Wallet) => void
  onDelete: (id: string) => void
}

export function FinancialAssetsCard({ assets, onAdd, onDelete }: FinancialAssetsCardProps) {
  const financialAssets = assets.filter(
    (asset) =>
      asset.category.toLowerCase().includes("financeira") ||
      asset.assetClass.toLowerCase().includes("fundo") ||
      asset.assetClass.toLowerCase().includes("btc"),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Financeiras
          <Button variant="ghost" size="icon" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {financialAssets.length === 0 ? (
          <p className="text-sm text-center py-4 text-white">Nenhum ativo financeiro encontrado</p>
        ) : (
          financialAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="font-medium text-white">{asset.assetClass}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-semibold text-white ">
                    R$ {asset.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-green-500">+{asset.percentage}%</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive"
                    onClick={() => onDelete(asset.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
