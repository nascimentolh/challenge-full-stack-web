import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';

export interface ICreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string;
    name: string;
    password: string;
  };
}
