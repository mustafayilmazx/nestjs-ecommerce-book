import { Expose } from 'class-transformer';
import { UserDao } from './user.dao';

export class LoginDao extends UserDao {
  @Expose()
  token: string;
}
