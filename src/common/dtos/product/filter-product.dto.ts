import { PaginationDto } from "@dtos/pagination/pagination.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterProductDto extends PaginationDto {
  @ApiProperty({ required: false, description: 'Book Title' })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: false, description: 'Book Author' })
  @IsOptional()
  @IsString()
  readonly authors: string;

  @ApiProperty({ required: false, description: 'Maximum Price' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly maxPrice: number;

  @ApiProperty({ required: false, description: 'Minimum Price' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly minPrice: number;

  @ApiProperty({ required: false, description: 'Book Average Rating' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly rating: number;

  @ApiProperty({ required: false, description: 'Book Number of Pages' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly minPage: number;

  @ApiProperty({ required: false, description: 'Book Number of Pages' })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly maxPage: number;
}
