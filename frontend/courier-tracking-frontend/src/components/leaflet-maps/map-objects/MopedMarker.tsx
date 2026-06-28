import L, { type LatLngExpression, type LeafletEventHandlerFnMap } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Moped } from '@mui/icons-material';
import { Marker } from 'react-leaflet';
import * as React from 'react';

interface MopedMarkerProps {
  position: LatLngExpression;
  children?: React.ReactNode;
  eventHandlers?: LeafletEventHandlerFnMap;
  isSelected?: boolean;
}

const MopedMarker = ({
  children,
  position,
  eventHandlers,
  isSelected = false,
}: MopedMarkerProps) => {
  const mopedIcon = L.divIcon({
    html: renderToStaticMarkup(<Moped sx={{ fontSize: 36 }} />),
    className: `marker-container ${isSelected ? 'selected' : ''}`,
    iconSize: [36, 36],
    iconAnchor: [18, 38],
  });
  return (
    <Marker position={position} icon={mopedIcon} eventHandlers={eventHandlers}>
      {children}
    </Marker>
  );
};
export default MopedMarker;
