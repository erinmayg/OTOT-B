import React, { Dispatch, useEffect, useState } from 'react';
import { CharacterModel, defaultCharacter } from '../Character.d';
import { Box, IconButton, Divider, Stack, Typography } from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import EditCharacterDialog from '../modal/EditCharacterDialog';
import { APIReq } from '../utils/api-request';
import { useSnackbar } from '../context/SnackbarContext';

function CharacterCard(props: {
  character: CharacterModel;
  setCharacter: Dispatch<CharacterModel>;
}) {
  const { character, setCharacter } = props;
  const [exists, setExists] = useState(true);
  const [openEditCharacter, setOpenEditCharacter] = useState(false);

  const snackbar = useSnackbar();

  const deleteCharacter = (name: string) =>
    APIReq.delete(name)
      .then(({ status, data: { message } }) => {
        console.log(status, message);
        status === 200
          ? snackbar.setSuccess(message)
          : snackbar.setError(message);
      })
      .then(() => setCharacter(defaultCharacter));

  useEffect(() => setExists(character !== defaultCharacter), [character]);

  const { name, weapon, element } = character;

  return (
    <Box
      style={{
        background:
          'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.5))',
        backgroundSize: 'cover',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
      }}
    >
      <Stack spacing={2}>
        <Typography variant='h4'>{name}</Typography>
        <Divider sx={{ border: '1px solid white', opacity: '0.5' }} />
        <Typography>Weapon: {weapon}</Typography>
        <Typography>Element: {element}</Typography>

        {exists && (
          <Stack direction='row' spacing={1} justifyContent='flex-end'>
            <IconButton color='error' onClick={() => deleteCharacter(name)}>
              <DeleteRounded />
            </IconButton>
            <IconButton onClick={() => setOpenEditCharacter(true)}>
              <EditRounded />
            </IconButton>
          </Stack>
        )}
        <EditCharacterDialog
          open={openEditCharacter}
          close={() => setOpenEditCharacter(false)}
          updateCharacter={(updated: CharacterModel) => setCharacter(updated)}
          character={character}
        />
      </Stack>
    </Box>
  );
}

export default CharacterCard;
