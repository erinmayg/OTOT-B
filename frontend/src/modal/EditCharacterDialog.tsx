import React, { FormEvent } from 'react';
import CharacterModel from '../Character';
import Dialog from '../components/Dialog';
import { APIReq } from '../utils/api-request';

const weapons = ['Sword', 'Catalyst', 'Polearm', 'Bow', 'Claymore'];
const elements = ['Anemo', 'Pyro', 'Geo', 'Hydro', 'Dendro', 'Cryo', 'Electro'];

function EditCharacterDialog(props: {
  open: boolean;
  close: VoidFunction;
  character: CharacterModel;
  updateCharacter: (updated: CharacterModel) => void;
}) {
  const { open, close, character, updateCharacter } = props;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const weapon = formData.get('weapon');
    const element = formData.get('element');

    if (!name && !weapon && !element) {
      return;
    }

    const updatedCharacter = {
      name: name?.toString() || character.name,
      weapon: weapon?.toString() || character.weapon,
      element: element?.toString() || character.element,
    };

    console.log(updatedCharacter);

    const {
      status,
      data: { message, data: updated },
    } = await APIReq.edit(character.name, updatedCharacter);
    console.log(message);
    updateCharacter(updated);
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
          Character Name: <input name='name' defaultValue={character.name} />
        </label>
        <br />
        <label>
          Weapon:{' '}
          <select name='weapon' defaultValue={character.weapon}>
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
          <select name='element' defaultValue={character.element}>
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

export default EditCharacterDialog;
