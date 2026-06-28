import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client.ts';

const fetchStoreLocations = async () => {
  const { data } = await api.get('/api/stores');
  return data;
};

interface StoreLocation {
  storeId: number;
  name: string;
  lat: number;
  lng: number;
}

export const useStoreLocations = () => {
  return useQuery<StoreLocation[]>({
    queryKey: ['storeLocations'],
    queryFn: fetchStoreLocations,
  });
};
