import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsEmailExisted } from 'src/auth/auth.dto';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsEmailExisted, {
    message: 'Email is existed',
  })
  email: string;

  @IsOptional()
  id: string;
}

export class UserQuery {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  firstName: string;
}

export class UpdateUser extends UserDTO {
  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  firstName: string;
}
