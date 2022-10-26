import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import ModuleCard from './ModuleCard';
import ModuleModel from '../models/Module';

function ModuleView(props: { modules: ModuleModel[] }) {
  const { modules } = props;

  return modules.length === 0 ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: 'calc(100vh - 60px)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ color: '#ff5138' }} size={60} thickness={4} />
    </Box>
  ) : (
    <Box maxWidth='600px' height='100%' style={{ marginLeft: '300px' }}>
      {modules.map((module, i) => (
        <ModuleCard module={module} key={i} />
      ))}
    </Box>
  );
}

export default ModuleView;
