import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

 
interface ProgressBarProps {
  value: number;   
}

 
const BorderLinearProgress = styled(LinearProgress)<ProgressBarProps>(({ theme, value }) => ({
  width: 200,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    width: `${value}%`,   
    borderRadius: 5,
    backgroundColor: value >= 80 ? '#035e35' : '#fa8a0a',   
  },
}));

 
export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
       
      <BorderLinearProgress variant="determinate" value={value} />
    </Stack>
  );
}
