import IController from 'IController';
import studentService from '../services/student.service';
import apiResponse from '../utils/apiResponse';
import httpStatusCodes from 'http-status-codes';
import constants from '../constants';
import { ValidatedRequest } from 'express-joi-validation';
import { ICreateStudentSchema } from './interfaces/IStudent';

const create: IController = async (
  req: ValidatedRequest<ICreateStudentSchema>,
  res,
) => {
  let student;
  try {
    student = await studentService.createStudent(req.body);
  } catch (error) {
    if (error.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'CPF, Email or RA aleardy exists',
      );
      return;
    }
  }

  if (student) {
    apiResponse.result(res, student, httpStatusCodes.CREATED);
    return;
  }
  apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
};

const deleteStudent: IController = async (req, res) => {
  try {
    await studentService.deleteStudent(
      parseInt(req.params.id, 10),
    );
  } catch (error) {}

  apiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
};

const getStudents: IController = async (req, res) => {
  let students;
  try {
    students = await studentService.getStudents();
  } catch (error) {}

  if (students) {
    apiResponse.result(res, students, httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
};

const getStudentByCpf: IController = async (req, res) => {
  let student;
  try {
    student = await studentService.getStudentByCpf(req.params.cpf);
  } catch (error) {}

  if (student) {
    apiResponse.result(res, student, httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
};

const getStudentByRA: IController = async (req, res) => {
  let student;
  try {
    const { ra } = req.params;
    student = await studentService.getStudentByRA(parseInt(ra, 10));
  } catch (error) {}

  if (student) {
    apiResponse.result(res, student, httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
};

export default {
  create,
  getStudents,
  deleteStudent,
  getStudentByCpf,
  getStudentByRA,
};
