import { Box, Grid } from '@mui/material';
import CourierInfoCard from '../components/cards/CourierInfoCard.tsx';
import LastEnteredStoreTable from '../components/tables/LastEnteredStoreTable.tsx';
import CourierLastEnteredStoreFiltersCard from '../components/cards/CourierLastEnteredStoreFiltersCard.tsx';
import { useSearchParams } from 'react-router-dom';

const Couriers = () => {
  const [searchParams] = useSearchParams();
  const selectedCourierId = searchParams.get('selectedCourierId');

  return (
    <Box p={{ xs: 1, lg: 5 }}>
      <Grid
        container
        flexGrow={{ xs: 0, lg: 1 }}
        direction={{ xs: 'column', lg: 'row' }}
        spacing={{ xs: 2, lg: 4 }}
      >
        <Grid size={{ xs: 12, lg: 4 }}>
          <CourierInfoCard courierId={selectedCourierId} />
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <CourierLastEnteredStoreFiltersCard />
          <LastEnteredStoreTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Couriers;
