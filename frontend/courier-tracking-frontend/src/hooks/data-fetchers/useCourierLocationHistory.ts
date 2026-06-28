import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

const fetchCourierLocationHistoryByCourierId = async (courierId: string) => {
  const { data } = await api.get(`/api/couriers/${courierId}/history`);
  return data;
};

interface CourierLocationHistory {
  Id: number;
  lat: number;
  lng: number;
  timestamp: string;
}

export const useCourierLocationHistory = (courierId: string) => {
  return useQuery<CourierLocationHistory[]>({
    queryKey: ['courierLocationHistory', courierId],
    queryFn: () => fetchCourierLocationHistoryByCourierId(courierId),
    enabled: !!courierId,
    gcTime: 0,
  });
};
