import React, { FormEvent } from 'react';
import {
  CharacterModel,
  WEAPONS,
  ELEMENTS,
  defaultCharacter,
} from '../Character.d';
import {
  Button,
  Dialog,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { APIReq } from '../utils/api-request';
import { useSnackbar } from '../context/SnackbarContext';

function EditCharacterDialog(props: {
  open: boolean;
  close: VoidFunction;
  character: CharacterModel;
  updateCharacter: (updated: CharacterModel) => void;
}) {
  const { open, close, character, updateCharacter } = props;
  const snackbar = useSnackbar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const weapon = formData.get('weapon');
    const element = formData.get('element');

    if (!name && !weapon && !element) {
      snackbar.setError('Fill out at least one field');
      return;
    }

    const updatedCharacter = {
      name: name?.toString() || character.name,
      weapon: weapon?.toString() || character.weapon,
      element: element?.toString() || character.element,
    };

    APIReq.edit(character.name, updatedCharacter)
      .then(({ status, data: { message, data: updated } }) => {
        status === 200
          ? snackbar.setSuccess(message)
          : snackbar.setError(message);

        updateCharacter(status === 200 ? updated : defaultCharacter);
      })
      .then(close);
  };

  return (
    <Dialog open={open}>
      <form
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          <Typography variant='h5'>Edit Character</Typography>
          <TextField
            name='name'
            label='Character Name'
            defaultValue={character.name}
          />

          <Select name='weapon' label='Weapon' defaultValue={character.weapon}>
            {WEAPONS.map((weapon, i) => (
              <MenuItem value={weapon} key={i}>
                {weapon}
              </MenuItem>
            ))}
          </Select>
          <Select
            name='element'
            label='Element'
            defaultValue={character.element}
          >
            {ELEMENTS.map((element, i) => (
              <MenuItem value={element} key={i}>
                {element}
              </MenuItem>
            ))}
          </Select>
          <Stack direction='row-reverse' spacing={2}>
            <Button variant='contained' type='submit'>
              Edit Info
            </Button>
            <Button onClick={close}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}

export default EditCharacterDialog;
