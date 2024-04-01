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
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BookService } from './book.service';
import {
  BookCreate,
  BookQuery,
  UpdateBookBody,
  UpdateTagBookBody,
} from './book.dto';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  async createBook(@Body() bookCreate: BookCreate, @Request() req) {
    return this.bookService.createBook(bookCreate, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async listBook(@Query() bookQuery: BookQuery) {
    return this.bookService.getList(bookQuery);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookBody: UpdateBookBody,
    @Request() req,
  ) {
    return this.bookService.updateBook(id, updateBookBody, req.user);
  }

  @UseGuards(AuthGuard)
  @Put('update/tag/:id')
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagBookBody: UpdateTagBookBody,
  ) {
    return this.bookService.updateTagBook(id, updateTagBookBody);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deteleBook(id);
  }
}
