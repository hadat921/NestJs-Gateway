import {
  Controller,
  Get,
  Put,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserService } from './user.service';
import { UserQuery, UpdateUser } from './user.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @Get('list')
  async getList(@Query() userQuery: UserQuery) {
    return this.userService.getList(userQuery);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserBody: UpdateUser,
  ) {
    return this.userService.updateUser(id, updateUserBody);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }
}
