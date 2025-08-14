"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateClient } from "@/hooks/use-clients";
import { createClientSchema, familyProfileEnum } from "@/schemas";
import type { CreateClientPayload } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddClientDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AddClientDialog({ isOpen, onOpenChange }: AddClientDialogProps) {
    const form = useForm<CreateClientPayload>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            name: "",
            email: "",
            age: undefined,
            status: true,
            familyProfile: "moderate",
        },
    });

    const createClientMutation = useCreateClient();

    const onSubmit = (data: CreateClientPayload) => {
        createClientMutation.mutate(data, {
            onSuccess: () => {
                onOpenChange(false);
                form.reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-[#1B1B1B] border-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                    <DialogDescription>Preencha os detalhes do novo cliente.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Nome</FormLabel><FormControl><Input placeholder="Nome do cliente" {...field} className="bg-gray-800 border-gray-700" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@exemplo.com" {...field} className="bg-gray-800 border-gray-700" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="age" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Idade</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        className="bg-gray-800 border-gray-700"
                                        // Não espalhe o field aqui para ter controlo total
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        name={field.name}
                                        // Converte o valor para número no onChange
                                        onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))}
                                        // Garante que o valor no input é sempre uma string
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="familyProfile" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Perfil de Investidor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger className="bg-gray-800 border-gray-700"><SelectValue placeholder="Selecione um perfil" /></SelectTrigger></FormControl>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                                        {familyProfileEnum.options.map(option => (
                                            <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-3">
                                <div className="space-y-0.5"><FormLabel>Status</FormLabel><FormDescription>Indica se o cliente está ativo.</FormDescription></div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button type="submit" disabled={createClientMutation.isPending}>
                                {createClientMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Salvar Cliente
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}