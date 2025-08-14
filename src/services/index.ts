import axios from 'axios';
import {
    clientsTableResponseSchema,
    planningAlignmentResponseSchema,
    planningSummaryResponseSchema,
    familyProfileResponseSchema,
    clientByIsAndName,
    walletSchema,
    goalSchema,
    retirementProfileSchema,
    clientSchema,
    simulationsApiResponseSchema
} from '../schemas'; 
import {
    ClientsTableResponse,
    PlanningAlignmentResponse,
    PlanningSummaryResponse,
    FamilyProfileResponse,
    CreateClientPayload,
    Client,
    ClientResponseByIdAndName,
    Wallet,
    CreateWallet,
    UpdateWallet,
    Goal,
    RetirementProfile,
    CreateRetirementProfile,
    CreateGoal,
    UpdateGoal,
    UpdateRetirementProfile,
    SimulationsApiResponse
} from '../types'; 
import z from 'zod';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  },
);


export const getClientsTable = async (page: number, pageSize: number = 4): Promise<ClientsTableResponse> => {
    const response = await apiClient.get('/clients/table', {
        params: { page, pageSize }
    });
    return clientsTableResponseSchema.parse(response.data);
};

export const getPlanningAlignment = async (): Promise<PlanningAlignmentResponse> => {
    const response = await apiClient.get('/dashboard/planning-distribution');
    return planningAlignmentResponseSchema.parse(response.data);
};

export const getPlanningSummary = async (): Promise<PlanningSummaryResponse> => {
    const response = await apiClient.get('/dashboard/planning-summary');
    return planningSummaryResponseSchema.parse(response.data);
};

export const getFamilyProfileSummary = async (): Promise<FamilyProfileResponse> => {
    const response = await apiClient.get('/dashboard/family-profile-summary');
    return familyProfileResponseSchema.parse(response.data);
};

export const createClient = async (data: CreateClientPayload): Promise<Client> => {
    const response = await apiClient.post('/clients', data);
    return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}`);
};

export const getClientById = async (clientId: string): Promise<Client> => {
    const response = await apiClient.get(`/clients/${clientId}`);
    return clientSchema.parse(response.data);
}

export const getClientsIdName = async (): Promise<ClientResponseByIdAndName> => {
    const response = await apiClient.get('/clients/id-name');
    return clientByIsAndName.parse(response.data);
}

export const getWalletByClientId = async (clientId: string): Promise<Wallet[]> => {
    const response = await apiClient.get(`/clients/${clientId}/wallets`);
    return z.array(walletSchema).parse(response.data);
};

export const createWallet = async (data: CreateWallet, clientId: string): Promise<Wallet> => {
    const response = await apiClient.post(`/clients/${clientId}/wallets`, data);
    return walletSchema.parse(response.data);
};

export const updateWallet = async (id: string, clientId: string, data: UpdateWallet): Promise<Wallet> => {
    const response = await apiClient.patch(`/clients/${clientId}/wallets/${id}`, data);
    return walletSchema.parse(response.data);
};

export const deleteWallet = async (id: string, clientId: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}/wallets/${id}`);
};

export const getGoalByClientId = async (clientId: string): Promise<Goal[]> => {
    const response = await apiClient.get(`/clients/${clientId}/goals`);
    return z.array(goalSchema).parse(response.data);
};

export const createGoal = async (data: CreateGoal, clientId: string): Promise<Goal> => {
    const response = await apiClient.post(`/clients/${clientId}/goals`, data);
    return goalSchema.parse(response.data);
};

export const updateGoal = async (id: string, clientId: string, data: UpdateGoal): Promise<Goal> => {
    const response = await apiClient.patch(`/clients/${clientId}/goals/${id}`, data);
    return goalSchema.parse(response.data);
};

export const deleteGoal = async (id: string, clientId: string): Promise<void> => {
    await apiClient.delete(`/clients/${clientId}/goals/${id}`);
};

export const getFoblGoal = async (clientId: string): Promise<Goal> => {
    const response = await apiClient.get(`/clients/${clientId}/goals/fobl`);
    console.log(response.data)
    return goalSchema.parse(response.data);
};

export const getRetirementByClientId = async (clientId: string): Promise<RetirementProfile> => {
    const response = await apiClient.get(`/retirement/${clientId}`);
    return retirementProfileSchema.parse(response.data);
};

export const createRetirementProfile = async (data: CreateRetirementProfile): Promise<RetirementProfile> => {
    const response = await apiClient.post('/retirement', data);
    return retirementProfileSchema.parse(response.data);
};

export const updateRetirementProfile = async (clientId: string, data: UpdateRetirementProfile): Promise<RetirementProfile> => {
    const response = await apiClient.put(`/retirement/${clientId}`, data);
    return retirementProfileSchema.parse(response.data);
};

export const getSimulations = async (clientId: string, page: number): Promise<SimulationsApiResponse> => {
  const response = await apiClient.get(`/clients/${clientId}/simulations?page=${page}&limit=5`);
  return simulationsApiResponseSchema.parse(response.data);
};