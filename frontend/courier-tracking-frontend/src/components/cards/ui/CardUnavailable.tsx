import { Typography } from '@mui/material';

const CardUnavailable = ({ text }: { text: string }) => {
  return (
    <Typography color={'#bfbfbf'} fontWeight={650} fontSize={20} textAlign={'center'} paddingY={5}>
      {text}
    </Typography>
  );
};
export default CardUnavailable;
