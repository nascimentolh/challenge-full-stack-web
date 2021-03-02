import express from 'express';
import userController from '../../controllers/user.controller';
import { createValidator } from 'express-joi-validation';
import { userSchema } from '../../constants/schema/user.schema';

const router = express.Router();
const validator = createValidator({ passError: true });

router.get('/', userController.getUsers);
router.post('/', validator.body(userSchema), userController.create);
router.get('/:email/email', userController.getUserByEmail);
router.put('/:id', userController.updateByStudent);

export default router;
