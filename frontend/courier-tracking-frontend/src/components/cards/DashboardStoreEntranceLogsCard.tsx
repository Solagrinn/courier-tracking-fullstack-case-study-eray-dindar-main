import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useStoreEntranceLogs } from '../../hooks/data-fetchers/useStoreEntanceLogs.ts';
import { useSearchParams } from 'react-router-dom';

const DashboardStoreEntranceLogsCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectCourier = (courierId: string) => {
    searchParams.set('selectedCourierId', courierId);
    setSearchParams(searchParams, { replace: true });
  };

  const searchParamFilters = {
    storeName: searchParams.get('storeName') ?? undefined,
    courierName: searchParams.get('courierName') ?? undefined,
    start: searchParams.get('start') ? new Date(searchParams.get('start')!) : undefined,
    end: searchParams.get('end') ? new Date(searchParams.get('end')!) : undefined,
  };

  const { data: storeEntranceLogs } = useStoreEntranceLogs(searchParamFilters);
  return (
    <Card>
      <CardHeader title={'Store Entrance Logs'}></CardHeader>
      <CardContent sx={{ maxHeight: 320, overflowY: 'auto' }}>
        {storeEntranceLogs && storeEntranceLogs?.length > 0 ? (
          storeEntranceLogs.map((log) => (
            <Box key={log.id} sx={{ mb: 1, p: 1, borderBottom: '1px solid #eee' }}>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                <Typography
                  onClick={() => {
                    selectCourier(log.courierId);
                  }}
                  fontWeight={600}
                  fontSize={14}
                  sx={{ cursor: 'pointer' }}
                >
                  {log.courierName}
                </Typography>
                entered
                <Typography fontWeight={600} fontSize={14}>
                  {log.storeName}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                {new Date(log.entranceDate).toLocaleString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            color={'#bfbfbf'}
            fontWeight={650}
            fontSize={20}
            textAlign={'center'}
            paddingY={5}
          >
            No logs yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default DashboardStoreEntranceLogsCard;
