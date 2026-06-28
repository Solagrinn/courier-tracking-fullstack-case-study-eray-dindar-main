import L, { type LatLngExpression, type LeafletEventHandlerFnMap } from 'leaflet';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {  SportsMotorsports } from '@mui/icons-material';
import { Marker } from 'react-leaflet';

interface InStoreMarkerProps {
  position: LatLngExpression;
  children?: React.ReactNode;
  eventHandlers?: LeafletEventHandlerFnMap;
  isSelected?: boolean;
}

const InStoreMarker = ({
  children,
  position,
  eventHandlers,
  isSelected = false,
}: InStoreMarkerProps) => {
  const mopedIcon = L.divIcon({
    html: renderToStaticMarkup(<SportsMotorsports  sx={{ fontSize: 11 }} />),
    className: `marker-container small ${isSelected ? 'selected' : ''}`,
    iconSize: [28, 28],
    iconAnchor: [9, 19],
  });
  return (
    <Marker position={position} icon={mopedIcon} eventHandlers={eventHandlers}>
      {children}
    </Marker>
  );
};
export default InStoreMarker;
