import {  Card, CardContent, CardHeader, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useCourierEntranceLogs } from '../../hooks/data-fetchers/useCourierEntranceLogs.ts';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';

const StoreTimelineCard = () => {
  const { courierId } = useParams<{ courierId: string }>();
  const { data: courierStoreEntranceLogs } = useCourierEntranceLogs(courierId || '');

  return (
    <Card>
      <CardHeader title={'Store Entrance Logs'}></CardHeader>
      <CardContent>
        {courierStoreEntranceLogs && courierStoreEntranceLogs.length > 0 ? (
          <Timeline>
            {courierStoreEntranceLogs.map((entranceLog, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="textSecondary">
                  {format(parseISO(entranceLog.entranceDate), 'dd/MM/yyyy HH:mm:ss')}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index !== courierStoreEntranceLogs.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>{entranceLog.storeName}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <Typography
            color={'#bfbfbf'}
            fontWeight={650}
            fontSize={20}
            textAlign={'center'}
            paddingY={5}
          >
            No timeline available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default StoreTimelineCard;
