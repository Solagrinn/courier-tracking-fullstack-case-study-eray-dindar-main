import TopBar from './TopBar.tsx';
import Footer from './Footer.tsx';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <TopBar></TopBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </Box>
  );
};
export default MainLayout;
