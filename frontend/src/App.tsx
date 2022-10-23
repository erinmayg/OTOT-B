import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CharacterPage from './components/views/CharacterPage';
import NUSModsPage from './components/views/NUSModsPage';

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: { allVariants: { color: 'white' } },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CharacterPage /> */}
      <NUSModsPage />
    </ThemeProvider>
  );
}

export default App;
