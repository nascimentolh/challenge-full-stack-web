import { NextFunction, Response } from 'express';
import IRequest from 'IRequest';
import { Student } from '../entities/user/student.entity';
import { User } from '../entities/user/user.entity';
import httpStatusCodes from 'http-status-codes';
import apiResponse from './apiResponse';

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const sanitizeStudent = (student: Student) => {
  const { password, ...studentWithOutPass } = student.user;
  const { user, ...studentWithOutUser } = student;
  return { studentWithOutUser, studentWithOutPass };
};

const restrictToStaff = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.isStaff) {
    apiResponse.error(res, httpStatusCodes.FORBIDDEN);
    return;
  }
  next();
};

export { sanitizeUser, sanitizeStudent, restrictToStaff };
