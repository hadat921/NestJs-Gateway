import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
@Controller('user')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('detail')
  detail(@Req() request: Request) {
    return request.user;
  }
}
