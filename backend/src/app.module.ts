import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, PrismaModule, TeamsModule, MembersModule, FilesModule],
})
export class AppModule {}
