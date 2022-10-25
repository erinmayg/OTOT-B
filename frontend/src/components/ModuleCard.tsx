import React from 'react';
import { Box, Typography } from '@mui/material';
import Module from '../Module';

function ModuleCard(props: { module: Module }) {
  const { moduleCode, title, description, department, faculty, moduleCredit } =
    props.module;
  return (
    <Box style={{ marginBottom: '1rem' }}>
      <Typography variant='h6' style={{ color: '#ff5138' }}>
        {moduleCode} {title}
      </Typography>
      <Typography variant='subtitle1'>
        {department} • {moduleCredit} MCs
      </Typography>
      <Typography variant='body1'>{description}</Typography>
    </Box>
  );
}

export default ModuleCard;
