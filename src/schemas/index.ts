import { z as zod } from 'zod';

export const clientSchema = zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
    patrimony: zod.number(),
    lastUpdate: zod.string().datetime().nullable(),
});

export const updateClientSchema = clientSchema.partial().omit({ id: true })

const apiResponseMetaSchema = zod.object({
    currentPage: zod.number(),
    totalPages: zod.number(),
    itemsPerPage: zod.number(),
    totalItems: zod.number(),
});

export const clientsTableResponseSchema = zod.object({
    data: zod.array(clientSchema),
    meta: apiResponseMetaSchema,
});

export const planningAlignmentResponseSchema = zod.array(
    zod.object({
        label: zod.string(),
        percentage: zod.number(),
    })
);

export const planningSummaryResponseSchema = zod.object({
    percentage: zod.number(),
    clientCount: zod.number(),
});

export const familyProfileResponseSchema = zod.array(
    zod.object({
        label: zod.string(),
        percentage: zod.number(),
    })
);

export const familyProfileEnum = zod.enum([
    'conservative',
    'moderate',
    'aggressive',
    'very_aggressive'
]);

export const createClientSchema = zod.object({
    name: zod.string("Name is required."),
    email: zod.string("Email is required.").email("Invalid email format."),
    age: zod.number("Age is required.").int().positive().max(120, "Age must be realistic."),
    status: zod.boolean("Status is required."),
    familyProfile: familyProfileEnum,
});

export const clientByIsAndName = zod.array(
    zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
})
)

export const frequencySchema = zod.enum(["single", "monthly", "annual"])

export const walletSchema = zod.object({
  id: zod.string().uuid(),
  clientId: zod.string().uuid(),
  totalValue: zod.number().min(0, "Valor deve ser positivo"),
  assetClass: zod.string().min(1, "Classe de ativo é obrigatória"),
  percentage: zod.number().min(0).max(100, "Percentual deve estar entre 0 e 100"),
  category: zod.string().min(1, "Categoria é obrigatória"),
  indexer: zod.string().optional(),
  custodian: zod.string().optional(),
  liquidityDays: zod.number().min(0).positive().optional().nullable(),
  createdAt: zod.coerce.date(),
})

export const createWalletSchema = walletSchema.omit({
  id: true,
  createdAt: true,
})

export const updateWalletSchema = createWalletSchema.partial().omit({ clientId: true })

export const goalSchema = zod.object({
  id: zod.string().uuid(),
  clientId: zod.string().uuid(),
  type: zod.string().min(1, "Tipo é obrigatório"),
  subtype: zod.string().optional(),
  targetValue: zod.number().min(0, "Valor meta deve ser positivo"),
  targetDate: zod.coerce.date(),
  version: zod.number().min(1),
  createdAt: zod.coerce.date()
})

export const createGoalSchema = goalSchema.omit({
  id: true,
  createdAt: true,
})

export const updateGoalSchema = createGoalSchema.partial().omit({ clientId: true })

export const retirementProfileSchema = zod.object({
  id: zod.string().uuid(),
  clientId: zod.string().uuid(),
  desiredIncome: zod.number().min(0, "Renda desejada deve ser positiva"),
  expectedReturn: zod.number().min(0, "Retorno esperado deve ser positivo"),
  pgblContribution: zod.number().min(0, "Contribuição PGBL deve ser positiva"),
  retirementAge: zod.number().min(1).max(120).optional(),
  currentContribution: zod.number().min(0).optional(),
  createdAt: zod.date(),
})

export const createRetirementProfileSchema = retirementProfileSchema.omit({
  id: true,
  createdAt: true,
})

export const updateRetirementProfileSchema = createRetirementProfileSchema.partial().omit({ clientId: true })

export const FormattedSimulationSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  date: zod.string(),
  finalPatrimony: zod.number(),
  retirementAge: zod.number(),
  version: zod.number(),
  icon: zod.string(),
});

export const simulationsApiResponseSchema = zod.object({
  simulations: zod.array(FormattedSimulationSchema),
  currentPage: zod.number(),
  totalPages: zod.number(),
});