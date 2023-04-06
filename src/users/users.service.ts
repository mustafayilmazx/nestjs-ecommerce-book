import { ChangePasswordDto, CreateUserDto } from '@dtos/user';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas/user';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = createUserDto;

    if (await this.isUserExist(email)) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // TODO return user instead of token
    return await this.authService.createToken(user);
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userData: { userId: string; email: string },
  ): Promise<{ access_token: string }> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userModel.findById(userData.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('Wrong password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return await this.authService.createToken(user);
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }
}
