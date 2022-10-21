export interface CharacterModel {
  name: string;
  weapon: string;
  element: string;
}

export const defaultCharacter = {
  name: '???',
  weapon: '???',
  element: '???',
};

export const WEAPONS = ['Sword', 'Catalyst', 'Polearm', 'Bow', 'Claymore'];
export const ELEMENTS = [
  'Anemo',
  'Pyro',
  'Geo',
  'Hydro',
  'Dendro',
  'Cryo',
  'Electro',
];

export default CharacterModel;
