import userService from '../services/user.service';
import apiResponse from '../utils/apiResponse';

import httpStatusCodes from 'http-status-codes';
import IController from 'IController';
import { sanitizeUser } from '../utils/api';

const create: IController = async (req, res) => {
  let user;
  try {
    user = sanitizeUser(await userService.create(req.body));
  } catch (error) {
    console.log(error);
  }

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

export default {
  create,
  getUserByEmail,
};
