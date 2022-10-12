import express from 'express';

const router = express.Router();

// Set default API response
router.get('/', (req, res) =>
  res.json({
    message: 'API Successful',
  })
);

import {
  index,
  newCharacter,
  view,
  updateCharacter,
  deleteCharacter,
} from './controller/character-controller.js';

// Routes
router.route('/characters').get(index).post(newCharacter);

router
  .route('/characters/:name')
  .get(view)
  .patch(updateCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter);

// Export API routes
export default router;
