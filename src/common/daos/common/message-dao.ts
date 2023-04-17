import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MessageDao {
  @ApiProperty({
    description: 'The message',
    example: 'Hello World',
  })
  @IsString()
  message: string;
}
