import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'TagIsNotExisted', async: true })
@Injectable()
export class TagIsNotExisted implements ValidatorConstraintInterface {
  constructor(private readonly prismaservice: PrismaService) {}
  async validate(tag_id: number) {
    const tag = await this.prismaservice.tag.findUnique({
      where: {
        id: tag_id,
      },
    });
    return !!tag;
  }
}
