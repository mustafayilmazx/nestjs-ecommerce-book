import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenDao  {
  @ApiProperty(
    {
      description: 'The access token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvb2tsYW5kLmNvbSIsImlhdCI6MTYxNjQ2NjQ2MCwi',
    },
  )
  @Expose()
  access_token: string;
}
