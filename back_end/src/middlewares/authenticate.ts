import { NextFunction, Response } from 'express';
import IRequest from 'IRequest';
import apiResponse from '../utils/apiResponse';
import httpStatusCodes from 'http-status-codes';
import { verifyToken } from '../utils/crypto';
import authService from '../services/auth.service';
import { IDecodedUser } from '../utils/interfaces/ICrypto';
import { sanitizeUser } from '../utils/api';

export default async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const [_, token] = authorizationHeader.split(' ');
    const decoded: IDecodedUser | null = await verifyToken(token);
    if (decoded) {
      const user = sanitizeUser(
        await authService.getUserByEmail(decoded.email),
      );
      if (user) {
        // @ts-ignore
        req.user = user;
      } else {
        apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        return;
      }
    } else {
      apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      return;
    }
  } else {
    apiResponse.error(res, httpStatusCodes.FORBIDDEN);
    return;
  }

  next();
};
