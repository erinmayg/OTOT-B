import Character from '../models/character-model.js';

// Index actions
const index = (req, res) =>
  Character.find({}, (err, characters) =>
    err
      ? res.json(err)
      : res.json({
          message: 'Characters retrieved successfully',
          data: characters,
        })
  );

// Handles creation
const newCharacter = (req, res) => {
  const { name, element, weapon } = req.body;

  const undefinedFields = [];
  if (!name) undefinedFields.push('name');
  if (!element) undefinedFields.push('element');
  if (!weapon) undefinedFields.push('weapon');

  if (undefinedFields.length !== 0)
    return res
      .status(400)
      .json({ message: `Missing ${undefinedFields.join(', ')}` });

  var character = new Character({ name, element, weapon });

  character.save((err) =>
    err
      ? res.json(err)
      : res.status(201).json({
          message: 'New character created',
          data: character,
        })
  );
};

// Handles view
const view = (req, res) => {
  const { name } = req.params;
  Character.findOne({ name: name }, (err, character) =>
    err
      ? res.send(err)
      : character
      ? res.json({ message: 'Character retrieved', data: character })
      : res.status(404).json({ message: 'Character not found' })
  );
};

// Handles update
const updateCharacter = (req, res) => {
  Character.findOneAndUpdate(
    { name: req.params.name },
    { $set: req.body },
    { returnDocument: 'after' },
    (err, character) =>
      err
        ? res.json(err)
        : character
        ? res.json({ message: 'Character updated!', data: character })
        : res.status(400).json({ message: 'Character not found' })
  );
};

// Handle delete
const deleteCharacter = (req, res) => {
  const { name } = req.params;
  Character.findOneAndDelete({ name: name }, (err, character) =>
    err
      ? res.send(err)
      : character
      ? res.json({ message: 'Character deleted', data: character })
      : res.status(400).json({ message: 'Character not found' })
  );
};

export { index, updateCharacter, newCharacter, view, deleteCharacter };
