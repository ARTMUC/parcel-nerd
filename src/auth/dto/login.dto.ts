import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'admin@admin.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'password1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LoginDto;
