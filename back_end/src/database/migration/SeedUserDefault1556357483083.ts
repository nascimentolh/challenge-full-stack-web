import {
  getRepository,
  MigrationInterface,
  QueryRunner,
} from 'typeorm';
import { User } from '../entities/user/user.entity';
import { CreateDefaultUser } from '../seeds/CreateDefaultUser';

export class SeedUserDefault1556357483083
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    await getRepository(User).save(CreateDefaultUser);
  }

  public async down(_: QueryRunner): Promise<any> {
    // do nothing
  }
}
