import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { type MouseEvent, useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.tsx';

const pages = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Couriers', path: '/couriers' },
];

const TopBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ borderBottom: 6, borderColor: '#ffc200' }}>
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, fontSize: 22 }}></Logo>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    navigate(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo sx={{ display: { xs: 'flex', md: 'none' }, fontSize: 17 }}></Logo>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, mt: 'auto' }}
            justifyContent={'center'}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => {
                  navigate(page.path);
                }}
                sx={{
                  color: 'white',
                  display: 'block',
                  backgroundColor: location.pathname === page.path ? '#ffc200' : 'transparent',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                aria-label={page.label}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
