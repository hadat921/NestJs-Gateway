import {
    ForbiddenException,
    ConflictException,
    UnauthorizedException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { AuthDTO } from './dto';
  import * as argon from 'argon2';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { UserEnum } from 'src/user/user.enum';
  @Injectable({})
  export class AuthService {
    constructor(
      private prismaservice: PrismaService,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
    async register(authDTO: AuthDTO) {
      const hashedPassword = await argon.hash(authDTO.password);
      try {
        const user = await this.prismaservice.user.create({
          data: {
            email: authDTO.email,
            hashedPassword: hashedPassword,
            lastName: '',
            firstName: '',
            role: UserEnum.ROLE_ADMIN,
            type: UserEnum.USER_TYPE_CUSTOMER,
            status: UserEnum.USER_STATUS_ACTIVE,
          },
          select: {
            id: true,
            email: true,
            createdAt: true,
            type: true,
            role: true,
          },
        });
        await this.signJwtToken(user.id, user.email);
        return user;
      } catch (error) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email conflict');
        }
        return;
      }
    }
    async login(authDTO: AuthDTO) {
      try {
        let user = await this.prismaservice.user.findUnique({
          where: {
            email: authDTO.email,
          },
          select: {
            id: true,
            email: true,
            hashedPassword: true,
            lastName: true,
            firstName: true,
          },
        });
        if (!user) {
          return new NotFoundException('User not found');
        }
        const passWordMatched = await argon.verify(
          user.hashedPassword,
          authDTO.password,
        );
        if (!passWordMatched) {
          return new UnauthorizedException('Password is not valid');
        }
        delete user.hashedPassword;
        let accessToken = await this.signJwtToken(user.id, user.email);
        return {
          accessToken: accessToken,
          data: user,
        };
      } catch (error) {
        console.log(error);
      }
    }
    async signJwtToken(
      userId: number,
      email: string,
    ): Promise<{ accessToken: string }> {
      const payload = {
        sub: userId,
        email: email,
      };
      const jwtString = await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
        secret: this.configService.get('JWT_SECRET'),
      });
      return {
        accessToken: jwtString,
      };
    }
  }
  