import StudentService from './student.service';
import { mockRepository } from '../tests/unit/dbMock';
import * as typeorm from 'typeorm';
import { Student } from '../database/entities/user/student.entity';

describe('Student Service', () => {
  test('getStudentByCpf with existing student', async () => {
    mockRepository({
      id: 1,
      cpf: '12312312312',
      ra: 1,
    });

    const now = await StudentService.getStudentByCpf('12312312312');
    expect(now.id).toBe(1);
    expect(now.cpf).toBe('12312312312');
    expect(now.ra).toBe(1);
    expect(
      typeorm.getRepository(Student).findOne,
    ).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Student).findOne).toHaveBeenCalledWith(
      {
        cpf: '12312312312',
      },
    );
  });

  test('getStudentByCpf with non-existing student', async () => {
    //@ts-ignore
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
    });

    const now = await StudentService.getStudentByCpf('12312312312');

    expect(now).toBe(undefined);
    expect(
      typeorm.getRepository(Student).findOne,
    ).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Student).findOne).toHaveBeenCalledWith(
      {
        cpf: '12312312312',
      },
    );
  });

  test('getStudentByRA with existing student', async () => {
    mockRepository({
      id: 1,
      cpf: '12312312312',
      ra: 1,
    });

    const now = await StudentService.getStudentByRA(1);
    expect(now.id).toBe(1);
    expect(now.cpf).toBe('12312312312');
    expect(now.ra).toBe(1);
    expect(
      typeorm.getRepository(Student).findOne,
    ).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Student).findOne).toHaveBeenCalledWith(
      {
        ra: 1,
      },
    );
  });

  test('getStudentByRA with non-existing student', async () => {
    //@ts-ignore
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
    });

    const now = await StudentService.getStudentByRA(1);

    expect(now).toBe(undefined);
    expect(
      typeorm.getRepository(Student).findOne,
    ).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(Student).findOne).toHaveBeenCalledWith(
      {
        ra: 1,
      },
    );
  });

  test('createStudent', async () => {
    const student = {
      id: 1,
      cpf: '12312312312',
      name: 'Peter Parker',
      ra: 1,
      email: 'peter@midtownhighschool.com',
      user: {
        id: 1,
        name: 'Peter Parker',
        email: 'peter@midtownhighschool.com',
        password: '123123',
      },
    };
    mockRepository(student);
    const now = await StudentService.createStudent({
      name: student.name,
      cpf: student.cpf,
      ra: student.ra,
      email: student.email,
    });

    expect(now.studentWithOutUser.id).toBe(1);
    expect(now.studentWithOutUser.cpf).toBe('12312312312');
    expect(now.studentWithOutUser.ra).toBe(1);
  });
});
