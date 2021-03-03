import request, { CallbackHandler } from 'supertest';
import routes from './auth.route';
import app from '../../config/express';
import { verifyToken } from '../../utils/crypto';
import authService from '../../services/auth.service';
import studentService from '../../services/student.service';

describe('Test Auth Routes', () => {
  it('POST /api/auth - Authenticate user with valid body', (done: CallbackHandler) => {
    authService.login = jest.fn().mockReturnValue({
      name: 'Stan Lee',
      email: 'stan_theboss@marvel.com',
      id: 1,
      isActive: true,
      isStaff: true,
      token: 'thisIsAValidToken',
    });

    return request(app.use(routes))
      .post('/api/auth')
      .set({ Authorization: 'Bearer validToken' })
      .send({ email: 'stan_theboss@marvel.com', password: 'theboss' })
      .expect(201)
      .expect((res: any) => {
        expect(authService.login).toHaveBeenCalledTimes(1);
      })
      .end(done);
  });

  it('POST /api/auth - Non authenticate user with invalid body', (done: CallbackHandler) => {
    authService.login = jest.fn().mockReturnValue(undefined);

    return request(app.use(routes))
      .post('/api/auth')
      .set({ Authorization: 'Bearer validToken' })
      .expect(400)
      .expect((res: any) => {
        expect(authService.login).toHaveBeenCalledTimes(0);
      })
      .end(done);
  });
});
