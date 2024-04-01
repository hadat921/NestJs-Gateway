import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { JwtService } from '@nestjs/jwt';
import { TagIsNotExisted } from 'src/common/ultils/validate/tagValidate';

@Module({
  controllers: [BookController],
  providers: [BookService, JwtService, TagIsNotExisted],
})
export class BookModule {}
