import IController from 'IController';
import { generateToken } from '../utils/crypto';
import authService from '../services/auth.service';
import apiResponse from '../utils/apiResponse';
import httpStatusCodes from 'http-status-codes';
import { ValidatedRequest } from 'express-joi-validation';
import { ILoginSchema } from './interfaces/IAuth';
import { sanitizeUser } from '../utils/api';

const login: IController = async (
  req: ValidatedRequest<ILoginSchema>,
  res,
) => {
  const user = await authService.login(req.body);
  if (user) {
    const token = generateToken(user);
    apiResponse.result(
      res,
      { ...user, ...{ token } },
      httpStatusCodes.OK,
    );
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      'Invalid email or password',
    );
  }
};

export default {
  login,
};
