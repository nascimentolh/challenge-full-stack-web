import IController from 'IController';
import studentService from '../services/student.service';
import apiResponse from '../utils/apiResponse';
import httpStatusCodes from 'http-status-codes';

const create: IController = async (req, res) => {
  let student;
  try {
    student = await studentService.createStudent(req.body);
  } catch (error) {
    console.log(error);
  }

  if (student) {
    apiResponse.result(res, student, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Invalid');
  }
};

export default {
  create,
};
