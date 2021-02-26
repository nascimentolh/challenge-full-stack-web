import { User } from '../entities/user/user.entity';
import { IUserCreateDTO } from './interfaces/IUsersService';
import { generatePass } from '../utils/crypto';
import { sanitizeUser } from '../utils/api';
import { getRepository } from 'typeorm';

const create = async (data: IUserCreateDTO) => {
  const newUser = new User();
  newUser.email = data.email;
  newUser.password = await generatePass(data.password);
  newUser.name = data.name;

  return await getRepository(User).save(newUser);
};

const getUserByEmail = async (email: string) => {
  try {
    return sanitizeUser(await getRepository(User).findOne({ email }));
  } catch (error) {
    return null;
  }
};

export default {
  create,
  getUserByEmail,
};
