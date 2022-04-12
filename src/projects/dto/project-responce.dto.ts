import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: string;
}
