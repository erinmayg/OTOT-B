import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { CharacterModel, defaultCharacter } from './Character.d';
import CharacterPage from './components/CharacterPage';
import NewCharacterDialog from './modal/NewCharacterDialog';
import { APIReq } from './utils/api-request';

function App() {
  const [character, setCharacter] = useState<CharacterModel | null>();
  const [openNewCharacter, setOpenNewCharacter] = useState(false);

  const fetchCharacterData = async (name: string) => {
    const { status, data } = await APIReq.search(name);
    const { message, data: character } = data;

    if (status == 404) {
      setCharacter(defaultCharacter);
      return;
    }

    setCharacter(character);
  };

  return (
    <div className='App' style={{ minHeight: '100vh' }}>
      <h1>Genshin Impact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const character = data.get('character');
          character && fetchCharacterData(character.toString());
        }}
      >
        <input
          placeholder='Search for Genshin Characters'
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '16px',
            border: '1px solid grey',
            width: '500px',
          }}
          type='text'
          name='character'
        />
      </form>
      <button onClick={() => setOpenNewCharacter(true)}>
        Create New Character!
      </button>
      {character && <CharacterPage character={character} />}
      <NewCharacterDialog
        open={openNewCharacter}
        close={() => setOpenNewCharacter(false)}
      />
    </div>
  );
}

export default App;
