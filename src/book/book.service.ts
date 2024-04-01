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
@Injectable({})
export class BookService {
  constructor(private prismaservice: PrismaService) {}
  async createBook(bookCreate: BookCreate, req: any) {
    try {
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
          user: { connect: { id: req.id } },
        },
      });
      return {
        message: 'Success',
        newBook: newBook,
      };
    } catch (error) {
      throw error;
    }
  }
  async getById(id: number) {
    try {
      const book = await this.prismaservice.book.findUnique({
        where: {
          id,
        },
        select: selectBookWithBookTag,
      });
      if (!book) {
        return new NotFoundException('Book not found');
      }
      return {
        bookInfo: book,
      };
    } catch (error) {
      throw error;
    }
  }
  async getList(bookQuery: BookQuery) {
    try {
      const listBook = await this.prismaservice.book.findMany({
        where: {
          ...(bookQuery && {
            OR: [
              { title: { contains: bookQuery.title || '' } },
              { author: { contains: bookQuery.author || '' } },
              { category: { contains: bookQuery.category || '' } },
              { numberOfpages: { contains: bookQuery.numberOfpages || '' } },
            ],
          }),
        },
        select: selectBookWithBookTag,
      });
      if (!listBook) {
        return new NotFoundException('Book not found');
      }
      return {
        data: listBook,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateBook(id: number, body: UpdateBookBody, req: any) {
    try {
      const book = await this.prismaservice.book.update({
        where: {
          id,
        },
        data: {
          title: body.title,
          author: body.author,
          category: body.category,
          numberOfpages: body.numberOfpages,
          updater_id: req.id,
        },
        select: selectBookWithBookTag,
      });
      if (!book) {
        return new NotFoundException('User not found');
      }
      return {
        messaga: 'Success',
        newBookInfo: book,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async updateTagBook(id: number, body: UpdateTagBookBody) {
    try {
      const newBookTag = await this.prismaservice.bookTag.create({
        data: {
          book: { connect: { id: id } },
          tag: { connect: { id: body.tag_id } },
        },
      });
      if (!newBookTag) {
        return new NotFoundException('User not found');
      }
      return {
        messaga: 'Success',
        newBookInfo: newBookTag,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deteleBook(id: number) {
    try {
      const deletedBook = await this.prismaservice.book.delete({
        where: {
          id,
        },
      });
      return deletedBook;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book');
    }
  }
}
