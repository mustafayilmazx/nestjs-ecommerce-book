import { ERROR_MESSAGES } from '@consts/index';
import { CartDao, MessageDao } from '@daos/index';
import { CreateCartItemDto } from '@dtos/index';
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
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';

@Controller('cart')
@ApiTags('Cart')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiNotFoundResponse({ description: ERROR_MESSAGES.PRODUCT_NOT_FOUND, type: MessageDao })
  @ApiCreatedResponse({ description: 'Product added to cart', type: CartDao })
  @Post()
  public async create(@Body() createCartItemDto: CreateCartItemDto, @Req() req): Promise<CartDao> {
    return this.cartService.addProductToCart(createCartItemDto, req.user);
  }

  @ApiOkResponse({ description: 'Cart returned', type: CartDao })
  @Get()
  public async getCart(@Req() req): Promise<CartDao> {
    return this.cartService.getCartByUser(req.user);
  }

  @ApiOkResponse({ description: 'Product quantity updated', type: CartDao })
  @ApiNotFoundResponse({ description: ERROR_MESSAGES.PRODUCT_NOT_IN_CART, type: MessageDao })
  @Patch()
  public async updateCart(@Body() createCartItemDto: CreateCartItemDto, @Req() req): Promise<CartDao> {
    return this.cartService.updateProductQuantity(createCartItemDto, req.user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteCart(@Param('id') productId, @Req() req) {
    return this.cartService.removeProductFromCart(productId, req.user);
  }

  @Delete()
  @HttpCode(204)
  public async clearCart(@Req() req) {
    return this.cartService.clearCart(req.user);
  }
}


