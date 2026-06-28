import LeafletMap from '../components/leaflet-maps/LeafletMap.tsx';
import { Box, Grid } from '@mui/material';
import DashboardStoreEntranceLogsCard from '../components/cards/DashboardStoreEntranceLogsCard.tsx';
import DashboardStoreEntranceFiltersCard from '../components/cards/DashboardStoreEntranceFiltersCard.tsx';
import CourierInfoCard from '../components/cards/CourierInfoCard.tsx';
import { useSearchParams } from 'react-router-dom';

const Dashboard = () => {


  const [searchParams] = useSearchParams();
  const selectedCourierId = searchParams.get('selectedCourierId');

  return (
    <Grid container flexGrow={{ xs: 0, lg: 1 }} direction={{ xs: 'column', lg: 'row' }}>
      <Grid size={{ xs: 12, lg: 8 }} sx={{ position: 'relative', flexGrow: 1 }}>
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #ccc',
          }}
          position={{ xs: 'static', lg: 'absolute' }}
          left={{ lg: 40 }}
          top={{ lg: '5%' }}
          bottom={{ lg: '5%' }}
          right={{ lg: 30 }}
          height={{ xs: 500, lg: 'unset' }}
          margin={{ xs: 2, lg: 0 }}
        >
          <LeafletMap />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }} sx={{ position: 'relative' }}>
        <Box
          position={{ xs: 'static', lg: 'absolute' }}
          left={{ lg: 10 }}
          top={{ lg: '5%' }}
          right={{ lg: 40 }}
          margin={{ xs: 2, lg: 0 }}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          paddingBottom={10}
        >
          <DashboardStoreEntranceFiltersCard />
          <DashboardStoreEntranceLogsCard  />
          <CourierInfoCard courierId={selectedCourierId} shouldRefetch={true}></CourierInfoCard>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
