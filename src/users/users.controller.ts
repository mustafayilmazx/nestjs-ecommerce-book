import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@consts/index';
import { MessageDao } from '@daos/common';
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
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ description: SUCCESS_MESSAGES.USER_CREATED, type: MessageDao })
  @ApiConflictResponse({ description: ERROR_MESSAGES.USER_ALREADY_EXISTS, type: MessageDao })
  @Post('/signup')
  public async signup(@Body() createUserDto: CreateUserDto): Promise<MessageDao> {
    return  this.usersService.createUser(createUserDto);
  }

  @ApiOkResponse({ description: SUCCESS_MESSAGES.PASSWORD_CHANGED, type: MessageDao })
  @ApiBadRequestResponse({ description: ERROR_MESSAGES.WRONG_OLD_PASSWORD, type: MessageDao })
  @ApiBearerAuth("authorization")
  @Post('/change-password')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  public async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req): Promise<MessageDao>{
    return this.usersService.changePassword(changePasswordDto, req.user);
  }
}

