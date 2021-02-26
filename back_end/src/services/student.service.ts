import { getRepository } from 'typeorm';
import { Student } from '../entities/user/student.entity';
import { IStudentCreateDTO } from './interfaces/IStudentsService';
import userService from './user.service';
import { sanitizeStudent } from '../utils/api';
import { generatePass } from '../utils/crypto';
import { User } from '../entities/user/user.entity';

const getStudentByRA = async (studentRA: number) => {
  try {
    return await getRepository(Student).findOne({ ra: studentRA });
  } catch (error) {
    return null;
  }
};

const getStudentByCpf = async (studentCPF: string) => {
  try {
    return await getRepository(Student).findOne({
      cpf: studentCPF,
    });
  } catch (error) {
    return null;
  }
};

const createStudent = async (data: IStudentCreateDTO) => {
  const password = data.cpf.slice(0, 6);
  const newStudent = new Student();
  newStudent.cpf = data.cpf;
  newStudent.ra = data.ra;
  const student = await getRepository(Student).save(newStudent);

  const newUser = new User();
  newUser.email = data.email;
  newUser.password = await generatePass(password);
  newUser.name = data.name;
  newUser.student = student;
  await getRepository(User).save(newUser);

  return sanitizeStudent(student);
};

export default {
  getStudentByCpf,
  getStudentByRA,
  createStudent,
};
