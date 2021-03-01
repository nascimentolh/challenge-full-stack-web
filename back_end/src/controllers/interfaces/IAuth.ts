import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';

export interface ILoginSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string;
    password: string;
  };
}
