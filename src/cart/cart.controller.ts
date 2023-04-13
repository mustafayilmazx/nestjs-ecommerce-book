import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() createCartDto: CreateCartDto, @Req() req) {
    return this.cartService.addProductToCart(createCartDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getCart(@Req() req) {
    return this.cartService.getCartByUser(req.user);
  }
}
