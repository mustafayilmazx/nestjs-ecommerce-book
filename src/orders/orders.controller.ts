import { CreateOrderDto } from '@dtos/index';
import { PaginationDto } from '@dtos/pagination/pagination.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@Controller('order')
@ApiTags('Order')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({ description: 'Order created' })
  @Post()
  public async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @ApiOkResponse({ description: 'Orders returned' })
  @Get()
  findAll(@Req() req, @Query() query: PaginationDto) {
    return this.ordersService.findAll(req.user, query);
  }

}
