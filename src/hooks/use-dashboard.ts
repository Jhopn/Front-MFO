import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { dashboardApi } from "@/lib/api"
import { toast } from "sonner"

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboardData,
  })
}

export function useUpdateAllocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardApi.updateAllocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      toast.success("Alocação atualizada com sucesso!")
    },
    onError: (error) => {
      toast.error("Erro ao atualizar alocação")
      console.error("Update allocation error:", error)
    },
  })
}
