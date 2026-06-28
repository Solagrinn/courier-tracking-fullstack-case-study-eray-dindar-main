import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

// The function that actually calls your Spring Boot API
const fetchCurrentLocations = async () => {
  const { data } = await api.get('/api/couriers/locations/current');
  return data;
};

interface CourierLocation {
  courierId: string;
  lat: number;
  lng: number;
  timestamp: string;
  inStore: boolean;
}

export const useLiveCourierLocations = () => {
  return useQuery<CourierLocation[]>({
    queryKey: ['courierLocations'],
    queryFn: fetchCurrentLocations,
    refetchInterval: 2000, // Auto-refresh every 2 seconds for the "Live" effect
  });
};
