import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { JwtService } from '@nestjs/jwt';
import { TagIsNotExisted } from 'src/common/ultils/validate/tagValidate';
import { ResponseService } from '../common/ultils/handler/responseHandler';
import { HttpModule } from '@nestjs/axios';
import { ErrorFilter } from '../error/error.filter';
@Module({
  controllers: [BookController],
  imports: [HttpModule],
  providers: [
    BookService,
    JwtService,
    TagIsNotExisted,
    ResponseService,
    {
      provide: 'test',
      useClass: ErrorFilter,
    },
  ],
})
export class BookModule {}
