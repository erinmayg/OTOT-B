import React, { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { CharacterModel, defaultCharacter } from '../../Character.d';
import CharacterCard from '../CharacterCard';
import NewCharacterDialog from '../../modal/NewCharacterDialog';
import { APIReq } from '../../utils/api-request';
import { GenshinLogo } from '../../icons/GenshinImpact';
import { useSnackbar } from '../../context/SnackbarContext';

function CharacterPage() {
  const [currCharacter, setCharacter] = useState<CharacterModel>();
  const [openNewCharacter, setOpenNewCharacter] = useState(false);

  const snackbar = useSnackbar();

  const fetchCharacterData = (name: string) =>
    APIReq.search(name).then(({ status, data: { message, data } }) => {
      if (status === 404) {
        snackbar.setError(message);
        return;
      }
      setCharacter(data);
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('character');
    name && fetchCharacterData(name.toString());
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        color: 'primary',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source
          src='https://www.desktophut.com/files/1659422222-1659422222-inazuma-shrine-genshin-impact-live-wallpaper-pc.mp4'
          type='video/mp4'
        />
      </video>
      <Stack spacing={2} mx={2} style={{ margin: 'auto' }}>
        <Stack
          spacing={2}
          style={{
            background:
              'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.5))',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
          }}
        >
          <GenshinLogo />
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder='Search in Teyvat'
              name='character'
              variant='filled'
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
          <Button
            onClick={() => setOpenNewCharacter(true)}
            variant='contained'
            sx={{ boxShadow: 'none' }}
          >
            Create New Character!
          </Button>
        </Stack>
        {currCharacter && (
          <CharacterCard
            character={currCharacter}
            setCharacter={setCharacter}
          />
        )}
        <NewCharacterDialog
          open={openNewCharacter}
          close={(character) => {
            setOpenNewCharacter(false);
            character && setCharacter(character);
          }}
        />
      </Stack>
    </Box>
  );
}

export default CharacterPage;
