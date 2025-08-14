import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import * as goalApi from '../services';
import type { CreateGoal, UpdateGoal } from "@/types";

export function useGoals(clientId: string) {
  return useQuery({
    queryKey: ["goals", clientId],
    queryFn: () => goalApi.getGoalByClientId(clientId),
    enabled: !!clientId,
  });
}

export function useFoblGoal(clientId: string | undefined) {
  return useQuery({
    queryKey: ["foblGoal", clientId],
    queryFn: () => goalApi.getFoblGoal(clientId!),
    enabled: !!clientId,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, clientId }: { data: CreateGoal; clientId: string }) =>
      goalApi.createGoal(data, clientId),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["goals", clientId] });
      toast.success("Goal created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create goal.");
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, clientId, data }: { id: string; clientId: string; data: UpdateGoal }) =>
      goalApi.updateGoal(id, clientId, data),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["goals", clientId] });
      toast.success("Goal updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update goal.");
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, clientId }: { id: string; clientId: string }) =>
      goalApi.deleteGoal(id, clientId),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["goals", clientId] });
      toast.success("Goal deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete goal.");
    },
  });
}
