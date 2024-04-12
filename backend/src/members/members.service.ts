import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMemberDto: CreateMemberDto) {
    return this.prismaService.member.create({
      data: createMemberDto,
    });
  }

  findAll() {
    return this.prismaService.member.findMany();
  }

  findAllForTeam(teamId: number) {
    return this.prismaService.member.findMany({
      where: {
        teamId,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.member.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.prismaService.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  remove(id: number) {
    return this.prismaService.member.delete({
      where: { id },
    });
  }
}
