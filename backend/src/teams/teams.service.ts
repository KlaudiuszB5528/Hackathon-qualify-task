import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import * as bcrypt from 'bcrypt';
import { UpdateTeamDto } from './dto/update-team.dto';

export const roundsOfHashing = 10;

@Injectable()
export class TeamsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    createTeamDto.password = await bcrypt.hash(
      createTeamDto.password,
      roundsOfHashing,
    );

    return this.prismaService.team.create({
      data: createTeamDto,
    });
  }

  findAll() {
    return this.prismaService.team.findMany({
      include: {
        members: true,
        files: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.team.findUnique({ where: { id } });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    if (updateTeamDto.password) {
      updateTeamDto.password = await bcrypt.hash(
        updateTeamDto.password,
        roundsOfHashing,
      );
    }

    return this.prismaService.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.member.deleteMany({
      where: { teamId: id },
    });

    await this.prismaService.file.deleteMany({
      where: { teamId: id },
    });

    return this.prismaService.team.delete({
      where: { id },
    });
  }
}
