import { User } from '../entities/user.entity';

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

export { sanitizeUser };
