import UserService from './user.service';
import { mockQueryBuilder, mockRepository } from '../tests/unit/dbMock';
import * as typeorm from 'typeorm';
import { User } from '../entities/user/user.entity';

describe('User Service', () => {
  test('getUserByEmail with existing user', async () => {
    mockRepository({
      id: 1,
      password: 'pepperPotts@',
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
    });

    const now = await UserService.getUserByEmail(
      'tony@starkindustries.com',
    );
    expect(now.id).toBe(1);
    expect(now.name).toBe('Tony Stark');
    expect(now.email).toBe('tony@starkindustries.com');
    //@ts-ignore
    expect(now.password).toBe(undefined);
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

    const now = await UserService.getUserByEmail(
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

  test('create', async () => {
    const user = {
      id: 1,
      password: 'pepperPotts@',
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
    };
    mockRepository(user);
    const now = await UserService.create({
      name: user.name,
      password: user.password,
      email: user.email,
    });
    expect(now.id).toBe(1);
    expect(now.password).toBe('pepperPotts@');
    expect(now.name).toBe(user.name);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: user.email,
        password: expect.any(String),
        name: user.name,
      }),
    );
  });

  test('updateByStudent with existing user', async () => {
    mockRepository({
      id: 1,
      password: 'pepperPotts@',
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
    });

    const update = await UserService.updateByStudent(1, {
      name: 'Antony Stark',
      email: 'antony@starkindustries.com',
    });

    expect(update.id).toBe(1);
    expect(update.name).toBe('Antony Stark');
    expect(update.email).toBe('antony@starkindustries.com');
    expect(typeorm.getRepository(User).save).toHaveBeenCalledTimes(1);
    expect(typeorm.getRepository(User).save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Antony Stark',
        email: 'antony@starkindustries.com',
      }),
    );
  });

  test('updateByStudent with non-existing user', async () => {
    //@ts-ignore
    typeorm.getRepository = jest.fn().mockReturnValue({
      findOne: jest.fn().mockImplementation(() => {}),
    });

    const update = await UserService.updateByStudent(1, {
      name: 'Antony Stark',
      email: 'antony@starkindustries.com',
    });

    expect(update).toBe(null);
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledTimes(
      1,
    );
    expect(typeorm.getRepository(User).findOne).toHaveBeenCalledWith({
      id: 1,
    });
  });

  test('updateUser', async () => {
    const user = {
      createdAt: new Date('2021-03-01T22:32:45.002Z'),
      updatedAt: new Date('2021-03-02T20:30:15.867Z'),
      id: 1,
      email: 'antony@starkindustries.com',
      name: 'Antony Stark',
      password: 'pepperPotts@',
      lastAccess: new Date().toISOString(),
      isStaff: true,
      isActive: true,
    };
    mockRepository(user);
    user.name = 'Tony Stark';
    user.email = 'tony@starkindustries.com';
    //@ts-ignore
    const now = await UserService.updateUser(user);

    expect(now.email).toBe('tony@starkindustries.com');
    expect(now.name).toBe('Tony Stark');
  });

  test('getUsers', async () => {
    mockRepository({
      createdAt: new Date('2021-03-01T22:32:45.002Z'),
      updatedAt: new Date('2021-03-02T20:30:15.867Z'),
      id: 1,
      email: 'antony@starkindustries.com',
      name: 'Antony Stark',
      password: 'pepperPotts@',
      lastAccess: '2021-03-01T22:32:45.002Z',
      isStaff: true,
      isActive: true,
    });

    const now = await UserService.getUsers();

    expect(now).toStrictEqual({
      createdAt: new Date('2021-03-01T22:32:45.002Z'),
      updatedAt: new Date('2021-03-02T20:30:15.867Z'),
      id: 1,
      email: 'antony@starkindustries.com',
      name: 'Antony Stark',
      password: 'pepperPotts@',
      lastAccess: '2021-03-01T22:32:45.002Z',
      isStaff: true,
      isActive: true,
    });
  });
});
