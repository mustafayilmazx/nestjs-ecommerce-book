import { ERROR_MESSAGES } from '@consts/error-messages';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@schemas/products';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async getOneOrFail(id: string): Promise<Product> {
    const product = await this.getOne(id);

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    return product;
  }

  public async search(query: string): Promise<Product[]> {
    const products = await this.productModel.find({
      $text: { $search: query },
    });

    return products;
  }

  public async getMany(productIds: string[]): Promise<Product[]> {
    const products = await this.productModel.find({
      _id: { $in: productIds },
    });

    return products;
  }

  public async getOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }
}
