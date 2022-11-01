import express from 'express';

const router = express.Router().all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

// Set default API response
router.get('/', (req, res) => res.json({ message: 'API Successful' }));

// Character Routes
import {
  index,
  newCharacter,
  view,
  updateCharacter,
  deleteCharacter,
} from './controller/character-controller.js';

router.get('/characters', index);
router.post('/characters', newCharacter);

router
  .route('/characters/:name')
  .get(view)
  .patch(updateCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter);

// User Routes
import {
  createUser,
  signIn,
  loginWithToken,
  getUser,
  getUsers,
} from './controller/user-controller.js';
import { verifyToken, grantAccess } from './middleware/authJwt.js';

router.get(
  '/:username',
  verifyToken,
  grantAccess('readOwn', 'profile'),
  getUser
);
router.get(
  '/:username/users',
  verifyToken,
  grantAccess('readAny', 'profile'),
  getUsers
);
router.post('/signup', (req, res) => createUser(req, res, 'basic'));
router.post('/admin', (req, res) => createUser(req, res, 'admin'));
router.post('/token-login', verifyToken, loginWithToken);
router.post('/login', signIn);

// Export API routes
export default router;
