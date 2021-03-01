import express from 'express';
import auth from './user/auth.route';
import user from './user/user.route';
import student from './user/student.route';
import authenticate from '../middlewares/authenticate';
import { restrictToStaff } from '../utils/api';

const router = express.Router();

router.use('/auth', auth);

router.use(authenticate);
router.use(restrictToStaff);
router.use('/users', user);
router.use('/students', student);

export default router;
