import userService from '../services/user.service';
import apiResponse from '../utils/apiResponse';

import httpStatusCodes from 'http-status-codes';
import IController from 'IController';

const create: IController = async (req, res) => {
  let user;
  try {
    console.log(req.body);
    user = await userService.createUser(req.body);
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
