import React, { FormEvent } from 'react';
import {
  Button,
  Dialog,
  Select,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { APIReq } from '../utils/api-request';
import CharacterModel, { WEAPONS, ELEMENTS } from '../Character.d';
import { useSnackbar } from '../context/SnackbarContext';

function NewCharacterDialog(props: {
  open: boolean;
  close: (character?: CharacterModel) => void;
}) {
  const { open, close } = props;
  const snackbar = useSnackbar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const weapon = formData.get('weapon');
    const element = formData.get('element');

    if (!name || !weapon || !element) {
      snackbar.setError('Missing fields');
      return;
    }

    const newCharacter = {
      name: name.toString(),
      weapon: weapon.toString(),
      element: element.toString(),
    };

    console.log(newCharacter);

    APIReq.create(newCharacter)
      .then(({ status, data: { message, data } }) => {
        console.log(status, message);
        status === 201
          ? snackbar.setSuccess(message)
          : snackbar.setError(message);
        return data;
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
          <Typography variant='h5'>Create New Character!</Typography>
          <TextField required name='name' label='Character Name' />
          <Select
            required
            name='weapon'
            label='Weapon'
            defaultValue={WEAPONS[0]}
          >
            {WEAPONS.map((weapon, i) => (
              <MenuItem value={weapon} key={i}>
                {weapon}
              </MenuItem>
            ))}
          </Select>
          <Select
            required
            name='element'
            label='Element'
            defaultValue={ELEMENTS[0]}
          >
            {ELEMENTS.map((element, i) => (
              <MenuItem value={element} key={i}>
                {element}
              </MenuItem>
            ))}
          </Select>
          <Stack spacing={2} direction='row-reverse' alignItems='flex-end'>
            <Button type='submit' variant='contained'>
              Create Character!
            </Button>
            <Button onClick={() => close()}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}

export default NewCharacterDialog;
