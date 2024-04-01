import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
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
