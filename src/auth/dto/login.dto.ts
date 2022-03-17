import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'admin@admin.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({
    minimum: 7,
    default: 'password1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LoginDto;
