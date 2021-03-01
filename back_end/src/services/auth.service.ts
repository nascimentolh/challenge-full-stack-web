import { User } from '../entities/user/user.entity';
import { getRepository } from 'typeorm';
import { ILogin } from './interfaces/ILogin';
import { verifyPass } from '../utils/crypto';
import userService from './user.service';
import { sanitizeUser } from '../utils/api';

const getUserByEmail = async (email: string) => {
  try {
    return await getRepository(User).findOne({ email });
  } catch (error) {
    return null;
  }
};

const login = async (data: ILogin) => {
  const user = await getUserByEmail(data.email);
  if (user) {
    if (await verifyPass(data.password, user.password)) {
      user.lastAccess = new Date().toISOString();
      await userService.updateUser(user);
      return sanitizeUser(user);
    }
  }
  return null;
};

export default {
  login,
};
