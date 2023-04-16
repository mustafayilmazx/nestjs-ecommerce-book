import { CreateOrderDto, UpdateOrderDto } from '@dtos/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '@schemas/index';
import { Model } from 'mongoose';
import { AddressService } from 'src/address/address.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly addressService: AddressService,
    private readonly cartService: CartService,
  ) {}

  public async createOrder(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  public async create({ addressId }: CreateOrderDto, user) {
    const [{ _id, ownerId, ...address }, cart] = await Promise.all([
      this.addressService.getActiveOneOrFail(addressId, user),
      this.cartService.getCartByUser(user),
    ]);

    if (cart.products.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const payload = {
      orderDate: new Date(),
      ownerId: user.userId,
      orderAddress: {...address},
      ...cart,
  }

  await Promise.all([
    this.cartService.clearCart(user),
    this.orderModel.create(payload),
  ]);

  return;
}


  public async findAll({ userId: ownerId }, { page }) {
    const limit = 10;
    const skip = (page - 1) * limit;

    return this.orderModel.find(
      { ownerId },
      { __v: 0 , ownerId: 0, 'orderAddress._id': 0},
      { skip, limit },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
