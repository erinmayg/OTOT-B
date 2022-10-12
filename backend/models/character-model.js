import { model, Schema } from 'mongoose';

let CharacterModelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  element: {
    type: String,
    required: true,
  },
  weapon: {
    type: String,
    required: true,
  },
});

export default model('Character', CharacterModelSchema);
