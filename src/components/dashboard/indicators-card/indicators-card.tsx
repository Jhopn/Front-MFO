"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RetirementProfile } from "@/types"

interface IndicatorsCardProps {
  retirementProfile?: RetirementProfile
}

export function IndicatorsCard({ retirementProfile }: IndicatorsCardProps) {
  const indicators = [
    {
      label: "Aposentadoria",
      value: retirementProfile?.retirementAge ? `${retirementProfile.retirementAge} anos` : "Não definido",
      type: "info",
    },
    {
      label: "Renda desejada/mês",
      value: retirementProfile?.desiredIncome
        ? `R$ ${retirementProfile.desiredIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
        : "Não definido",
      type: "currency",
    },
    {
      label: "Target rendimento",
      value: retirementProfile?.expectedReturn ? `${retirementProfile.expectedReturn.toFixed(2)}%` : "Não definido",
      type: "percentage",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-white">{indicator.label}</span>
            <span className="font-medium text-white">{indicator.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
