import { Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { Backspace } from '@mui/icons-material';

import { useUrlFilters } from '../../hooks/logic/useUrlFilters.ts';

const DashboardStoreEntranceFiltersCard = () => {
  const { filters, setFilters, clearFilters } = useUrlFilters<Record<string, string>>({
    storeName: '',
    courierName: '',
    start: '',
    end: '',
  });

  const hasFilters = filters.storeName || filters.courierName || filters.start || filters.end;

  return (
    <Card>
      <CardHeader
        title="Store Entrance Filters"
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
        <Stack spacing={2}>
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

          <TextField
            label="Store Name"
            value={filters.storeName}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                storeName: e.target.value,
              }))
            }
            size="small"
            fullWidth
          />

          <TextField
            label="Start Date"
            type="datetime-local"
            value={filters.start}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                start: e.target.value,
              }))
            }
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />

          <TextField
            label="End Date"
            type="datetime-local"
            value={filters.end}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                end: e.target.value,
              }))
            }
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardStoreEntranceFiltersCard;
