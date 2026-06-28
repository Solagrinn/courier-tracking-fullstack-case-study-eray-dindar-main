import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import InfoRow from '../typography/InfoRow.tsx';
import { useCourierInfo } from '../../hooks/data-fetchers/useCourierInfo.ts';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const CourierInfoCard = ({
  courierId,
  shouldRefetch = false,
  hasDetailsButton = true,
}: {
  courierId: string | null;
  shouldRefetch?: boolean;
  hasDetailsButton?: boolean;
}) => {
  const navigate = useNavigate();
  const { data: courierInfo } = useCourierInfo(courierId, shouldRefetch);

  const handleNavigateToDetails = () => {
    if (courierId) {
      navigate(`/couriers/detail/${courierId}`);
    }
  };

  return (
    <Card>
      <CardHeader
        title={'Courier Information'}
        action={
          courierId && hasDetailsButton ? (
            <Button
              size="small"
              variant="text"
              endIcon={<ArrowForwardIos sx={{ fontSize: 12 }} />}
              sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}
              onClick={handleNavigateToDetails}
            >
              Details
            </Button>
          ) : null
        }
      ></CardHeader>
      <CardContent>
        {courierInfo ? (
          <>
            <InfoRow label={'COURIER CODE'} value={courierInfo.courierId}></InfoRow>
            <InfoRow label={'NAME'} value={courierInfo.name}></InfoRow>
            <InfoRow label={'VEHICLE TYPE'} value={courierInfo.vehicleType}></InfoRow>
            <InfoRow label={'TOTAL DISTANCE'} value={courierInfo.totalDistance + ' Km'}></InfoRow>
            <InfoRow
              label={'LAST POSITION'}
              value={`LAT: ${courierInfo.lastLat}, LONG: ${courierInfo.lastLng}`}
            ></InfoRow>
            <InfoRow
              label={'LAST UPDATE'}
              value={format(parseISO(courierInfo.lastUpdated), 'dd/MM/yyyy HH:mm:ss')}
            ></InfoRow>
          </>
        ) : (
          <Typography
            color={'#bfbfbf'}
            fontWeight={650}
            fontSize={20}
            textAlign={'center'}
            paddingY={5}
          >
            No courier selected.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default CourierInfoCard;
