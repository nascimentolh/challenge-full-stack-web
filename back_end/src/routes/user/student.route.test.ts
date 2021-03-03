import request, { CallbackHandler } from 'supertest';
import routes from './student.route';
import app from '../../config/express';
import { verifyToken } from '../../utils/crypto';
import authService from '../../services/auth.service';
import studentService from '../../services/student.service';

describe('Test Students Routes', () => {
  beforeEach(() => {
    // @ts-ignore
    verifyToken = () =>
      new Promise<any>((resolve) =>
        resolve({
          name: 'Stan Lee',
          email: 'stan_theboss@marvel.com',
          id: 1,
          isActive: true,
          isStaff: true,
        }),
      );

    authService.getUserByEmail = jest.fn().mockReturnValue({
      name: 'Stan Lee',
      email: 'stan_theboss@marvel.com',
      id: 1,
      isActive: true,
      isStaff: true,
    });
  });
  it('POST /api/students - Student register with valid body', (done: CallbackHandler) => {
    studentService.createStudent = jest.fn().mockReturnValue({ id: 1 });
    return request(app.use(routes))
      .post('/api/students')
      .send({
        ra: 123,
        cpf: '12984432615',
        email: 'peter@midtownhighschool.com',
        name: 'Peter Parker',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(201)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({ data: { id: 1 }, success: true }),
        );
        expect(studentService.createStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('POST /api/students - Student register with invalid body', (done: CallbackHandler) => {
    studentService.createStudent = jest.fn().mockReturnValue({ id: 1 });

    return request(app.use(routes))
      .post('/api/students')
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(studentService.createStudent).toHaveBeenCalledTimes(0);
      })
      .end(done);
  });

  it('POST /api/students - Student register with invalid student', (done: CallbackHandler) => {
    studentService.createStudent = jest.fn().mockReturnValue(undefined);
    return request(app.use(routes))
      .post('/api/students')
      .send({
        ra: 123,
        cpf: '12984432615',
        email: 'peter@midtownhighschool.com',
        name: 'Peter Parker',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(studentService.createStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('POST /api/students - Student register with duplicate registry', (done: CallbackHandler) => {
    studentService.createStudent = jest.fn().mockImplementation(() => {
      throw { code: '23505' };
    });
    return request(app.use(routes))
      .post('/api/students')
      .send({
        ra: 123,
        cpf: '12984432615',
        email: 'peter@midtownhighschool.com',
        name: 'Peter Parker',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(studentService.createStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/students - Return students list', (done: CallbackHandler) => {
    studentService.getStudents = jest.fn().mockReturnValue([
      {
        ra: 123,
        cpf: '12984432615',
        email: 'peter@midtownhighschool.com',
        name: 'Peter Parker',
      },
      {
        ra: 124,
        cpf: '12984432616',
        name: 'Tia May (May Parker)',
        email: 'may@mail.com',
      },
    ]);
    return request(app.use(routes))
      .get('/api/students')
      .set({ Authorization: 'Bearer validToken' })
      .expect(200)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({
            data: [
              {
                ra: 123,
                cpf: '12984432615',
                email: 'peter@midtownhighschool.com',
                name: 'Peter Parker',
              },
              {
                ra: 124,
                cpf: '12984432616',
                name: 'Tia May (May Parker)',
                email: 'may@mail.com',
              },
            ],
            success: true,
          }),
        );
        expect(studentService.getStudents).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });
  it('GET /api/students - Return students list blank', (done: CallbackHandler) => {
    studentService.getStudents = jest.fn().mockReturnValue(null);
    return request(app.use(routes))
      .get('/api/students')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(studentService.getStudents).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/students/:ra/ra - Return student by ra', (done: CallbackHandler) => {
    studentService.getStudentByRA = jest.fn().mockReturnValue({
      ra: 124,
      cpf: '12984432616',
      name: 'Tia May (May Parker)',
      email: 'may@mail.com',
    });

    return request(app.use(routes))
      .get('/api/students/124/ra')
      .set({ Authorization: 'Bearer validToken' })
      .expect(200)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({
            data: {
              ra: 124,
              cpf: '12984432616',
              name: 'Tia May (May Parker)',
              email: 'may@mail.com',
            },
            success: true,
          }),
        );
        expect(studentService.getStudentByRA).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/students/:ra/ra - Return student by ra blank', (done: CallbackHandler) => {
    studentService.getStudentByRA = jest.fn().mockReturnValue(null);

    return request(app.use(routes))
      .get('/api/students/12312312/ra')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(studentService.getStudentByRA).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/students/:cpf/cpf - Return student by cpf', (done: CallbackHandler) => {
    studentService.getStudentByCpf = jest.fn().mockReturnValue({
      ra: 124,
      cpf: '12984432616',
      name: 'Tia May (May Parker)',
      email: 'may@mail.com',
    });

    return request(app.use(routes))
      .get('/api/students/12984432616/cpf')
      .set({ Authorization: 'Bearer validToken' })
      .expect(200)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({
            data: {
              ra: 124,
              cpf: '12984432616',
              name: 'Tia May (May Parker)',
              email: 'may@mail.com',
            },
            success: true,
          }),
        );
        expect(studentService.getStudentByCpf).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/students/:cpf/cpf - Return student by cpf blank', (done: CallbackHandler) => {
    studentService.getStudentByCpf = jest.fn().mockReturnValue(null);

    return request(app.use(routes))
      .get('/api/students/12184432616/cpf')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(studentService.getStudentByCpf).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('DELETE /api/:id - Delete user by id', (done: CallbackHandler) => {
    studentService.deleteStudent = jest.fn().mockReturnValue(undefined);

    return request(app.use(routes))
      .delete('/api/students/1')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(studentService.deleteStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });
});
