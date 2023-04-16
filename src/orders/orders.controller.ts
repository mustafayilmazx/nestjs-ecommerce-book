import { CreateOrderDto, UpdateOrderDto } from '@dtos/index';
import { PaginationDto } from '@dtos/pagination/pagination.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Req() req,
    @Query() query: PaginationDto,
  ) {
    return this.ordersService.findAll(req.user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
