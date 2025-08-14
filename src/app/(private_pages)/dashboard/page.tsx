"use client"
import { useState, useEffect } from "react"
import { UserSelector } from "@/components/user-selector/user-selector"
import { Card } from "@/components/ui/card"
import { IndicatorsCard } from "@/components/dashboard/indicators-card/indicators-card"
import { useClientsIdName } from "@/hooks/use-clients"
import { ClientDashboard } from "@/components/dashboard/client-specific-dashboard/client-specific-dashboard"
import { useFoblGoal } from "@/hooks/use-goals"

interface Client {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const [selectedClient, setSelectedClient] = useState<Client | undefined>()
  const { data: clients, isLoading: clientsLoading } = useClientsIdName()

  const { data: foblGoal, isLoading: foblLoading } = useFoblGoal(selectedClient?.id);

  useEffect(() => {
    if (clients && clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0]);
    }
  }, [clients, selectedClient]);

  if (clientsLoading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-full bg-muted rounded-lg" />
          <div className="h-20 w-full bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6  bg-[#101010]">
      <UserSelector
        selectedUserName={selectedClient?.name}
        onUserChange={setSelectedClient}
      />

      {selectedClient && <ClientDashboard clientId={selectedClient.id} />}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <IndicatorsCard />
        <Card className="p-6 bg-[#1B1B1B]">
          <h3 className="text-lg font-semibold mb-4 text-white">FOBL</h3>
          {foblLoading ? (
            <span className="text-white">
              Adicione uma meta com o tipo FOBL
            </span>
          ) : (
            <span className="text-2xl font-bold text-green-500">
              {foblGoal?.targetValue.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' }) || "N/A"}
            </span>
          )}
        </Card>
      </div>
    </div>
  )
}