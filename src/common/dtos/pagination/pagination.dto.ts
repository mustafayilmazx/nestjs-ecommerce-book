import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number = 1;
}
