import {
  UnauthorizedException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseService } from '../common/ultils/handler/responseHandler';

@Injectable({})
export class AuthService {
  constructor(
    private prismaservice: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private responseService: ResponseService,
  ) {}
  async register(registerDTO: RegisterDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    try {
      const user = await this.prismaservice.user.create({
        data: {
          email: registerDTO.email,
          hashedPassword: hashedPassword,
          lastName: registerDTO.lastName,
          firstName: registerDTO.firstName,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return this.responseService.successHandler(200, 'Success', user);
    } catch (error) {
      console.log(error);
    }
  }
  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.prismaservice.user.findUnique({
        where: {
          email: loginDTO.email,
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
        loginDTO.password,
      );
      if (!passWordMatched) {
        return new UnauthorizedException('Password is not valid');
      }
      delete user.hashedPassword;
      const accessToken = await this.signJwtToken(user.id, user.email);
      return this.responseService.successHandler(200, 'Success', {
        accessToken,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async signJwtToken(userId: number, email: string): Promise<string> {
    const payload = {
      id: userId,
      email: email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: this.configService.get('JWT_SECRET'),
    });
    return jwtString;
  }
}
