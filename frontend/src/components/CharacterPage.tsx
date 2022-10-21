import React, { Dispatch, useEffect, useState } from 'react';
import { CharacterModel, defaultCharacter } from '../Character.d';
import { Box, Button, Stack, Typography } from '@mui/material';
import EditCharacterDialog from '../modal/EditCharacterDialog';
import { APIReq } from '../utils/api-request';

function CharacterPage(props: {
  character: CharacterModel;
  setCharacter: Dispatch<CharacterModel>;
}) {
  const { character, setCharacter } = props;
  const [exists, setExists] = useState(true);
  const [openEditCharacter, setOpenEditCharacter] = useState(false);

  const deleteCharacter = async (name: string) => {
    const {
      status,
      data: { message },
    } = await APIReq.delete(name);
    console.log(message);
    setCharacter(defaultCharacter);
  };

  useEffect(() => setExists(character !== defaultCharacter), [character]);

  const { name, weapon, element } = character;

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant='h4'>{name}</Typography>
        <Typography>Weapon: {weapon}</Typography>
        <Typography>Element: {element}</Typography>

        {exists && (
          <Stack direction='row' spacing={2}>
            <Button color='error' onClick={() => deleteCharacter(name)}>
              Delete
            </Button>
            <Button
              onClick={() => setOpenEditCharacter(true)}
              variant='outlined'
            >
              Edit Info
            </Button>
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

export default CharacterPage;
