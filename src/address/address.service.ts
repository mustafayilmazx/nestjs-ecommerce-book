import { ERROR_MESSAGES } from '@consts/index';
import { CreateAddressDto, UpdateAddressDto } from '@dtos/address';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from '@schemas/address';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>,
  ) {}

  public async create(createAddressDto: CreateAddressDto, user) {
    const payload = {
      ...createAddressDto,
      ownerId: user.userId,
    };

    return this.addressModel.create(payload);
  }

  public async findAll(user) {
    // find all by ownerId and isDeleted must be undefined or false
    return this.addressModel.find({
      ownerId: user.userId,
      isDeleted: { $exists: false },
    });
  }

  public async update(updateAddressDto: UpdateAddressDto, addressId, user) {
    await this.getActiveOneOrFail(addressId, user);

    const filters = { _id: addressId, ownerId: user.userId };
    const update = { ...updateAddressDto };

    return this.updateOne(filters, update);
  }

  public async remove(addressId, user) {
    await this.getActiveOneOrFail(addressId, user);

    const filters = { _id: addressId, ownerId: user.userId };
    const update = { isDeleted: true };

    return this.updateOne(filters, update);
  }

  private async getOne(addressId, user) {
    return this.addressModel.findOne({ _id: addressId, ownerId: user.userId });
  }

  private async getOneOrFail(addressId, user) {
    const address = await this.getOne(addressId, user);
    if (!address) {
      throw new HttpException(
        ERROR_MESSAGES.ADDRESS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return address;
  }

  private async getActiveOneOrFail(addressId, user) {
    const address = await this.getOne(addressId, user);
    if (!address || address.isDeleted) {
      throw new HttpException(
        ERROR_MESSAGES.ADDRESS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return address;
  }

  private async updateOne(filters, update) {
    // update with $set
    return this.addressModel.updateOne(filters, { $set: update });
  }
}
