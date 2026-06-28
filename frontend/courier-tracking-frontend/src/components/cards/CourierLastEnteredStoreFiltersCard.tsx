import { Button, Card, CardContent, CardHeader, TextField, Grid } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import { useUrlFilters } from '../../hooks/logic/useUrlFilters.ts';

const CourierLastEnteredStoreFiltersCard = () => {
  const { filters, setFilters, clearFilters } = useUrlFilters<Record<string, string>>({
    courierId: '',
    courierName: '',
    lastEnteredStoreName: '',
  });


  const hasFilters = filters.courierId || filters.courierName || filters.lastEnteredStoreName;

  return (
    <Card sx={{ marginBottom: '16px' }}>
      <CardHeader
        title="Filter Couriers"
        action={
          hasFilters ? (
            <Button
              size="small"
              variant="text"
              endIcon={<Backspace sx={{ fontSize: 12 }} />}
              sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}
              onClick={clearFilters}
            >
              Clear
            </Button>
          ) : null
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Courier ID"
              value={filters.courierId}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  courierId: e.target.value,
                }))
              }
              size="small"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Courier Name"
              value={filters.courierName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  courierName: e.target.value,
                }))
              }
              size="small"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Store Name"
              value={filters.lastEnteredStoreName}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  lastEnteredStoreName: e.target.value,
                }))
              }
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourierLastEnteredStoreFiltersCard;
