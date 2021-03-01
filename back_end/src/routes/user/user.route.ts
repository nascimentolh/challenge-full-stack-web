import express from 'express';
import userController from '../../controllers/user.controller';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from 'express-joi-validation';
import { userSchema } from '../../constants/schema/user.schema';

const router = express.Router();
const validator = createValidator({passError: true});

router.post('/', validator.body(userSchema), userController.create);
router.get('/:email/email', userController.getUserByEmail);
router.put('/:id', userController.updateByStudent);

export default router;
