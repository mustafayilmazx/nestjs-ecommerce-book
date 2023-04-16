import { TokenDao } from '@daos/index';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'Login successful' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<TokenDao> {
    return await this.authService.login(req.user);
  }
}
