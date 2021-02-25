import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import { IOverrideRequest } from './interfaces/IApiResponse';

export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = 200,
  ) => {
    res.status(status);
    res.json({ data, success: true });
  };

  static error = (
    res: Response,
    status: number = 400,
    error: string = httpStatusCodes.getStatusText(status),
    override: IOverrideRequest = null,
  ) => {
    res.status(status).json({
      error: {
        message: error,
      },
      success: false,
    });
  };
}
