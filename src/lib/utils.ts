import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMonths, formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const getUpdateStatus = (date: string | null): { text: string; status: 'good' | 'warning' | 'overdue' } => {
    if (!date) {
        return { text: "Sem dados", status: 'overdue' };
    }
    const updateDate = new Date(date);
    const now = new Date();
    const monthsDiff = differenceInMonths(now, updateDate);

    let status: 'good' | 'warning' | 'overdue' = 'good';
    if (monthsDiff >= 6) {
        status = 'overdue';
    } else if (monthsDiff >= 3) {
        status = 'warning';
    }

    const text = formatDistanceToNowStrict(updateDate, { addSuffix: true, locale: ptBR });

    return { text, status };
};
