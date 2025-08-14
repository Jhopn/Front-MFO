"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Goal } from "@/types"

interface GoalProgressCardProps {
  goal?: Goal
  currentValue: number
  title: string
}

export function GoalProgressCard({ goal, currentValue, title }: GoalProgressCardProps) {
  const targetValue = goal?.targetValue || 100000
  const progressPercentage = Math.min((currentValue / targetValue) * 100, 100)

  return (
    <Card className="bg-[#1B1B1B]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="w-24 h-24 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${progressPercentage}, 100`}
                  className="text-green-500"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground/20"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              R$ {currentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-white">
              R$ {targetValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          {goal && (
            <div className="text-center text-white">
              <Badge variant="secondary">Meta: {new Date(goal.targetDate).toLocaleDateString("pt-BR")}</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
