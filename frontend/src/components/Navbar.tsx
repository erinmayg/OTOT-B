import React from 'react';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: 'fixed',
        background: 'none',
        width: '100vw',
        height: '60px',
        padding: '1rem',
        zIndex: '10',
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={2}
      >
        <Button variant='text' onClick={() => navigate('/task-b3')}>
          Task B3
        </Button>
        <Button variant='text' onClick={() => navigate('/task-b4')}>
          Task B4
        </Button>
      </Stack>
    </nav>
  );
}

export default Navbar;
