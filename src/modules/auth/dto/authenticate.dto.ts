import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthenticateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
