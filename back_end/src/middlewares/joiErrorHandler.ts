import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

export default (
  err: ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err && err.type) {
    console.log(err.error.details);
    const error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details: err.error.message,
    };
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
  return next(err);
};
