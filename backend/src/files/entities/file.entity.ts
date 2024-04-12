import { File } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FileEntity implements File {
  @ApiProperty()
  id: number;
  @ApiProperty()
  teamId: number;
  @ApiProperty()
  size: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  filename: string;
}
