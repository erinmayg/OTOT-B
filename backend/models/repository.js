import UserModel from './user-model.js';
import mongoose from 'mongoose';
import 'dotenv/config';

//Set up mongoose connection
let mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Successfully connected to MongoDB'));

// CREATE FUNCTION
export async function createUser(params) {
  return await UserModel.create(params);
}

// READ FUNCTION
export async function getUser({ username, password }) {
  const user = await UserModel.findOne({ username: username });
  if (user && user.verifyPassword(password)) {
    return user;
  }
}

export async function getUserByUsername({ username }) {
  const user = await UserModel.findOne({ username });
  return user;
}

export async function getAllUsers() {
  const users = await UserModel.find({}, 'username role');
  return users;
}
