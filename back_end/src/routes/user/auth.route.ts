import express from 'express';
import { createValidator } from 'express-joi-validation';
import { restrictToStaff } from '../../utils/api';
import { loginSchema } from '../../constants/schema/auth.schema';
import authController from '../../controllers/auth.controller';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();
const validator = createValidator({ passError: true });

router.post('/', validator.body(loginSchema), authController.login);

export default router;
