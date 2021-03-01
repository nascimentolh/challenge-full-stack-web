import userService from '../services/user.service';
import apiResponse from '../utils/apiResponse';

import httpStatusCodes from 'http-status-codes';
import IController from 'IController';
import { sanitizeUser } from '../utils/api';
import { ValidatedRequest } from 'express-joi-validation';
import { ICreateUserSchema } from './interfaces/IUser';

const create: IController = async (
  req: ValidatedRequest<ICreateUserSchema>,
  res,
) => {
  let user;
  try {
    user = sanitizeUser(await userService.create(req.body));
  } catch (error) {}

  if (user) {
    apiResponse.result(res, user, httpStatusCodes.OK);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      'Invalid email or password',
    );
  }
};

const getUserByEmail: IController = async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);
  apiResponse.result(res, user, httpStatusCodes.OK);
};

const updateByStudent: IController = async (req, res) => {
  let user;
  try {
    user = sanitizeUser(
      await userService.updateByStudent(
        parseInt(req.params.id, 10),
        req.body,
      ),
    );
  } catch (error) {
    return null;
  }

  if (user) {
    apiResponse.result(res, user, httpStatusCodes.OK);
  }
};

export default {
  create,
  getUserByEmail,
  updateByStudent,
};
