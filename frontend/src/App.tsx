import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import CharacterPage from './components/views/CharacterPage';
import NUSModsPage from './components/views/NUSModsPage';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: { allVariants: { color: 'white' } },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/task-b3' element={<CharacterPage />} />
            <Route path='/task-b4' element={<NUSModsPage />} />
            <Route path='*' element={<Navigate replace to='/task-b3' />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
