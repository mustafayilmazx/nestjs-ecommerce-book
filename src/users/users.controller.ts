import { ChangePasswordDto, CreateUserDto } from '@dtos/index';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  public async signup(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Post('/change-password')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return await this.usersService.changePassword(changePasswordDto, req.user);
  }
}
