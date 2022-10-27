import {
  ormCreateUser as _createUser,
  ormGetUser as _getUser,
} from '../models/user-orm.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(req, res, isAdmin = false) {
  try {
    const { username, password } = req.body;
    let saltRounds = parseInt(process.env.SALT_ROUNDS);

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and/or Password missing!' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const resp = await _createUser(username, hashedPassword, isAdmin);

    if (!resp.err) {
      return res
        .status(201)
        .json({ message: `Created new user ${username} successfully!` });
    }

    if (resp.err.code === 11000) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    return res.status(400).json({ message: 'Failed to create user' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when creating new user!' });
  }
}

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and/or Password missing!' });
    }

    const user = await _getUser(username, password);
    if (user.err) {
      return res.status(400).json({ message: 'Failed to sign in!' });
    } else {
      console.log(`Signed in user ${username} successfully!`);
      let token = await generateToken(user);
      return res.status(201).json({ username: username, token: token });
    }
  } catch (err) {
    return res.status(500).json({ message: 'User not found' });
  }
}

export async function generateToken(user) {
  let privateKey = process.env.JWT_PRIVATE_KEY;
  let token = jwt.sign(
    { username: user.username, isAdmin: user.isAdmin },
    privateKey,
    { expiresIn: '1h' }
  );
  return token;
}

export async function loginWithToken({ body: { username } }, res) {
  try {
    return res
      .status(201)
      .json({ message: `Logged ${username} in with token!`, username });
  } catch (err) {
    return res.status(500).json({ message: 'Database failure!' });
  }
}
