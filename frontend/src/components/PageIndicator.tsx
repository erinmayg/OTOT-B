import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import {
  ChevronLeftRounded as Back,
  ChevronRightRounded as Next,
} from '@mui/icons-material';

export const PageIndicator = (props: {
  currPage: number;
  maxPage: number;
  setPage: (_: number) => void;
}) => {
  const { currPage, maxPage, setPage } = props;
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={2}
    >
      {currPage > 1 && (
        <IconButton onClick={() => setPage(currPage - 1)}>
          <Back />
        </IconButton>
      )}
      <Typography variant='h6'>{currPage}</Typography>
      {currPage < maxPage && (
        <IconButton onClick={() => setPage(currPage + 1)}>
          <Next />
        </IconButton>
      )}
    </Stack>
  );
};
