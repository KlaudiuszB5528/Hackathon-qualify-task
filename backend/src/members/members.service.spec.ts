import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('MembersService', () => {
  let service: MembersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService, PrismaService],
    }).compile();

    service = module.get<MembersService>(MembersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a member successfully', async () => {
    const createMemberDto: CreateMemberDto = {
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    };
    jest
      .spyOn(prismaService.member, 'create')
      .mockResolvedValue({ id: 1, ...createMemberDto });

    const result = await service.create(createMemberDto);

    expect(result).toEqual({ id: 1, ...createMemberDto });
  });

  it('should find all members successfully', async () => {
    const mockMembers = [
      { id: 1, name: 'John Doe', teamId: 1, email: 'john.doe@test.com' },
    ];
    jest.spyOn(prismaService.member, 'findMany').mockResolvedValue(mockMembers);

    const result = await service.findAll();

    expect(result).toEqual(mockMembers);
  });

  it('should find a member by ID successfully', async () => {
    const mockMember = {
      id: 1,
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    };
    jest
      .spyOn(prismaService.member, 'findUnique')
      .mockResolvedValue(mockMember);

    const result = await service.findOne(1);

    expect(result).toEqual(mockMember);
  });

  it('should find all members for a team successfully', async () => {
    const mockMembers = [
      { id: 1, name: 'John Doe', teamId: 1, email: 'john.doe@test.com' },
    ];
    jest.spyOn(prismaService.member, 'findMany').mockResolvedValue(mockMembers);

    const result = await service.findAllForTeam(1);

    expect(result).toEqual(mockMembers);
  });

  it('should update a member successfully', async () => {
    const updateMemberDto: UpdateMemberDto = { name: 'John Dae' };
    jest.spyOn(prismaService.member, 'update').mockResolvedValue({
      teamId: 1,
      name: 'John Doe',
      ...updateMemberDto,
      id: 1,
      email: 'john.doe@test.com',
    });

    const result = await service.update(1, updateMemberDto);

    expect(result).toEqual({
      id: 1,
      ...updateMemberDto,
      teamId: 1,
      email: 'john.doe@test.com',
    });
  });

  it('should remove a member successfully', async () => {
    const mockMember = {
      id: 1,
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    };
    jest.spyOn(prismaService.member, 'delete').mockResolvedValue(mockMember);

    const result = await service.remove(1);

    expect(result).toEqual(mockMember);
  });
});
