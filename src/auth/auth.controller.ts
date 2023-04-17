import { TokenDao } from '@daos/index';
import { LoginDto } from '@dtos/auth';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The user has been successfully logged in.',
    type: TokenDao,
   })
  @ApiUnauthorizedResponse({
    description: 'Wrong email or password.',
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDao> {
    return await this.authService.login(loginDto);
  }
}
