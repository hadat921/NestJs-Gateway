import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserQuery, UpdateUser } from './user.dto';
import { selectUserWithBooks } from '../common/ultils/shareSelect/shareSelectUser';
import { ResponseService } from '../common/ultils/handler/responseHandler';
@Injectable({})
export class UserService {
  constructor(
    private prismaservice: PrismaService,
    private responseService: ResponseService,
  ) {}
  async getById(id: number) {
    const user = await this.prismaservice.user.findUnique({
      where: {
        id,
      },
      select: selectUserWithBooks,
    });
    if (!user) {
      return new NotFoundException('User not found');
    }
    return this.responseService.successHandler(
      200,
      'Get detail user successfully',
      user,
    );
  }
  async getList(userQuery: UserQuery) {
    const listUser = await this.prismaservice.user.findMany({
      where: {
        ...(userQuery && {
          OR: [
            { lastName: { contains: userQuery.lastName || '' } },
            { firstName: { contains: userQuery.firstName || '' } },
            { email: { contains: userQuery.email || '' } },
          ],
        }),
      },
      select: selectUserWithBooks,
    });
    if (!listUser) {
      return new NotFoundException('User not found');
    }
    return this.responseService.successHandler(
      200,
      'Get list user successfully',
      listUser,
    );
  }
  async updateUser(id: number, body: UpdateUser) {
    const user = await this.prismaservice.user.update({
      where: {
        id: id,
      },
      data: {
        lastName: body.lastName,
        firstName: body.firstName,
        email: body.email,
      },
      select: {
        id: true,
        email: true,
        lastName: true,
        firstName: true,
      },
    });
    if (!user) {
      return new NotFoundException('User not found');
    }
    return this.responseService.successHandler(
      200,
      'Updated user successfully',
      user,
    );
  }
}
