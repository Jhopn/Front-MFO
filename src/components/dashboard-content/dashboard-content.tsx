"use client"
import { useDashboard } from "@/hooks/use-dashboard"
import { DashboardHeader } from "@/components/dashboard-header/dashboard-header"
import { AssetCards } from "@/components/asset-cards/asset-cards"
import { IndicatorsSection } from "@/components/indicators-section/indicators-section"
import { ChartsSection } from "@/components/charts-section/charts-section"
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function DashboardContent() {
  const { data, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Erro ao carregar dados do dashboard. Tente novamente.</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader data={data} />
      <AssetCards data={data} />
      <IndicatorsSection data={data} />
      <ChartsSection data={data} />
    </div>
  )
}
