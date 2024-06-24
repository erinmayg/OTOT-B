import jwt from 'jsonwebtoken';
import { roles } from '../roles.js';

export function grantAccess(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.role)[action](resource);
      if (!permission.granted) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      next();
    } catch (error) {
      console.log(err);
    }
  };
}

export function verifyToken(req, res, next) {
  // Authenticate
  if (!isValidRequest(req)) {
    return res.status(401).json({ message: 'Missing JWT token!' });
  }

  try {
    const uname = req.params.username;
    const token = req.headers.authorization.split(' ')[1];
    const { username, role, exp } = decodeToken(
      token,
      process.env.JWT_PRIVATE_KEY
    );

    if (exp < Date.now().valueOf / 1000) {
      return res.status(401).json({ message: 'JWT Token has expired' });
    }

    if (uname !== username) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    req.role = role;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid JWT token' });
  }
}

export const isValidRequest = (req) => {
  return (
    req.params.username &&
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  );
};

export const decodeToken = (token, privateKey) => {
  const verifiedToken = jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      throw err;
    }
    return decoded;
  });
  return verifiedToken;
};
