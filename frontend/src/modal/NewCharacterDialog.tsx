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
import { WEAPONS, ELEMENTS } from '../Character.d';

function NewCharacterDialog(props: { open: boolean; close: VoidFunction }) {
  const { open, close } = props;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const weapon = formData.get('weapon');
    const element = formData.get('element');

    if (!name || !weapon || !element) {
      return;
    }

    const newCharacter = {
      name: name.toString(),
      weapon: weapon.toString(),
      element: element.toString(),
    };

    console.log(newCharacter);

    const {
      status,
      data: { message },
    } = await APIReq.create(newCharacter);
    console.log(message);
    close();
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
          <TextField name='name' label='Character Name' />
          <Select name='weapon' label='Weapon' defaultValue={WEAPONS[0]}>
            {WEAPONS.map((weapon, i) => (
              <MenuItem value={weapon} key={i}>
                {weapon}
              </MenuItem>
            ))}
          </Select>
          <Select name='element' label='Element' defaultValue={ELEMENTS[0]}>
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
            <Button onClick={close}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}

export default NewCharacterDialog;
