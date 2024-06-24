import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

let UserModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
  },
});

UserModelSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default model('User', UserModelSchema);
