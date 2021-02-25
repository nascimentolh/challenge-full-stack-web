import { User } from '../entities/user/user.entity';
import { IUserCreateDTO } from './interfaces/IUsersService';
import { generatePass } from '../utils/crypto';
import { getRepository } from 'typeorm';

const createUser = async (data: IUserCreateDTO) => {
  const newUser = new User();
  newUser.email = data.email;
  newUser.password = await generatePass(data.password);
  newUser.name = data.name;

  return await getRepository(User).save(newUser);
};

export default {
  createUser,
};
