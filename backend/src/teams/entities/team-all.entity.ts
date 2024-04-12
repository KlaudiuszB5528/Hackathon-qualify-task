import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../files/entities/file.entity';
import { MemberEntity } from '../../members/entities/member.entity';
import { TeamEntity } from './team.entity';

export class TeamAllEntity extends TeamEntity {
  @ApiProperty({ type: [FileEntity] })
  files: FileEntity[];
  @ApiProperty({ type: [MemberEntity] })
  members: MemberEntity[];
}
