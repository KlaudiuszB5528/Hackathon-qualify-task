import { Team } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class TeamEntity implements Team {
  @ApiProperty()
  description: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<TeamEntity>) {
    Object.assign(this, partial);
  }
}
