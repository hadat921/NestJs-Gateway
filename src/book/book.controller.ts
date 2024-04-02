import {
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  Body,
  Post,
  ParseIntPipe,
  Param,
  Query,
  UseFilters,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BookService } from './book.service';
import {
  BookCreate,
  BookQuery,
  UpdateBookBody,
  UpdateTagBookBody,
} from './book.dto';
import { ErrorFilter } from '../error/error.filter';
import { getUser } from 'src/decorators/getUser.decorator';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Post('create')
  async createBook(@Body() bookCreate: BookCreate, @getUser() user: any) {
    return this.bookService.createBook(bookCreate, user);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Get('list')
  async listBook(@Query() bookQuery: BookQuery) {
    return this.bookService.getList(bookQuery);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Put('update/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookBody: UpdateBookBody,
    @getUser() user: any,
  ) {
    return this.bookService.updateBook(id, updateBookBody, user);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Put('update/tag/:id')
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagBookBody: UpdateTagBookBody,
  ) {
    return this.bookService.updateTagBook(id, updateTagBookBody);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getById(id);
  }

  @UseGuards(AuthGuard)
  @UseFilters(ErrorFilter)
  @Delete('delete/:id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deteleBook(id);
  }
}
