import React, { useEffect, useState } from 'react';
import { CharacterModel, defaultCharacter } from '../Character.d';
import EditCharacterDialog from '../modal/EditCharacterDialog';
import { APIReq } from '../utils/api-request';

function CharacterPage(props: { character: CharacterModel }) {
  const [character, setCharacter] = useState(props.character);
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
    <div>
      <h1>{name}</h1>
      <p>Weapon: {weapon}</p>
      <p>Element: {element}</p>

      {exists && (
        <>
          <button onClick={() => deleteCharacter(name)}>Delete</button>
          <button onClick={() => setOpenEditCharacter(true)}>Edit Info</button>
        </>
      )}
      <EditCharacterDialog
        open={openEditCharacter}
        close={() => setOpenEditCharacter(false)}
        updateCharacter={(updated: CharacterModel) => setCharacter(updated)}
        character={character}
      />
    </div>
  );
}

export default CharacterPage;
