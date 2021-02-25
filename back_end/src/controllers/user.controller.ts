import userService from '../services/user.service';
import apiResponse from '../utils/apiResponse';

import httpStatusCodes from 'http-status-codes';
import IController from 'IController';
import { sanitizeUser } from '../utils/api';

const create: IController = async (req, res) => {
  let user;
  try {
    user = sanitizeUser(await userService.createUser(req.body));
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

export default {
  create,
};
