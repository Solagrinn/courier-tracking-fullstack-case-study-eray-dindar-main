import { createTheme } from '@mui/material/styles';

export const migrosTheme = createTheme({
  palette: {
    primary: {
      main: '#ff6700',
      contrastText: '#fff',
    },
    secondary: {
      main: '#242424',
    },
    background: {
      default: '#f4f4f4',
    },
    divider: '#FF3C00',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
          border: '3px solid #ffc200',
          backgroundColor: '#fff',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#fff',
        },
        root: {
          backgroundColor: '#ff6700',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#ff6700',
          '& .MuiTableCell-head': {
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 600,
            backgroundColor: '#ff6700', // Necessary for sticky headers
            borderBottom: 'none',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          border: '3px solid #ffc200',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#fff',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // Remove borderRadius here; it doesn't work well on the <table> element
          borderCollapse: 'separate',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
