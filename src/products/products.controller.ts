import { FilterProductDto } from '@dtos/product';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async search(@Query() filterProductDto: FilterProductDto) {
    return await this.productsService.search(filterProductDto);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.productsService.findOne(id);
  // }
}
