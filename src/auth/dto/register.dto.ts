import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ default: 'admin@admin.pl' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    minimum: 7,
    default: 'password1234'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default RegisterDto;
