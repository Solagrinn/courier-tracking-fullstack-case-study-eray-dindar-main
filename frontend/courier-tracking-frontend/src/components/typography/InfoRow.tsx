import { Box, Typography } from '@mui/material';

const InfoRow = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          display: 'block',
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'secondary.main',
          fontWeight: 700,
          fontSize: '1.1rem',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default InfoRow;
