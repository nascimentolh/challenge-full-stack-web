import express from 'express';
import studentController from '../../controllers/student.controller';

const router = express.Router();

router.post('/', studentController.create);
router.get('/:cpf/cpf', studentController.getStudentByCpf);
router.get('/:ra/ra', studentController.getStudentByRA);

export default router;
