import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'New password',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  newPassword: string;

  @ApiProperty({
    type: String,
    description: 'Old password',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @Length(8, 20)
  oldPassword: string;
}
