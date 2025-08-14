import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as clientApi from '../services';

export const useClients = (page: number) => {
    return useQuery({
        queryKey: ['clientsTable', page],
        queryFn: () => clientApi.getClientsTable(page, 4),
    });
};

export const useClientsIdName = () => {
    return useQuery({
        queryKey: ['clientsIdName'],
        queryFn: clientApi.getClientsIdName,
    });
};

export function useClient(id: string | undefined) {
    return useQuery({
        queryKey: ['clients', id],
        queryFn: () => clientApi.getClientById(id!),
        enabled: !!id,
    });
}

export const useClientDashboardMetrics = () => {
    const { data: alignmentData, isLoading: isLoadingAlignment } = useQuery({
        queryKey: ['planningAlignment'],
        queryFn: clientApi.getPlanningAlignment,
    });

    const { data: summaryData, isLoading: isLoadingSummary } = useQuery({
        queryKey: ['planningSummary'],
        queryFn: clientApi.getPlanningSummary,
    });

    const { data: familyProfileData, isLoading: isLoadingFamilyProfile } = useQuery({
        queryKey: ['familyProfileSummary'],
        queryFn: clientApi.getFamilyProfileSummary,
    });

    return {
        alignmentData,
        isLoadingAlignment,
        summaryData,
        isLoadingSummary,
        familyProfileData,
        isLoadingFamilyProfile,
    };
};


export const useCreateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clientApi.createClient,
        onSuccess: () => {
            toast.success('Client created successfully!');
            queryClient.invalidateQueries({ queryKey: ['clientsTable'] });
            queryClient.invalidateQueries({ queryKey: ['clientsIdName'] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create client.');
        },
    });
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clientApi.deleteClient,
        onSuccess: () => {
            toast.success('Client deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['clientsTable'] });
            queryClient.invalidateQueries({ queryKey: ['clientsIdName'] });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete client.');
        },
    });
};

