"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import type { CreateWallet, CreateGoal } from "@/types"
import { createWalletSchema, createGoalSchema } from "@/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const assetFormSchema = createWalletSchema.omit({ clientId: true });


export function AddAssetForm({ clientId, category, onSuccess, createAsset, isPending }: {
  clientId: string;
  category: 'Financeira' | 'Imobilizada';
  onSuccess: () => void;
  createAsset: (vars: { data: CreateWallet; clientId: string }, options: { onSuccess: () => void }) => void;
  isPending: boolean;
}) {
  const form = useForm<z.infer<typeof assetFormSchema>>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      totalValue: 0,
      assetClass: "",
      percentage: 0,
      category: category,
      indexer: "",
      custodian: "",
      liquidityDays: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof assetFormSchema>) {
    const submissionData: CreateWallet = { ...values, clientId };
    createAsset({ data: submissionData, clientId }, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="assetClass">Asset Class</Label>
        <Input id="assetClass" {...form.register("assetClass")} />
        {form.formState.errors.assetClass && <p className="text-xs text-red-500">{form.formState.errors.assetClass.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalValue">Total Value</Label>
        <Input id="totalValue" type="number" {...form.register("totalValue", { valueAsNumber: true })} />
        {form.formState.errors.totalValue && <p className="text-xs text-red-500">{form.formState.errors.totalValue.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="percentage">Percentage</Label>
        <Input id="percentage" type="number" {...form.register("percentage", { valueAsNumber: true })} />
        {form.formState.errors.percentage && <p className="text-xs text-red-500">{form.formState.errors.percentage.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="indexer">Indexer (Optional)</Label>
        <Input id="indexer" {...form.register("indexer")} />
        {form.formState.errors.indexer && <p className="text-xs text-red-500">{form.formState.errors.indexer.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="custodian">Custodian (Optional)</Label>
        <Input id="custodian" {...form.register("custodian")} />
        {form.formState.errors.custodian && <p className="text-xs text-red-500">{form.formState.errors.custodian.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="liquidityDays">Liquidity Days (Optional)</Label>
        <Input id="liquidityDays" type="number" placeholder="e.g., 30" {...form.register("liquidityDays", {
          setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
        })} />
        {form.formState.errors.liquidityDays && <p className="text-xs text-red-500">{form.formState.errors.liquidityDays.message}</p>}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Asset"}
        </Button>
      </DialogFooter>
    </form>
  )
}

const goalFormSchema = createGoalSchema.omit({ clientId: true });

export function AddGoalForm({ clientId, onSuccess, createGoal, isPending }: {
  clientId: string;
  onSuccess: () => void;
  createGoal: (vars: { data: CreateGoal; clientId: string }, options: { onSuccess: () => void }) => void;
  isPending: boolean;
}) {
  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      type: "",
      subtype: "",
      targetValue: 0,
      targetDate: new Date(),
      version: 1,
    },
  });

  function onSubmit(values: z.infer<typeof goalFormSchema>) {
    const submissionData: CreateGoal = { ...values, clientId, targetDate: new Date(values.targetDate) };
    createGoal({ data: submissionData, clientId }, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="space-y-2 text-white">
        <Label htmlFor="type">Type</Label>
        <select id="type" {...form.register("type")} className="border rounded px-2 py-1 w-full">
          <option value="">Selecione o tipo</option>
          <option value="Performance">Performance</option>
          <option value="Sports">Sports</option>
          <option value="FOBL">FOBL</option>
        </select>
        {form.formState.errors.type && <p className="text-xs text-red-500">{form.formState.errors.type.message}</p>}

      </div>
      <div className="space-y-2 ">
        <Label htmlFor="subtype">Subtype (Optional)</Label>
        <Input id="subtype" {...form.register("subtype")} />
        {form.formState.errors.subtype && <p className="text-xs text-red-500">{form.formState.errors.subtype.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="targetValue">Target Value</Label>
        <Input id="targetValue" type="number" {...form.register("targetValue", { valueAsNumber: true })} />
        {form.formState.errors.targetValue && <p className="text-xs text-red-500">{form.formState.errors.targetValue.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="targetDate">Target Date</Label>
        <Input id="targetDate" type="date" {...form.register("targetDate", {
          setValueAs: (v) => new Date(v),
        })} />
        {form.formState.errors.targetDate && <p className="text-xs text-red-500">{form.formState.errors.targetDate.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="version">Version</Label>
        <Input id="version" type="number" {...form.register("version", { valueAsNumber: true })} />
        {form.formState.errors.version && <p className="text-xs text-red-500">{form.formState.errors.version.message}</p>}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Goal"}
        </Button>
      </DialogFooter>
    </form>
  )
}