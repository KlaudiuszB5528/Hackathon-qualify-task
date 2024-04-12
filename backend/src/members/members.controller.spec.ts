import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        MembersService,
        PrismaService,
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  it('should create a member successfully', async () => {
    const mockDto: CreateMemberDto = {
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    };

    jest.spyOn(service, 'create').mockResolvedValue({ id: 1, ...mockDto });

    const result = await controller.create(mockDto);

    expect(result).toEqual({ id: 1, ...mockDto });
  });

  it('should find all members successfully', async () => {
    const mockMembers = [
      { id: 1, name: 'John Doe', teamId: 1, email: 'john.doe@test.com' },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockMembers);

    const result = await controller.findAll();

    expect(result).toEqual(mockMembers);
  });

  it('should find a member by ID successfully', async () => {
    const mockMember = {
      id: 1,
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mockMember);

    const result = await controller.findOne(1);

    expect(result).toEqual(mockMember);
  });

  it('should find all members for a team successfully', async () => {
    const mockMembers = [
      { id: 1, name: 'John Doe', teamId: 1, email: 'john.doe@test.com' },
    ];

    jest.spyOn(service, 'findAllForTeam').mockResolvedValue(mockMembers);

    const result = await controller.findAllForTeam(1);

    expect(result).toEqual(mockMembers);
  });

  it('should update a member successfully', async () => {
    const mockDto: UpdateMemberDto = { name: 'John Dae' };

    jest.spyOn(service, 'update').mockResolvedValue({
      id: 1,
      email: 'john.doe@test.com',
      name: 'John Doe',
      teamId: 1,
      ...mockDto,
    });

    const result = await controller.update(1, mockDto);

    expect(result).toEqual({
      id: 1,
      ...mockDto,
      teamId: 1,
      email: 'john.doe@test.com',
    });
  });

  it('should remove a member successfully', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue({
      id: 1,
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    });

    const result = await controller.remove(1);

    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      teamId: 1,
      email: 'john.doe@test.com',
    });
  });
});
