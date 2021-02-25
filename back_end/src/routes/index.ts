import express from 'express';
import user from './user/user.route';
import student from './user/student.route';

const router = express.Router();

router.use('/users', user);
router.use('/students', student);

export default router;
