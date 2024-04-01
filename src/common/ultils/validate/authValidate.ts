import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'IsEmailExisted', async: true })
@Injectable()
export class IsEmailExisted implements ValidatorConstraintInterface {
  constructor(private readonly prismaservice: PrismaService) {}
  async validate(email: string) {
    const user = await this.prismaservice.user.findUnique({
      where: {
        email: email,
      },
    });
    return !user;
  }
}
