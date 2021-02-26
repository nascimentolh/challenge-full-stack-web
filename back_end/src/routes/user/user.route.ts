import express from 'express';
import userController from '../../controllers/user.controller';

const router = express.Router();

router.post('/', userController.create);
router.get('/:email/email', userController.getUserByEmail);

export default router;
