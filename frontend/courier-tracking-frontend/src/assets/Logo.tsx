import { Moped } from '@mui/icons-material';
import { Stack, type SxProps, type Theme, Typography } from '@mui/material';

interface LogoProps {
  sx?: SxProps<Theme>;
}

const Logo = ({ sx }: LogoProps) => {
  return (
    <Stack direction="row" alignItems="center" sx={sx}>
      <Moped sx={{ mr: 1, fontSize: '1.25em' }} />
      <Typography
        noWrap
        sx={{
          fontWeight: 700,
          color: 'inherit',
          fontSize: 'inherit',
        }}
      >
        Migros Courier Tracker
      </Typography>
    </Stack>
  );
};
export default Logo;
