import userService from '../services/user.service';
import apiResponse from '../utils/apiResponse';

import httpStatusCodes from 'http-status-codes';
import IController from 'IController';
import { sanitizeUser } from '../utils/api';
import { ValidatedRequest } from 'express-joi-validation';
import { ICreateUserSchema } from './interfaces/IUser';
import constants from '../constants';

const create: IController = async (
  req: ValidatedRequest<ICreateUserSchema>,
  res,
) => {
  let user;
  try {
    user = sanitizeUser(await userService.create(req.body));
  } catch (error) {
    if (error.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'Email Aleardy Exists',
      );
      return;
    }
  }

  if (user) {
    apiResponse.result(res, user, httpStatusCodes.CREATED);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const getUsers: IController = async (req, res) => {
  let users;
  try {
    users = await userService.getUsers();
  } catch (error) {}

  if (users) {
    apiResponse.result(res, users, httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, {}, httpStatusCodes.NO_CONTENT);
};

const getUserByEmail: IController = async (req, res) => {
  let user;
  try {
    user = await userService.getUserByEmail(req.params.email);
  } catch (error) {}
  if (user) {
    apiResponse.result(res, sanitizeUser(user), httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, {}, httpStatusCodes.NO_CONTENT);
};

const updateByStudent: IController = async (req, res) => {
  let user;
  try {
    user = await userService.updateByStudent(
      parseInt(req.params.id, 10),
      req.body,
    );
  } catch (error) {}

  if (user) {
    apiResponse.result(res, sanitizeUser(user), httpStatusCodes.OK);
    return;
  }

  apiResponse.result(res, {}, httpStatusCodes.NO_CONTENT);
};

export default {
  create,
  getUsers,
  getUserByEmail,
  updateByStudent,
};
