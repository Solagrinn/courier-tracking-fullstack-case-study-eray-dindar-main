import { Circle, MapContainer, TileLayer } from 'react-leaflet';
import CourierPath from './map-objects/CourierPath.tsx';
import { useLiveCourierLocations } from '../../hooks/data-fetchers/useLiveCourierLocations.ts';
import MopedMarker from './map-objects/MopedMarker.tsx';
import { useCourierLocationHistory } from '../../hooks/data-fetchers/useCourierLocationHistory.ts';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapController from './MapController.tsx';
import { useStoreLocations } from '../../hooks/data-fetchers/useStoreLocations.ts';
import InStoreMarker from './map-objects/InStoreMarker.tsx';

const LeafletMap = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = parseFloat(searchParams.get('lat') || '41.01544');
  const lng = parseFloat(searchParams.get('lng') || '28.9566');
  const zoom = parseInt(searchParams.get('zoom') || '11');
  const selectedCourierId = searchParams.get('selectedCourierId');

  const { data: liveCourierLocations } = useLiveCourierLocations();
  const { data: storeLocations } = useStoreLocations();
  const { data: courierLocationHistory } = useCourierLocationHistory(selectedCourierId || '');

  const breadcrumbHistory = useMemo(() => {
    if (!courierLocationHistory) return [];
    return courierLocationHistory.map(
      (location) => [location.lat, location.lng] as [number, number],
    );
  }, [courierLocationHistory]);

  const handleSelectCourier = (courierId: string) => {
    if (selectedCourierId === courierId) {
      searchParams.delete('selectedCourierId');
    } else {
      searchParams.set('selectedCourierId', courierId);
    }
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController />
      {liveCourierLocations?.map((courierLocation, index) =>
        courierLocation.inStore ? (
          <InStoreMarker
            key={index}
            position={[courierLocation.lat, courierLocation.lng]}
            eventHandlers={{
              click: () => {
                handleSelectCourier(courierLocation.courierId);
              },
            }}
            isSelected={selectedCourierId === courierLocation.courierId}
          ></InStoreMarker>
        ) : (
          <MopedMarker
            key={index}
            position={[courierLocation.lat, courierLocation.lng]}
            eventHandlers={{
              click: () => {
                handleSelectCourier(courierLocation.courierId);
              },
            }}
            isSelected={selectedCourierId === courierLocation.courierId}
          ></MopedMarker>
        ),
      )}
      {storeLocations?.map((store) => (
        <Circle
          key={store.storeId}
          center={[store.lat, store.lng]}
          radius={100}
          pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.2 }}
        />
      ))}
      {breadcrumbHistory && breadcrumbHistory.length > 0 && (
        <CourierPath breadcrumbs={breadcrumbHistory}></CourierPath>
      )}
    </MapContainer>
  );
};
export default LeafletMap;
