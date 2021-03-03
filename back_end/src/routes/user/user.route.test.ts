import request, { CallbackHandler } from 'supertest';
import routes from './user.route';
import app from '../../config/express';

import userService from '../../services/user.service';
import { verifyToken } from '../../utils/crypto';
import authService from '../../services/auth.service';

describe('Test User Routes', () => {
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
  it('POST /api/users  - User register with valid body', (done: CallbackHandler) => {
    userService.create = jest.fn().mockReturnValue({ id: 1 });
    return request(app.use(routes))
      .post('/api/users')
      .send({
        email: 'tony@starkindustries.com',
        password: 'pepperPotts@',
        name: 'Tony Stark',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(201)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({ data: { id: 1 }, success: true }),
        );
        expect(userService.create).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('POST /api/users - User register with invalid body', (done: CallbackHandler) => {
    userService.create = jest.fn().mockReturnValue({ id: 1 });

    return request(app.use(routes))
      .post('/api/users')
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(userService.create).toHaveBeenCalledTimes(0);
      })
      .end(done);
  });

  it('POST /api/users - User register with invalid user', (done: CallbackHandler) => {
    userService.create = jest.fn().mockReturnValue(undefined);
    return request(app.use(routes))
      .post('/api/users')
      .send({
        email: 'tony@starkindustries.com',
        password: 'pepperPotts@',
        name: 'Tony Stark',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(userService.create).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('POST /api/users - User register with duplicate email', (done: CallbackHandler) => {
    userService.create = jest.fn().mockImplementation(() => {
      // @ts-ignore
      throw { code: '23505' };
    });
    return request(app.use(routes))
      .post('/api/users')
      .send({
        email: 'tony@starkindustries.com',
        password: 'pepperPotts@',
        name: 'Tony Stark',
      })
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(userService.create).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/users - Return users list', (done: CallbackHandler) => {
    userService.getUsers = jest.fn().mockReturnValue([
      {
        name: 'Tony Stark',
        email: 'tony@starkindustries.com',
        id: 1,
        isStaff: true,
      },
      {
        name: 'Tia May (May Parker)',
        email: 'may@mail.com',
        id: 2,
        isStaff: false,
      },
    ]);
    return request(app.use(routes))
      .get('/api/users')
      .set({ Authorization: 'Bearer validToken' })
      .expect(200)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({
            data: [
              {
                name: 'Tony Stark',
                email: 'tony@starkindustries.com',
                id: 1,
                isStaff: true,
              },
              {
                name: 'Tia May (May Parker)',
                email: 'may@mail.com',
                id: 2,
                isStaff: false,
              },
            ],
            success: true,
          }),
        );
        expect(userService.getUsers).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });
  it('GET /api/users - Return users list blank', (done: CallbackHandler) => {
    userService.getUsers = jest.fn().mockReturnValue(null);
    return request(app.use(routes))
      .get('/api/users')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(userService.getUsers).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/users/:email/email - Return user by email', (done: CallbackHandler) => {
    userService.getUserByEmail = jest.fn().mockReturnValue({
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      id: 1,
      isStaff: true,
    });

    return request(app.use(routes))
      .get('/api/users/tony@starkindustries.com/email')
      .set({ Authorization: 'Bearer validToken' })
      .expect(200)
      .expect((res: any) => {
        expect(res.text).toBe(
          JSON.stringify({
            data: {
              name: 'Tony Stark',
              email: 'tony@starkindustries.com',
              id: 1,
              isStaff: true,
            },
            success: true,
          }),
        );
        expect(userService.getUserByEmail).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('GET /api/users/:email/email - Return user by email blank', (done: CallbackHandler) => {
    userService.getUserByEmail = jest.fn().mockReturnValue(null);
    return request(app.use(routes))
      .get('/api/users/invader@mail.com/email')
      .set({ Authorization: 'Bearer validToken' })
      .expect(204)
      .expect((res: any) => {
        expect(userService.getUserByEmail).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('PUT /api/users/:id - Update user by Student Module', (done: CallbackHandler) => {
    userService.updateByStudent = jest.fn().mockReturnValue({
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      id: 1,
      isStaff: true,
    });
    return request(app.use(routes))
      .put('/api/users/1')
      .set({ Authorization: 'Bearer validToken' })
      .send({
        name: 'Antony Stark',
        email: 'antony@starkindustries.com',
      })
      .expect(200)
      .expect((res: any) => {
        expect(userService.updateByStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('PUT /api/users/:id - Update user by Student Module blank dont search user', (done: CallbackHandler) => {
    userService.updateByStudent = jest.fn().mockReturnValue(null);
    return request(app.use(routes))
      .put('/api/users/99')
      .set({ Authorization: 'Bearer validToken' })
      .send({
        name: 'Antony Stark',
        email: 'antony@starkindustries.com',
      })
      .expect(204)
      .expect((res: any) => {
        expect(userService.updateByStudent).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });
});
