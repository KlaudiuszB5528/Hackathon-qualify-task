import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('TeamsService', () => {
  let service: TeamsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService, PrismaService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('creates a team successfully', async () => {
    const createTeamDto: CreateTeamDto = {
      name: 'Team A',
      description: 'Team A description',
      password: 'password',
    };
    const hashedPassword = 'hashedPassword';
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve(hashedPassword));
    jest
      .spyOn(prismaService.team, 'create')
      .mockResolvedValue({ id: 1, ...createTeamDto, password: hashedPassword });

    const result = await service.create(createTeamDto);

    expect(result).toEqual({
      id: 1,
      ...createTeamDto,
      password: hashedPassword,
    });
  });

  it('finds all teams successfully', async () => {
    const mockTeams = [
      {
        id: 1,
        name: 'Team A',
        description: 'Team A description',
        password: 'password',
        members: [],
        files: [],
      },
    ];
    jest.spyOn(prismaService.team, 'findMany').mockResolvedValue(mockTeams);

    const result = await service.findAll();

    expect(result).toEqual(mockTeams);
  });

  it('finds a team by ID successfully', async () => {
    const mockTeam = {
      id: 1,
      name: 'Team A',
      description: 'Team A description',
      password: 'password',
    };
    jest.spyOn(prismaService.team, 'findUnique').mockResolvedValue(mockTeam);

    const result = await service.findOne(1);

    expect(result).toEqual(mockTeam);
  });

  it('updates a team successfully', async () => {
    const updateTeamDto: UpdateTeamDto = {
      name: 'Team B',
      description: 'Team B description',
      password: 'hashedPassword',
    };
    const hashedPassword = 'hashedPassword';
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve(hashedPassword));

    jest.spyOn(prismaService.team, 'update').mockResolvedValue({
      id: 1,
      password: hashedPassword,
      name: '',
      description: '',
      ...updateTeamDto,
    });

    const result = await service.update(1, updateTeamDto);

    expect(result).toEqual({
      id: 1,
      ...updateTeamDto,
    });
  });

  it('removes a team successfully', async () => {
    const mockTeam = {
      id: 1,
      name: 'Team A',
      description: 'Team A description',
      password: 'password',
    };
    jest
      .spyOn(prismaService.member, 'deleteMany')
      .mockResolvedValue({ count: 1 });
    jest
      .spyOn(prismaService.file, 'deleteMany')
      .mockResolvedValue({ count: 1 });
    jest.spyOn(prismaService.team, 'delete').mockResolvedValue(mockTeam);

    const result = await service.remove(1);

    expect(result).toEqual(mockTeam);
  });
});
