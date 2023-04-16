import { ERROR_MESSAGES } from '@consts/error-messages';
import { CartDao, CartItemDao } from '@daos/index';
import { AddProductToCartDto } from '@dtos/index';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '@schemas/cart/cart.schema';
import { Product } from '@schemas/products';
import { Model } from 'mongoose';
import { ProductService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly productService: ProductService,
  ) {}

  public async addProductToCart(
    { productId, quantity }: AddProductToCartDto,
    user,
  ) {
    const product = await this.productService.getOneOrFail(productId);
    const cart = await this.getCart(user.userId, productId);

    if (cart) {
      cart.quantity += quantity;
      await cart.save();
    } else {
      await this.cartModel.create({
        ownerId: user.userId,
        productName: product.title,
        productId,
        quantity,
      });
    }

    return this.getCartByUser(user);
  }

  public async updateProductQuantity(
    { productId, quantity }: AddProductToCartDto,
    user,
  ) {
    const cart = await this.getCart(user.userId, productId);

    if (cart) {
      cart.quantity = quantity;
      await cart.save();
      return this.getCartByUser(user);
    }

    throw new BadRequestException(ERROR_MESSAGES.PRODUCT_NOT_IN_CART);
  }

  public async removeProductFromCart(productId: string, user) {
    await this.cartModel.deleteOne({ ownerId: user.userId, productId }).exec();
  }

  public async clearCart(user) {
    await this.cartModel.deleteMany({ ownerId: user.userId }).exec();
  }

  public async getCartByUser(user): Promise<CartDao> {
    const cart = await this.cartModel
      .find({ ownerId: user.userId })
      .lean()
      .exec();
    const productIds = cart.map((item) => item.productId);

    const products = await this.productService.getMany(productIds);
    const { items, totalPrice } = this.mapCartItems(cart, products);

    return { totalPrice, products: items };
  }

  private async getCart(userId: string, productId: string) {
    return this.cartModel.findOne({ ownerId: userId, productId });
  }

  private mapCartItems(
    cart: Cart[],
    products: Product[],
  ): { items: CartItemDao[]; totalPrice: number } {
    const items: CartItemDao[] = [];

    let totalPrice = 0;
    for (const item of cart) {
      const product = products.find((p) => p._id.toString() === item.productId);

      if (product) {
        const cartItem = new CartItemDao();
        cartItem.productId = item.productId;
        cartItem.productName = item.productName;
        cartItem.price = product.price;
        cartItem.quantity = item.quantity;
        items.push(cartItem);

        totalPrice += product.price * item.quantity;
      }
    }

    totalPrice = Number(totalPrice.toFixed(2));
    return { items, totalPrice };
  }
}
