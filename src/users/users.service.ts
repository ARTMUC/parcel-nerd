import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(@Inject('PRISMA_SERVICE') private repo: PrismaClient) {}

  async checkIfUserExists(email: string) {
    const user = await this.repo.user.findUnique({ where: { email } });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.repo.user.findUnique({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.repo.user.create({
      data: userData,
    });
    return newUser;
  }
  async getById(id: string) {
    const user = await this.repo.user.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async setConfirmUserEmail(userId: string) {
    return await this.repo.user.update({
      data: {
        isEmailConfirmed: true,
      },
      where: {
        id: userId,
      },
    });
  }
}
