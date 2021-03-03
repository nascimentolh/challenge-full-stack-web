import express from 'express';
import studentController from '../../controllers/student.controller';
import { createValidator } from 'express-joi-validation';
import { createStudent } from '../../constants/schema/student.schema';

const router = express.Router();
const validator = createValidator({ passError: true });

router.post(
  '/',
  validator.body(createStudent),
  studentController.create,
);
router.get('/', studentController.getStudents);
router.get('/:cpf/cpf', studentController.getStudentByCpf);
router.get('/:ra/ra', studentController.getStudentByRA);
router.delete('/:id', studentController.deleteStudent);

export default router;
