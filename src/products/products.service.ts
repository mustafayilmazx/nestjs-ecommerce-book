import { ERROR_MESSAGES } from '@consts/error-messages';
import { FilterProductDto } from '@dtos/product';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@schemas/products';
import { Model } from 'mongoose';
import { fieldQbs } from './filter.qbs';

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

  public async search(filters: FilterProductDto) {
    const { page, ...restofFields } = filters;
    const validFields = ['title', 'authors', 'maxPrice', 'minPrice', 'rating', 'maxPage', 'minPage', 'page'];
    const filteredFields = Object.keys(restofFields).filter((key) => validFields.includes(key));
    const query = filteredFields.reduce((obj, field) => {
      obj[field] = restofFields[field];
      return obj;
    }, {});
    const builtQuery = await this.queryBuilder(query);
    return this.findAll(builtQuery, page);
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

  private async queryBuilder(filters) {
    const filteringKeys = Object.keys(filters);
    const builtQuery = []
    for (let index = 0; index < filteringKeys.length; index++) {
      const filterKey = filteringKeys[index];
      const fieldQueryBuilder = fieldQbs[filterKey];
      if (!fieldQueryBuilder) continue;

      builtQuery.push(fieldQueryBuilder(filters[filterKey]));
    }
    return builtQuery;
  }

  private async findAll(filters, page) {
    const limit = 10;
    const skip = (page - 1) * limit;
    const finalFilters = filters.length ? { $and: filters } : {};

    return this.productModel.find(
      finalFilters,
      { __v: 0 },
      { skip, limit });
  }
}
