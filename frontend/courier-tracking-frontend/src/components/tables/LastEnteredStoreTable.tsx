import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useCourierLastEntrances } from '../../hooks/data-fetchers/useCourierLastEntrances.ts';
import { useStoreLocations } from '../../hooks/data-fetchers/useStoreLocations.ts';
import { useSearchParams } from 'react-router-dom';

const LastEnteredTableContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCourierId = searchParams.get('selectedCourierId');

  const { data: courierLastEntrances } = useCourierLastEntrances();
  const { data: allStores } = useStoreLocations();

  const findLastEnteredStoreName = (lastEnteredStoreId: number | null) => {
    const store = allStores?.find((s) => s.storeId === lastEnteredStoreId);
    return store?.name ?? 'No store entered';
  };

  const handleSelectCourier = (courierId: string) => {
    if (selectedCourierId === courierId) {
      searchParams.delete('selectedCourierId');
    } else {
      searchParams.set('selectedCourierId', courierId);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <TableBody>
      {courierLastEntrances &&
        courierLastEntrances.map((courierLastEntrance) => (
          <TableRow
            key={courierLastEntrance.courierId}
            hover
            selected={selectedCourierId === courierLastEntrance.courierId}
            onClick={() => {
              handleSelectCourier(courierLastEntrance.courierId);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <TableCell>{courierLastEntrance.courierId}</TableCell>
            <TableCell>{courierLastEntrance.name}</TableCell>
            <TableCell>{courierLastEntrance.totalDistance} km</TableCell>
            <TableCell>
              {findLastEnteredStoreName(courierLastEntrance.lastEnteredStoreId)}
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

const LastEnteredStoreTable = () => {
  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Distance</TableCell>
            <TableCell>Last Entered Store</TableCell>
          </TableRow>
        </TableHead>
        <LastEnteredTableContent />
      </Table>
    </TableContainer>
  );
};
export default LastEnteredStoreTable;
