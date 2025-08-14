"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, MoreHorizontal, TrendingUp, Loader2, AlertCircle, PlusCircle, Trash2 } from "lucide-react";
import { CircularProgress } from "@/components/client/circular-progress/circular-progress";
import { StatusIndicator } from "@/components/client/status-indicator/status-indicator";
import { useClients, useDeleteClient, useClientDashboardMetrics } from '../../../hooks/use-clients';
import { Client as ClientType } from '../../../types';
import { formatCurrency as formatMoney, getUpdateStatus as getStatus } from '../../../lib/utils';
import { AddClientDialog } from "../../../components/client/add-client/add-cliente";

const CardSkeleton = () => (<div className="flex items-center justify-center h-full min-h-[150px] bg-[#1B1B1B]/50 rounded-lg"><Loader2 className="w-6 h-6 animate-spin text-gray-600" /></div>);
const defaultAlignmentData = [{ label: 'Superior a 90%', percentage: 0 }, { label: '90% a 70%', percentage: 0 }, { label: '70% a 50%', percentage: 0 }, { label: 'Inferior a 50%', percentage: 0 },];
const defaultFamilyProfileData = [{ label: 'Com filho', percentage: 0 }, { label: 'Solteiro', percentage: 0 }, { label: 'Com dependentes', percentage: 0 },];

export default function ClientsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddClientDialogOpen, setAddClientDialogOpen] = useState(false);


    const { data: clientsData, isLoading: isLoadingClients, isError: isErrorClients } = useClients(currentPage);
    const {
        alignmentData, isLoadingAlignment,
        summaryData, isLoadingSummary,
        familyProfileData, isLoadingFamilyProfile
    } = useClientDashboardMetrics();

    const deleteClientMutation = useDeleteClient();

    const clients = clientsData?.data ?? [];
    const totalPages = clientsData?.meta.totalPages ?? 1;

    const alignmentColorMap: { [key: string]: string } = { 'Superior a 90%': 'bg-green-500', '90% a 70%': 'bg-yellow-500', '70% a 50%': 'bg-orange-500', 'Inferior a 50%': 'bg-red-500', };
    const finalAlignmentData = alignmentData && alignmentData.length > 0 ? alignmentData : defaultAlignmentData;
    const finalFamilyProfileData = familyProfileData && familyProfileData.length > 0 ? familyProfileData : defaultFamilyProfileData;

    if (isLoadingClients && !clientsData) { return (<div className="flex h-screen items-center justify-center bg-black"><Loader2 className="w-12 h-12 animate-spin text-white" /></div>); }
    if (isErrorClients) { return (<div className="p-6 bg-black h-screen"><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><p>Erro ao carregar dados dos clientes.</p></Alert></div>); }

    return (
        <div className="flex-1 space-y-6 p-6 bg-[#101010] ">
            <AddClientDialog isOpen={isAddClientDialogOpen} onOpenChange={setAddClientDialogOpen} />

            <div className="flex justify-between mb-6">
                <Button onClick={() => setAddClientDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Cliente
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-min gap-6">

                <Card className="bg-[#1B1B1B] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4"><CardTitle className="text-white text-base font-medium">Alinhamento com planejamento</CardTitle><MoreHorizontal className="w-4 h-4 text-gray-400" /></CardHeader>
                    <CardContent>{isLoadingAlignment ? <CardSkeleton /> : (<div className="space-y-4">{finalAlignmentData.map((item) => (<div key={item.label} className="space-y-2"><div className="flex justify-between text-sm"><span className="text-gray-400">{item.label}</span><span className="text-white font-medium">{item.percentage}%</span></div><div className="w-full bg-gray-700 rounded-full h-2"><div className={`h-2 rounded-full ${alignmentColorMap[item.label] || 'bg-gray-500'}`} style={{ width: `${item.percentage}%` }} /></div></div>))}</div>)}</CardContent>
                </Card>

                <Card className="bg-[#1B1B1B] border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4"><CardTitle className="text-white text-base font-medium">Clientes com planejamento</CardTitle><MoreHorizontal className="w-4 h-4 text-gray-400" /></CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">{isLoadingSummary ? <CardSkeleton /> : (<><div className="relative"><CircularProgress percentage={summaryData?.percentage ?? 0} color="#22c55e" /><TrendingUp className="absolute top-4 right-4 w-5 h-5 text-green-500" /></div><p className="text-gray-400 text-sm mt-4">{summaryData?.clientCount ?? 0} clientes</p></>)}</CardContent>
                </Card>

                <Card className="bg-[#1B1B1B] border-gray-800 lg:row-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4"><CardTitle className="text-white text-base font-medium">Perfis com seguro pelo total</CardTitle><MoreHorizontal className="w-4 h-4 text-gray-400" /></CardHeader>
                    <CardContent className="space-y-6">{isLoadingFamilyProfile ? <CardSkeleton /> : (finalFamilyProfileData.map((profile) => (<div key={profile.label} className="flex items-center justify-between"><CircularProgress percentage={profile.percentage} color="#3b82f6" size={80} /><div className="text-right"><p className="text-2xl font-bold text-white">{profile.percentage}%</p><p className="text-sm text-gray-400">{profile.label}</p></div></div>)))}</CardContent>
                </Card>

                <Card className="bg-[#1B1B1B] border-gray-800 lg:col-span-2">
                    <CardHeader><CardTitle className="text-white text-base font-medium">Atualização do planejamento</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-800 text-sm text-gray-400"><div className="col-span-4">Nome</div><div className="col-span-3">Patrimônio</div><div className="col-span-4">Última atualização</div><div className="col-span-1"></div></div>
                            {clients.map((client: ClientType) => {
                                const updateInfo = getStatus(client.lastUpdate);
                                return (
                                    <div key={client.id} className="grid grid-cols-12 gap-4 py-3 items-center">
                                        <div className="col-span-4 flex items-center gap-3"><Avatar className="w-8 h-8"><AvatarFallback className="bg-gray-700 text-white text-xs">{client.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><span className="text-white text-sm">{client.name}</span></div>
                                        <div className="col-span-3 text-white text-sm">{formatMoney(client.patrimony)}</div>
                                        <div className="col-span-4 flex items-center gap-2"><StatusIndicator status={updateInfo.status} /><span className="text-sm text-gray-400">{updateInfo.text}</span></div>
                                        <div className="col-span-1">
                                            <AlertDialog>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                                                        <AlertDialogTrigger asChild><DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenuItem></AlertDialogTrigger>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <AlertDialogContent className="bg-[#1B1B1B] border-gray-800 text-white">
                                                    <AlertDialogHeader><AlertDialogTitle>Tem a certeza?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita. Isto irá excluir permanentemente o cliente.</AlertDialogDescription></AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteClientMutation.mutate(client.id)} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-800">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}><ChevronLeft className="w-4 h-4" /></Button>
                            <span className="text-sm text-gray-400 px-4">Página {currentPage} de {totalPages}</span>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" disabled={currentPage === totalPages || !clientsData} onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}