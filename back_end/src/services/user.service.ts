import { User } from '../database/entities/user/user.entity';
import {
  IUserCreateDTO,
  IUserUpdateByStudentDTO,
} from './interfaces/IUsersService';
import { generatePass } from '../utils/crypto';
import { getRepository } from 'typeorm';

const create = async (data: IUserCreateDTO) => {
  const newUser = new User();
  newUser.email = data.email;
  newUser.password = await generatePass(data.password);
  newUser.name = data.name;

  return await getRepository(User).save(newUser);
};

const getUsers = async () => {
  return await getRepository(User)
    .createQueryBuilder('user')
    .select(['user.id', 'user.name', 'user.email', 'user.isStaff'])
    .getMany();
};

const getUserByEmail = async (email: string) => {
  return await getRepository(User).findOne({ email });
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
  getUsers,
  getUserByEmail,
  updateByStudent,
  updateUser,
};
