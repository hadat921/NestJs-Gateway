import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserService } from 'src/user/user.service';
import { IsEmailExisted } from 'src/common/ultils/validate/authValidate';
import { AuthGuard } from './guard/auth.guard';
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, IsEmailExisted, AuthGuard],
})
export class AuthModule {}
