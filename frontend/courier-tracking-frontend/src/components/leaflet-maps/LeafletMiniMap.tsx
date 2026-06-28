import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';
import { useCourierLocationHistory } from '../../hooks/data-fetchers/useCourierLocationHistory.ts';
import { MapContainer, TileLayer } from 'react-leaflet';
import MopedMarker from './map-objects/MopedMarker.tsx';
import CourierPath from './map-objects/CourierPath.tsx';
import type { LatLngExpression } from 'leaflet';
import CardUnavailable from '../cards/ui/CardUnavailable.tsx';

const LeafletMiniMap = ({
  courierId,
  markedLocation,
}: {
  courierId: string;
  markedLocation?: LatLngExpression;
}) => {
  const { data: courierLocationHistory } = useCourierLocationHistory(courierId || '');

  const breadcrumbHistory = useMemo(() => {
    if (!courierLocationHistory) return [];
    return courierLocationHistory.map(
      (location) => [location.lat, location.lng] as [number, number],
    );
  }, [courierLocationHistory]);

  return (
    <Card>
      <CardHeader title={'Current Position'}></CardHeader>
      <CardContent sx={{ height: '350px', padding: 1 }}>
        {markedLocation || breadcrumbHistory[0] ? (
          <MapContainer
            center={markedLocation || breadcrumbHistory[0] || [41.023, 28.984]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {(markedLocation || breadcrumbHistory[0]) && ( // Normally, I would get this from global state "mapLocation".
              // Since I didn't use global states on this project, this is just a fallback to latest breadcrumb location
              <MopedMarker
                position={markedLocation || breadcrumbHistory[0]}
                isSelected={false}
              ></MopedMarker>
            )}

            {breadcrumbHistory && breadcrumbHistory.length > 0 && (
              <CourierPath breadcrumbs={breadcrumbHistory}></CourierPath>
            )}
          </MapContainer>
        ) : (
          <CardUnavailable text={'No location available.'} />
        )}
      </CardContent>
    </Card>
  );
};
export default LeafletMiniMap;
