export const StatusIndicator = ({ status }: { status: string }) => {
    const statusConfig = {
        overdue: { color: "bg-red-500", tooltip: "Atrasado" },
        warning: { color: "bg-orange-500", tooltip: "Atenção" },
        good: { color: "bg-green-500", tooltip: "Em dia" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { color: "bg-gray-500", tooltip: "Desconhecido" };

    return <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} title={config.tooltip} />;
};