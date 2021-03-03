import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';

export interface ICreateStudentSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    ra: number;
    cpf: string;
    name: string;
    email: string;
  };
}
