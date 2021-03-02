import { restrictToStaff, sanitizeStudent, sanitizeUser } from './api';
import { mockResponse } from '../tests/unit/apiMock';

describe('Test api utilities', () => {
  test('sanitizeUser with possible values', () => {
    const user: any = {
      id: 1,
      password: 'pepperPotts@',
      email: 'tony@starkindustries.com',
    };
    const now = sanitizeUser(user);
    expect(now).toStrictEqual({
      id: 1,
      email: 'tony@starkindustries.com',
    });
  });

  test('sanitizeStudent with possible values', () => {
    const student: any = {
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
    const now = sanitizeStudent(student);
    expect(now).toStrictEqual({
      studentWithOutUser: {
        id: 1,
        cpf: '12312312312',
        name: 'Peter Parker',
        ra: 1,
        email: 'peter@midtownhighschool.com',
      },
      studentWithOutPass: {
        id: 1,
        name: 'Peter Parker',
        email: 'peter@midtownhighschool.com',
      },
    });
  });

  test('restrictToStaff unauthorised', () => {
    const next = jest.fn();
    const response = mockResponse();
    restrictToStaff(
      {
        // @ts-ignore
        user: { isStaff: false },
      },
      response,
      next,
    );
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('restrictToStaff success', () => {
    const next = jest.fn();
    const response = mockResponse();
    restrictToStaff(
      {
        // @ts-ignore
        user: { isStaff: true },
      },
      response,
      next,
    );
    expect(response.status).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
