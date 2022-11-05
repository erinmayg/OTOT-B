import { model, Schema } from 'mongoose';

let NUSModsSchema = new Schema({
  ay: {
    type: String,
    required: true,
    unique: true,
  },
  modules: {
    type: [{ type: Object }],
    required: true,
  },
});

export default model('NUSMods', NUSModsSchema);
