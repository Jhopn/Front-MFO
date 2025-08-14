import { z } from 'zod';
import { 
    clientsTableResponseSchema, 
    updateClientSchema,
    planningAlignmentResponseSchema, 
    planningSummaryResponseSchema, 
    familyProfileResponseSchema,
    clientSchema,
    createClientSchema,
    clientByIsAndName,
    walletSchema,
    createWalletSchema,
    updateWalletSchema,
    goalSchema,
    createGoalSchema,
    updateGoalSchema,
    retirementProfileSchema,
    createRetirementProfileSchema,
    updateRetirementProfileSchema,
    familyProfileEnum,
    simulationsApiResponseSchema
} from '../schemas';

export type Client = z.infer<typeof clientSchema>;
export type UpdateClient = z.infer<typeof updateClientSchema>;
export type CreateClientPayload = z.infer<typeof createClientSchema>; 
export type ClientsTableResponse = z.infer<typeof clientsTableResponseSchema>;
export type PlanningAlignmentResponse = z.infer<typeof planningAlignmentResponseSchema>;
export type PlanningSummaryResponse = z.infer<typeof planningSummaryResponseSchema>;
export type FamilyProfileResponse = z.infer<typeof familyProfileResponseSchema>;
export type ClientResponseByIdAndName = z.infer<typeof clientByIsAndName>;
export type Wallet = z.infer<typeof walletSchema>
export type CreateWallet = z.infer<typeof createWalletSchema>
export type UpdateWallet = z.infer<typeof updateWalletSchema>
export type Goal = z.infer<typeof goalSchema>
export type CreateGoal = z.infer<typeof createGoalSchema>
export type UpdateGoal = z.infer<typeof updateGoalSchema>
export type RetirementProfile = z.infer<typeof retirementProfileSchema>
export type CreateRetirementProfile = z.infer<typeof createRetirementProfileSchema>
export type UpdateRetirementProfile = z.infer<typeof updateRetirementProfileSchema>
export type FamilyProfile = z.infer<typeof familyProfileEnum>
export type SimulationsApiResponse = z.infer<typeof simulationsApiResponseSchema>;
