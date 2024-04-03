import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  Validate,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { BookCategoryEnum } from './book.enum';
import { TagIsNotExisted } from 'src/common/ultils/validate/tagValidate';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numberOfpages: number;
}

export class BookQuery {
  @IsString()
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  @IsEnum(BookCategoryEnum)
  category: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfpages: number;
}

export class BookCreate {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(BookCategoryEnum)
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  numberOfpages: number;
}
export class UpdateTagBookBody {
  @Validate(TagIsNotExisted, {
    message: 'Tag is not existed',
  })
  @IsOptional()
  tag_id: number;
}
export class UpdateBookBody extends BookQuery {}
