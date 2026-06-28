import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

const fetchStoreEntranceLogs = async (filters?: StoreEntranceFilters) => {
  const params: Record<string, string> = {};

  if (filters?.storeName) params.storeName = filters.storeName;
  if (filters?.courierName) params.courierName = filters.courierName;
  if (filters?.start) params.start = formatForBackend(filters.start);
  if (filters?.end) params.end = formatForBackend(filters.end);

  const { data } = await api.get('/api/stores/logs', {
    params,
  });

  return data;
};

import { format } from 'date-fns';

const formatForBackend = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

interface StoreEntranceLog {
  id: number;
  courierId: string;
  courierName: string;
  storeId: number;
  storeName: string;
  entranceDate: string;
}

export interface StoreEntranceFilters {
  storeName?: string;
  courierName?: string;
  start?: Date;
  end?: Date;
}

export const useStoreEntranceLogs = (filters?: StoreEntranceFilters) => {
  return useQuery<StoreEntranceLog[]>({
    queryKey: ['storeEntranceLogs', filters],
    queryFn: () => fetchStoreEntranceLogs(filters),
    refetchInterval: 10000,
  });
};
