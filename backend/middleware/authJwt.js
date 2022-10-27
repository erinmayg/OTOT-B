import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  // Authenticate
  if (!isValidRequest(req)) {
    return res.status(401).json({ message: 'Missing JWT token!' });
  }

  try {
    const username = req.query.username;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = decodeToken(token, process.env.JWT_PRIVATE_KEY);

    if (username !== decoded.username) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    if (verifyAccess && !decoded.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    req.isAdmin = decoded.isAdmin;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid JWT token' });
  }
}

export function verifyAccess(req, res, next) {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
}

export const isValidRequest = (req) => {
  return (
    req.query.username &&
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
