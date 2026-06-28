import { useEffect, useState } from 'react';

export const useSnappedRoute = (crumbs: [number, number][]) => {
  const [snappedPath, setSnappedPath] = useState<[number, number][]>(crumbs);

  useEffect(() => {
    if (crumbs.length < 2) return;

    const fetchRoute = async () => {
      //TODO: There could be a road snapping service attached to here,
      // here's my solution:
      // OSRM provides an open source map. We download it to a server locally connected to our Frontend.
      // OSRM has a "Match Service" which snaps our breadcrumbs to the closest road.
      // We make a call to our Local "Match Service" here to get snapped Breadcrumbs.
      // Refer to the Docs to learn more about "Match Service" https://project-osrm.org/docs/v5.5.1/api/#table-service:~:text=0%3B1%3B3%26destinations%3D2%3B4%27-,Match%20service,-Map%20matching%20matches
    };

    fetchRoute()
      .then(() => {
        setSnappedPath(crumbs); // Pretend that our local OSRM Match service gave us breadcrumbs snapped to the closest roads.
      })
      .catch(() => {
        setSnappedPath(crumbs); // Fallback to just connecting the breadcrumbs, no snapping.
      });
  }, [crumbs]);

  return snappedPath;
};
