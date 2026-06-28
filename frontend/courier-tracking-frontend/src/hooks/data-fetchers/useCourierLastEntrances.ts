import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../api/client.ts';

const fetchAllCourierLastEntrances = async (filters?: CourierLastEntranceFilters) => {
  const params: Record<string, string> = {};

  if (filters?.courierId) params.courierId = filters.courierId;
  if (filters?.courierName) params.courierName = filters.courierName;
  if (filters?.lastEnteredStoreName) params.lastEnteredStoreName = filters.lastEnteredStoreName;

  const { data } = await api.get('/api/couriers/entrances', { params });

  return data;
};

interface CourierLastEntrance {
  courierId: string;
  name: string;
  lastEnteredStoreId: number | null;
  totalDistance: number;
}

export interface CourierLastEntranceFilters {
  courierId?: string;
  courierName?: string;
  lastEnteredStoreName?: string;
}

export const useCourierLastEntrances = () => {
  const [searchParams] = useSearchParams();

  const filters: CourierLastEntranceFilters = {
    courierId: searchParams.get('courierId') ?? undefined,
    courierName: searchParams.get('courierName') ?? undefined,
    lastEnteredStoreName: searchParams.get('lastEnteredStoreName') ?? undefined,
  };

  return useQuery<CourierLastEntrance[]>({
    queryKey: ['courierLastEntrances', filters],
    queryFn: () => fetchAllCourierLastEntrances(filters),
    gcTime: 30000,
    refetchInterval: 10000,
    placeholderData: (previousData) => previousData,
  });
};
