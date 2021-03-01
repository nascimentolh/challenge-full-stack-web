import express from 'express';
import { createValidator } from 'express-joi-validation';
import { loginSchema } from '../../constants/schema/auth.schema';
import authController from '../../controllers/auth.controller';

const router = express.Router();
const validator = createValidator({ passError: true });

router.post('/', validator.body(loginSchema), authController.login);

export default router;
