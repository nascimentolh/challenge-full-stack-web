import { User } from '../entities/user/user.entity';
import {
  IUserCreateDTO,
  IUserUpdateByStudentDTO,
} from './interfaces/IUsersService';
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

const updateByStudent = async (
  id: number,
  data: IUserUpdateByStudentDTO,
) => {
  let user = await getRepository(User).findOne({ id });
  if (user) {
    user.name = data.name;
    user.email = data.email;
    return await getRepository(User).save(user);
  }
  return null;
};

const updateUser = async (user: User) => {
  return await getRepository(User).save(user);
};

export default {
  create,
  getUserByEmail,
  updateByStudent,
  updateUser,
};
