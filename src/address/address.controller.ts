import { CreateAddressDto, UpdateAddressDto } from '@dtos/index';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('Address')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  public async create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    return this.addressService.create(createAddressDto, req.user);
  }

  @Get()
  public async findAll(@Req() req) {
    return this.addressService.findAll(req.user);
  }

  @Patch(':addressId')
  public async update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() req,
  ) {
    return this.addressService.update(updateAddressDto, addressId, req.user);
  }

  @Delete(':addressId')
  public async remove(@Param('addressId') addressId: string, @Req() req) {
    return await this.addressService.remove(addressId, req.user);
  }
}
