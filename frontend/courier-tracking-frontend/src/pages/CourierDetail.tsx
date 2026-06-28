import { Box, Grid, Stack } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';

import StoreTimelineCard from '../components/cards/StoreTimelineCard.tsx';
import CourierInfoCard from '../components/cards/CourierInfoCard.tsx';
import LeafletMiniMap from '../components/leaflet-maps/LeafletMiniMap.tsx';

const CourierDetail = () => {
  const { courierId } = useParams<{ courierId: string }>();

  if (!courierId) {
    return <Navigate to="/couriers" replace />;
  }

  return (
    <Box p={{ xs: 1, lg: 5 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Stack spacing={2}>
            <CourierInfoCard courierId={courierId} hasDetailsButton={false}></CourierInfoCard>
            <LeafletMiniMap courierId={courierId}></LeafletMiniMap>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <StoreTimelineCard></StoreTimelineCard>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CourierDetail;
