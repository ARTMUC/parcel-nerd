import { ApiProperty } from '@nestjs/swagger';

export class RemoveLineResponseDto {
  @ApiProperty()
  success: 'true' | 'false';
}
