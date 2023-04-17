import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class PaginationDto {
  @ApiProperty({
    required: false,
    description: "The page number",
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number = 1;
}
