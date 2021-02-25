import express from 'express';
import studentController from '../../controllers/student.controller';

const router = express.Router();

router.post('/', studentController.create);

export default router;
