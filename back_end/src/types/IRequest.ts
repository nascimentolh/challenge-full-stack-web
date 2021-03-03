import { Request } from 'express';
import { User } from '../database/entities/user/user.entity';

export default interface IRequest extends Request {
  user: User;
  dashboard: boolean;
}
