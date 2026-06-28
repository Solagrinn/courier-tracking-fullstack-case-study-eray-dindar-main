
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

const fetchStoreEntranceLogsByCourierId = async (courierId: string) => {
  const { data } = await api.get(`/api/couriers/${courierId}/store-entrance-logs`);
  return data;
};

interface StoreEntranceLog {
  id: number;
  storeId: number;
  storeName: string;
  entranceDate: string;
}

export const useCourierEntranceLogs = (courierId: string) => {
  return useQuery<StoreEntranceLog[]>({
    queryKey: ['courierStoreEntranceLogs', courierId],
    queryFn: () => fetchStoreEntranceLogsByCourierId(courierId),
    enabled: !!courierId,
  });
};
