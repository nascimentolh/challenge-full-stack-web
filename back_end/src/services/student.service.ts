import { getRepository } from 'typeorm';
import { Student } from '../entities/user/student.entity';
import { IStudentCreateDTO } from './interfaces/IStudentsService';
import userService from './user.service';
import { sanitizeStudent } from '../utils/api';

const getStudents = async () => {
  try {
    return await getRepository(Student)
      .createQueryBuilder('student')
      .select(['student', 'user.name', 'user.email', 'user.id'])
      .leftJoin('student.user', 'user')
      .paginate();
  } catch (error) {
    return null;
  }
};

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

  const user = await userService.create({
    email: data.email,
    name: data.name,
    password,
  });

  console.log(user);

  const newStudent = new Student();
  newStudent.cpf = data.cpf;
  newStudent.ra = data.ra;
  newStudent.user = user;

  return sanitizeStudent(await getRepository(Student).save(newStudent));
};

export default {
  createStudent,
  getStudents,
  getStudentByCpf,
  getStudentByRA,
};
