import { ERROR_MESSAGES } from '@consts/index';
import { TokenDao } from '@daos/index';
import { LoginDto } from '@dtos/auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas/user';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async createToken(user: User): Promise<{ access_token: string }> {
    const payload = { userId: user._id.toString(), email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<TokenDao> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD);
    }

    const payload = { userId: user._id.toString(), email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
