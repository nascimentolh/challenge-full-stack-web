import { User } from '../entities/user.entity';
import { IUserCreateDTO } from './interfaces/IUsersService';
import { generatePass } from '../utils/crypto';
import { sanitizeUser } from '../utils/api';
import { getRepository } from 'typeorm';

const createUser = async (data: IUserCreateDTO) => {
  const newUser = new User();
  newUser.email = data.email;
  newUser.password = await generatePass(data.password);
  newUser.name = data.name;

  return sanitizeUser(await getRepository(User).save(newUser));
};

export default {
  createUser,
};
