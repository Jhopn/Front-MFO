import { useQuery } from "@tanstack/react-query";
import * as simulationApi from '../services';
import { SimulationsApiResponse } from '@/types';

export function useSimulations(clientId: string | null, page: number) {
  return useQuery<SimulationsApiResponse>({
    queryKey: ["simulations", clientId, page],
    queryFn: () => {
      return simulationApi.getSimulations(clientId!, page);
    },
    enabled: !!clientId,
  });
}