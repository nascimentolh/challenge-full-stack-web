import AuthService from './auth.service';
import { mockRepository } from '../tests/unit/dbMock';
import * as typeorm from 'typeorm';
import { User } from '../database/entities/user/user.entity';
import { verifyPass } from '../utils/crypto';

describe('Auth Service', () => {
  test('getUserByEmail with existing user', async () => {
    mockRepository({
      id: 1,
      password: 'pepperPotts@',
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
    });

    const now = await AuthService.getUserByEmail(
      'tony@starkindustries.com',
    );
    expect(now.id).toBe(1);
    expect(now.name).toBe('Tony Stark');
    expect(now.email).toBe('tony@starkindustries.com');
    expect(now.password).toBe('pepperPotts@');
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      email: 'tony@starkindustries.com',
    });
  });

  test('getUserByEmail with non-existing user', async () => {
    //@ts-ignore
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
    });

    const now = await AuthService.getUserByEmail(
      'tony@starkindustries.com',
    );

    expect(now).toBe(null);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      email: 'tony@starkindustries.com',
    });
  });

  test('login with non-existing user', async () => {
    const user = {
      id: 1,
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      password: 'pepperPotts@',
    };
    //@ts-ignore
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
      save: jest.fn().mockReturnValue(null),
    });
    const now = await AuthService.login({
      email: user.email,
      password: user.password,
    });
    expect(now).toBe(null);
    // @ts-ignore
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      email: user.email,
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalledTimes(0);
  });

  test('login with existing user wrong password', async () => {
    const user = {
      id: 1,
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      password: 'pepperPotts@',
    };
    // @ts-ignore
    mockRepository(user);
    const now = await AuthService.login({
      email: user.email,
      password: user.password,
    });
    expect(now).toBe(null);
    // @ts-ignore
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      email: user.email,
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalledTimes(0);
  });

  test('login with valid credentials', async () => {
    const user = {
      id: 1,
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      password: 'pepperPotts@',
    };
    // @ts-ignore
    mockRepository(user);
    // @ts-ignore
    verifyPass = () => new Promise<boolean>((resolve) => resolve(true));
    const actual = await AuthService.login({
      email: user.email,
      password: user.password,
    });
    expect(actual.id).toBe(user.id);
    expect(actual.email).toBe(user.email);
    // @ts-ignore
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      email: user.email,
    });
    expect(typeorm.getRepository(User).save).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...user,
        lastAccess: expect.any(String),
      }),
    );
  });
});
