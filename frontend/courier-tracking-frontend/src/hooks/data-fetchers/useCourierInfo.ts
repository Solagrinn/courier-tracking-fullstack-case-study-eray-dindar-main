import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

const fetchCourierInfoByCourierId = async (courierId: string) => {
  const { data } = await api.get(`/api/couriers/${courierId}/info`);
  return data;
};

interface CourierInfo {
  courierId: string;
  name: string;
  vehicleType: string;
  lastLat: number;
  lastLng: number;
  lastUpdated: string;
  status: string;
  totalDistance: number;
}

export const useCourierInfo = (courierId: string | null, shouldRefetch = false) => {
  return useQuery<CourierInfo>({
    queryKey: ['courierInfo', courierId],
    queryFn: () => {
      // Direct guard: This should never be reached if enabled is working,
      // but it satisfies the TypeScript compiler and provides a safety net.
      if (!courierId) {
        throw new Error('Courier ID is required');
      }
      return fetchCourierInfoByCourierId(courierId);
    },
    enabled: !!courierId,
    refetchInterval: shouldRefetch ? 2000 : false, // This endpoint is lighter than useLiveCourierLocation. We might as well poll this too.
  });
};
