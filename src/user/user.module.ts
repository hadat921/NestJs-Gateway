import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ResponseService } from '../common/ultils/handler/responseHandler';
import { ErrorFilter } from '../error/error.filter';

@Module({
  controllers: [UserController],
  imports: [HttpModule],
  providers: [
    UserService,
    JwtService,
    ResponseService,
    {
      provide: 'test',
      useClass: ErrorFilter,
    },
  ],
})
export class UserModule {}
