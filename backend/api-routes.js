import express from 'express';

const router = express.Router().all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

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

import { modules } from './controller/module-controller.js';

router.route('/nusmods').get(modules);

// Export API routes
export default router;
