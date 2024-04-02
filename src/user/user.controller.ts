import {
  Controller,
  Get,
  Put,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserService } from './user.service';
import { UserQuery, UpdateUser } from './user.dto';
import { ErrorFilter } from '../error/error.filter';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Get('list')
  async getList(@Query() userQuery: UserQuery) {
    return this.userService.getList(userQuery);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserBody: UpdateUser,
  ) {
    return this.userService.updateUser(id, updateUserBody);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }
}
