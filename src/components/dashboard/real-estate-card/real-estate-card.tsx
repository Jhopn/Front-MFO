"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import type { Wallet } from "@/types"

interface RealEstateCardProps {
  assets: Wallet[]
  onAdd: () => void
  onEdit: (asset: Wallet) => void
  onDelete: (id: string) => void
}

export function RealEstateCard({ assets, onAdd, onDelete }: RealEstateCardProps) {
  const realEstateAssets = assets.filter(
    (asset) =>
      asset.category.toLowerCase().includes("imobil") ||
      asset.assetClass.toLowerCase().includes("casa") ||
      asset.assetClass.toLowerCase().includes("apartamento"),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Imobilizadas
          <Button variant="ghost" size="icon" onClick={onAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {realEstateAssets.length === 0 ? (
          <p className="text-sm text-white text-center py-4 ">Nenhum ativo imobiliário encontrado</p>
        ) : (
          realEstateAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="font-medium text-white">{asset.assetClass}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-semibold text-white">
                    R$ {asset.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
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
