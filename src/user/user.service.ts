import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserQuery, UpdateUser } from './user.dto';
import { selectUserWithBooks } from '../common/ultils/shareSelect/shareSelectUser';
@Injectable({})
export class UserService {
  constructor(private prismaservice: PrismaService) {}
  async getById(id: number) {
    try {
      const user = await this.prismaservice.user.findUnique({
        where: {
          id,
        },
        select: selectUserWithBooks,
      });
      if (!user) {
        return new NotFoundException('User not found');
      }
      return {
        userInfo: user,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getList(userQuery: UserQuery) {
    try {
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
      return {
        data: listUser,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(id: number, body: UpdateUser) {
    try {
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
      return {
        userInfo: user,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
