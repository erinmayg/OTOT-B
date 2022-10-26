import React, { useState } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import {
  ChevronLeftRounded as Back,
  ChevronRightRounded as Next,
} from '@mui/icons-material';

export const PageIndicator = (props: {
  currPage: number;
  maxPage: number;
  updatePage: (_: number) => void;
}) => {
  const { currPage, maxPage, updatePage } = props;
  const nextPage = () => updatePage(currPage + 1);
  const prevPage = () => updatePage(currPage - 1);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={2}
    >
      <IconButton
        onClick={prevPage}
        sx={{ visibility: currPage > 1 ? 'visible' : 'hidden' }}
      >
        <Back />
      </IconButton>
      <Typography variant='h6'>{currPage}</Typography>
      {currPage < maxPage && (
        <IconButton onClick={nextPage}>
          <Next />
        </IconButton>
      )}
    </Stack>
  );
};

export default PageIndicator;
