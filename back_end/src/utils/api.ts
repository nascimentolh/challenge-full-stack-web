import { Student } from '../entities/user/student.entity';
import { User } from '../entities/user/user.entity';

const sanitizeUser = (user: User) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const sanitizeStudent = (student: Student) => {
  const { password, ...studentWithOutPass } = student.user;
  const { user, ...studentWithOutUser } = student;
  return { studentWithOutUser, studentWithOutPass };
};

export { sanitizeUser, sanitizeStudent };
