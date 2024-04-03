import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsEmailExisted } from 'src/common/ultils/validate/authValidate';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class RegisterDTO extends AuthDTO {
  @IsEmail()
  @Validate(IsEmailExisted, {
    message: 'Email is existed',
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}

export class LoginDTO extends AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export { IsEmailExisted };
