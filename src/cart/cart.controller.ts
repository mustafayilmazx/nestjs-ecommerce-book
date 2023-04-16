import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  public async updateCart(@Body() createCartDto: CreateCartDto, @Req() req) {
    return this.cartService.updateProductQuantity(createCartDto, req.user);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  public async deleteCart(@Param('id') productId, @Req() req) {
    return this.cartService.removeProductFromCart(productId, req.user);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  public async clearCart(@Req() req) {
    return this.cartService.clearCart(req.user);
  }
}
