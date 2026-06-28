import { CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import '../styles/MapObjectStyles.css';
import { useSnappedRoute } from '../../../hooks/logic/useSnappedRoute.ts';

const CourierPath = ({ breadcrumbs }: { breadcrumbs: [number, number][] }) => {
  const snappedPath = useSnappedRoute(breadcrumbs).slice(1); // Last breadcrumb left out for animation.
  const handleLoadMore = () => {};
  return (
    <>
      <Polyline
        positions={snappedPath}
        pathOptions={{ color: '#ff6700', weight: 5, opacity: 0.8 }}
      />
      <CircleMarker
        center={snappedPath[snappedPath.length - 1]}
        pathOptions={{ color: '#ff6700', fillColor: 'white', fillOpacity: 1 }}
        radius={6}
        eventHandlers={{ click: handleLoadMore }}
      >
        <Tooltip>Show Older (not implemented for simplicity)</Tooltip>
      </CircleMarker>
    </>
  );
};
export default CourierPath;
