"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FinancialAssetsCard } from "@/components/dashboard/financial-assets-card/financial-assets-card"
import { RealEstateCard } from "@/components/dashboard/real-estate-card/real-estate-card"
import { GoalProgressCard } from "@/components/dashboard/goal-progress-card/goal-progress-card"
import { useWallets, useCreateWallet, useUpdateWallet, useDeleteWallet } from "@/hooks/use-wallets"
import { useGoals, useCreateGoal } from "@/hooks/use-goals"
import type { Wallet, UpdateWallet } from "@/types"
import { AddAssetForm, AddGoalForm } from "../form-sub-components/form-sub-components"

export function ClientDashboard({ clientId }: { clientId: string }) {
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false)
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false)
  const [assetCategoryToAdd, setAssetCategoryToAdd] = useState<'Financeira' | 'Imobilizada'>('Financeira')
  const { data: wallets = [], isLoading: walletsLoading } = useWallets(clientId)
  const { data: goals = [], isLoading: goalsLoading } = useGoals(clientId)
  const { mutate: createAsset, isPending: isCreatingAsset } = useCreateWallet()
  const { mutate: updateAsset } = useUpdateWallet()
  const { mutate: deleteAsset } = useDeleteWallet()
  const { mutate: createGoal, isPending: isCreatingGoal } = useCreateGoal()
  const totalAllocated = wallets.reduce((sum, wallet) => sum + wallet.totalValue, 0)
  const financialAssets = wallets.filter((w) => w.category === "Financeira")
  const realEstateAssets = wallets.filter((w) => w.category === "Imobilizada")
  const sportsGoal = goals.find((g) => g.type.toLowerCase().includes("sports"))
  const rendimentoGoal = goals.find((g) => g.type.toLowerCase().includes("rendimento"))

  const handleOpenAddAssetModal = (category: 'Financeira' | 'Imobilizada') => {
    setAssetCategoryToAdd(category);
    setIsAddAssetModalOpen(true);
  }

  const handleEditAsset = (asset: Wallet) => {
    const updatedData: UpdateWallet = { totalValue: asset.totalValue + 10000 };
    updateAsset({ id: asset.id, clientId, data: updatedData });
  }

  const handleDeleteAsset = (id: string) => {
    deleteAsset({ id, clientId });
  }

  if (walletsLoading || goalsLoading) {
    return (
        <div className="animate-pulse space-y-6 mt-6">
            <div className="h-20 bg-muted rounded-lg" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-64 bg-muted rounded-lg" />
                <div className="h-64 bg-muted rounded-lg" />
            </div>
        </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
            <p className="text-sm text-white">Total Alocado</p>
            <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">
                {totalAllocated.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}
            </h1>
            </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsAddGoalModalOpen(true)}>
            Adicionar Meta
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FinancialAssetsCard
          assets={financialAssets}
          onAdd={() => handleOpenAddAssetModal('Financeira')}
          onEdit={handleEditAsset}
          onDelete={handleDeleteAsset}
        />
        <RealEstateCard
          assets={realEstateAssets}
          onAdd={() => handleOpenAddAssetModal('Imobilizada')}
          onEdit={handleEditAsset}
          onDelete={handleDeleteAsset}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GoalProgressCard goal={sportsGoal} currentValue={83000} title="Meta Sports" />
        <GoalProgressCard goal={rendimentoGoal} currentValue={33000} title="Meta Rendimento" />
      </div>

      <Dialog open={isAddAssetModalOpen} onOpenChange={setIsAddAssetModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New {assetCategoryToAdd} Asset</DialogTitle>
          </DialogHeader>
          <AddAssetForm
            clientId={clientId}
            category={assetCategoryToAdd}
            onSuccess={() => setIsAddAssetModalOpen(false)}
            createAsset={createAsset}
            isPending={isCreatingAsset}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddGoalModalOpen} onOpenChange={setIsAddGoalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Meta</DialogTitle>
          </DialogHeader>
          <AddGoalForm
            clientId={clientId}
            onSuccess={() => setIsAddGoalModalOpen(false)}
            createGoal={createGoal}
            isPending={isCreatingGoal}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}