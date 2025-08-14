import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import * as walletApi from '../services';
import type { CreateWallet, UpdateWallet } from "@/types";

export function useWallets(clientId: string) {
  return useQuery({
    queryKey: ["wallets", clientId],
    queryFn: () => walletApi.getWalletByClientId(clientId),
    enabled: !!clientId,
  });
}

export function useCreateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, clientId }: { data: CreateWallet; clientId: string }) =>
      walletApi.createWallet(data, clientId),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["wallets", clientId] });
      toast.success("Asset added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add asset.");
    },
  });
}

export function useUpdateWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, clientId, data }: { id: string; clientId: string; data: UpdateWallet }) =>
      walletApi.updateWallet(id, clientId, data),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["wallets", clientId] });
      toast.success("Asset updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update asset.");
    },
  });
}

export function useDeleteWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, clientId }: { id: string; clientId: string }) =>
      walletApi.deleteWallet(id, clientId),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: ["wallets", clientId] });
      toast.success("Asset deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete asset.");
    },
  });
}
