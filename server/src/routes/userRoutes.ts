import express from 'express';
import {
  updateMyAccount,
  readMyAccount,
  readUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/me', readMyAccount);
router.put('/me', updateMyAccount);
router.get('/:userId', readUser);

export default router;
