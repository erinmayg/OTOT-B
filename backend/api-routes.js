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
import { verifyAccess, verifyToken } from './middleware/authJwt.js';

router.get('/characters', verifyToken, verifyAccess, index);
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
} from './controller/user-controller.js';

router.post('/signup', createUser);
router.post('/admin', (req, res) => createUser(req, res, true));
router.post('/token-login', verifyToken, loginWithToken);
router.post('/login', signIn);

// Export API routes
export default router;
