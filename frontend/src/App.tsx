import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { CharacterModel, defaultCharacter } from './Character.d';
import CharacterPage from './components/CharacterPage';
import NewCharacterDialog from './modal/NewCharacterDialog';
import { APIReq } from './utils/api-request';

function App() {
  const [currCharacter, setCharacter] = useState<CharacterModel>();
  const [openNewCharacter, setOpenNewCharacter] = useState(false);

  const fetchCharacterData = (name: string) =>
    APIReq.search(name).then(({ status, data }) => {
      if (status === 404) {
        setCharacter(defaultCharacter);
        return;
      }

      const { message, data: character } = data;
      console.log(message);
      setCharacter(character);
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit');
    const data = new FormData(e.currentTarget);
    const name = data.get('character');
    name && fetchCharacterData(name.toString());
  };

  return (
    <Box className='App'>
      <Stack spacing={2} mx={2} alignItems='center'>
        <Typography variant='h3'>Genshin Impact</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder='Search in Teyvat'
            name='character'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <IconButton type='submit'>
                    <SearchRounded />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Button onClick={() => setOpenNewCharacter(true)} variant='outlined'>
          Create New Character!
        </Button>
        {currCharacter && (
          <CharacterPage
            character={currCharacter}
            setCharacter={setCharacter}
          />
        )}
        <NewCharacterDialog
          open={openNewCharacter}
          close={() => setOpenNewCharacter(false)}
        />
      </Stack>
    </Box>
  );
}

export default App;
