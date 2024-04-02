import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserService } from 'src/user/user.service';
import { IsEmailExisted } from 'src/common/ultils/validate/authValidate';
import { AuthGuard } from './guard/auth.guard';
import { ResponseService } from '../common/ultils/handler/responseHandler';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [JwtModule.register({}), HttpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    IsEmailExisted,
    AuthGuard,
    ResponseService,
  ],
})
export class AuthModule {}
