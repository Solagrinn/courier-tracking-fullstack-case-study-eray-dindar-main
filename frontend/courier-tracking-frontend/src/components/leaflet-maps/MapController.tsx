import { useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';

const MapController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      searchParams.set('lat', center.lat.toFixed(5));
      searchParams.set('lng', center.lng.toFixed(5));
      searchParams.set('zoom', map.getZoom().toString());
      setSearchParams(searchParams, { replace: true }); // replace: true prevents flooding browser history
    },
  });

  return null;
};
export default MapController;
