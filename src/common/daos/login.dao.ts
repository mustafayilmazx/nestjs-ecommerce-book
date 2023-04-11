import { Expose } from 'class-transformer';
import { User } from './user.dao';

export class LoginDao extends User {
  @Expose()
  token: string;
}
