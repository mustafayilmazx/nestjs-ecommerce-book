import { CreateAddressDto, UpdateAddressDto } from '@dtos/address';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    return this.addressService.create(createAddressDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async findAll(@Req() req) {
    return this.addressService.findAll(req.user);
  }

  @Patch(':addressId')
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req,
  ) {
    return this.addressService.update(updateAddressDto, addressId, req.user);
  }

  @Delete(':addressId')
  @UseGuards(AuthGuard('jwt'))
  public async remove(@Param('addressId') addressId: string, @Req() req) {
    return await this.addressService.remove(addressId, req.user);
  }
}
