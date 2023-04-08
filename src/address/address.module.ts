import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from '@schemas/address';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Address.name, schema: AddressSchema }],
      new ConfigService().get<string>('MONGO_DB_NAME' || 'nest'),
    ),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
