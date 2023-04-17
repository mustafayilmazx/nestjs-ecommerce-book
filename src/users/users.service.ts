import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@consts/index';
import { MessageDao } from '@daos/common';
import { ChangePasswordDto, CreateUserDto } from '@dtos/index';
import { comparePasswords, hashPassword } from '@helpers/password-helper';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas/user';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createUser(createUserDto: CreateUserDto): Promise<MessageDao> {
    const { email, password } = createUserDto;

    if (await this.isUserExist(email)) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(password);

    await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message : SUCCESS_MESSAGES.USER_CREATED};
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
    { userId },
  ): Promise<MessageDao> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.getOneById(userId);

    await this.checkOldPasswordOrFail(oldPassword, user.password);

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return { message: SUCCESS_MESSAGES.PASSWORD_CHANGED};
  }

  private async checkOldPasswordOrFail(
    oldPassword: string,
    currentPassword: string,
  ): Promise<void> {
    const isOldPasswordCorrect = await comparePasswords(
      oldPassword,
      currentPassword,
    );

    if (!isOldPasswordCorrect) {
      throw new BadRequestException(ERROR_MESSAGES.WRONG_OLD_PASSWORD);
    }
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.getOne({ email });
    return !!user;
  }

  private async getOne(filters: any): Promise<User> {
    const user = await this.userModel.findOne(filters);
    return user;
  }

  private async getOneById(id: string): Promise<User> {
    const user = await this.getOne({ _id: id });
    return user;
  }
}
