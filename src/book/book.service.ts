import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BookCreate,
  BookQuery,
  UpdateBookBody,
  UpdateTagBookBody,
} from './book.dto';
import { selectBookWithBookTag } from '../common/ultils/shareSelect/shareSelectBook';
import { ResponseService } from '../common/ultils/handler/responseHandler';
@Injectable({})
export class BookService {
  constructor(
    private prismaservice: PrismaService,
    private responseService: ResponseService,
  ) {}
  async createBook(bookCreate: BookCreate, user: any) {
    const checkBook = await this.prismaservice.book.findFirst({
      where: {
        title: bookCreate.title,
        author: bookCreate.author,
        category: bookCreate.category,
        numberOfpages: bookCreate.numberOfpages,
      },
    });
    if (checkBook) {
      throw new ConflictException('Book is existed');
    }
    const newBook = await this.prismaservice.book.create({
      data: {
        title: bookCreate.title,
        author: bookCreate.author,
        category: bookCreate.category,
        numberOfpages: bookCreate.numberOfpages,
        user: { connect: { id: user.id } },
      },
    });
    return this.responseService.successHandler(
      200,
      'Created book successfully',
      newBook,
    );
  }
  async getById(id: number) {
    const book = await this.prismaservice.book.findUnique({
      where: {
        id,
      },
      select: selectBookWithBookTag,
    });
    if (!book) {
      return new NotFoundException('Book not found');
    }
    return this.responseService.successHandler(
      200,
      'Get detail book successfully',
      book,
    );
  }
  async getList(bookQuery: BookQuery) {
    const listBook = await this.prismaservice.book.findMany({
      where: {
        ...(bookQuery && {
          OR: [
            { title: { contains: bookQuery.title || '' } },
            { author: { contains: bookQuery.author || '' } },
            { category: { contains: bookQuery.category || '' } },
            {
              numberOfpages:
                typeof bookQuery.numberOfpages === 'number'
                  ? { equals: bookQuery.numberOfpages }
                  : undefined,
            },
          ].filter(Boolean), // Loại bỏ các giá trị falsy khỏi mảng
        }),
      },
      select: selectBookWithBookTag,
    });
    return this.responseService.successHandler(
      200,
      'Get list book successfully',
      listBook,
    );
  }
  async updateBook(id: number, body: UpdateBookBody, user: any) {
    const book = await this.prismaservice.book.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        author: body.author,
        category: body.category,
        numberOfpages: body.numberOfpages,
        updater_id: user.id,
      },
      select: selectBookWithBookTag,
    });
    return this.responseService.successHandler(
      200,
      'Book updated successfully',
      book,
    );
  }

  async updateTagBook(id: number, body: UpdateTagBookBody) {
    const newBookTag = await this.prismaservice.bookTag.create({
      data: {
        book: { connect: { id: id } },
        tag: { connect: { id: body.tag_id } },
      },
    });
    return this.responseService.successHandler(
      200,
      'Book updated successfully',
      newBookTag,
    );
  }

  async deteleBook(id: number) {
    const checkBook = await this.prismaservice.book.findUnique({
      where: {
        id,
      },
    });
    if (!checkBook) {
      throw new NotFoundException(
        `Book with id ${id} not found or has been deleted.`,
      );
    }
    await this.prismaservice.bookTag.deleteMany({
      where: {
        bookId: id,
      },
    });
    await this.prismaservice.book.delete({
      where: {
        id,
      },
    });
    return this.responseService.successHandler(
      204,
      'Book deleted successfully',
      null,
    );
  }
}
