import {
  createUser,
  getUser,
  getUserByUsername,
  getAllUsers,
} from './repository.js';
import 'dotenv/config';

//need to separate orm functions from repository to decouple business logic from persistence

export async function ormCreateUser(username, password, role) {
  try {
    const newUser = await createUser({
      username,
      password,
      role,
    });
    await newUser.save();
    return true;
  } catch (err) {
    return { err };
  }
}

export async function ormGetUser(username, password) {
  try {
    const user = await getUser({ username, password });
    return user;
  } catch (err) {
    console.log(
      'ERROR: Could not get user from DB. Wrong username / password.'
    );
    return { err };
  }
}

export async function ormGetUserByUsername(username) {
  try {
    const user = await getUserByUsername({ username });
    return user;
  } catch (err) {
    console.log('ERROR: Could not get user from DB.');
    return { err };
  }
}

export async function ormGetAllUsers() {
  try {
    const user = await getAllUsers();
    return user;
  } catch (err) {
    console.log('ERROR: Could not get users from DB.');
    return { err };
  }
}

export { ormCreateUser as _createUser, ormGetUser as _getUser };
