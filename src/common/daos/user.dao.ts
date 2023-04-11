import { Expose } from 'class-transformer';

export class User {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  lname: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;
}
