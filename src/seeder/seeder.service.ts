import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@schemas/products';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async seed() {
    console.log('Seeding data...');
    const jsonData = readFileSync('./src/seeder/data.json', 'utf8');
    const data = JSON.parse(jsonData);

    await this.productModel.deleteMany({});
    await this.productModel.insertMany(data);
    console.log('Seeding data completed');
  }
}
