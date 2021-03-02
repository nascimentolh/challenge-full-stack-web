import { getRepository } from 'typeorm';
import { Student } from '../entities/user/student.entity';
import { IStudentCreateDTO } from './interfaces/IStudentsService';
import userService from './user.service';
import { sanitizeStudent } from '../utils/api';
import { User } from '../entities/user/user.entity';

const createStudent = async (data: IStudentCreateDTO) => {
  const password = data.cpf.slice(0, 6);
  const user = await userService.create({
    email: data.email,
    name: data.name,
    password,
  });

  const newStudent = new Student();
  newStudent.cpf = data.cpf;
  newStudent.ra = data.ra;
  newStudent.user = user;

  return sanitizeStudent(await getRepository(Student).save(newStudent));
};

const deleteStudent = async (id: number) => {
  try {
    await getRepository(Student).delete(id);
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.student', 'student')
      .where('student.id = :id', { id })
      .getOne();
    if (user) {
      await getRepository(User).delete(user.id);
    }
  } catch (error) {}
};

const getStudents = async () => {
  try {
    return await getRepository(Student)
      .createQueryBuilder('student')
      .select(['student', 'user.name', 'user.email', 'user.id'])
      .leftJoin('student.user', 'user')
      .paginate();
  } catch (error) {}
};

const getStudentByRA = async (studentRA: number) => {
  try {
    return await getRepository(Student).findOne({ ra: studentRA });
  } catch (error) {}
};

const getStudentByCpf = async (studentCPF: string) => {
  try {
    return await getRepository(Student).findOne({
      cpf: studentCPF,
    });
  } catch (error) {}
};

export default {
  createStudent,
  deleteStudent,
  getStudents,
  getStudentByCpf,
  getStudentByRA,
};
