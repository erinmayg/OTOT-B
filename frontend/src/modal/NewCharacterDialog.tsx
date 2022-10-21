import React, { FormEvent } from 'react';
import Dialog from '../components/Dialog';
import { APIReq } from '../utils/api-request';

const weapons = ['Sword', 'Catalyst', 'Polearm', 'Bow', 'Claymore'];
const elements = ['Anemo', 'Pyro', 'Geo', 'Hydro', 'Dendro', 'Cryo', 'Electro'];

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
        <h1>New Character</h1>
        <label>
          Character Name: <input name='name' />
        </label>
        <br />
        <label>
          Weapon:{' '}
          <select name='weapon'>
            {weapons.map((weapon, i) => (
              <option value={weapon} key={i}>
                {weapon}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Element:{' '}
          <select name='element'>
            {elements.map((element, i) => (
              <option value={element} key={i}>
                {element}
              </option>
            ))}
          </select>
        </label>
        <br />
        <input
          type='submit'
          value='Submit'
          style={{ display: 'flex', alignSelf: 'flex-end' }}
        />
        <button onClick={close}>Cancel</button>
      </form>
    </Dialog>
  );
}

export default NewCharacterDialog;
