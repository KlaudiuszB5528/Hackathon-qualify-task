import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { TeamAllEntity } from './entities/team-all.entity';
import { TeamEntity } from './entities/team.entity';

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        PrismaService,
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should create a team successfully', async () => {
    const createTeamDto: CreateTeamDto = {
      name: 'Team A',
      description: 'Team A description',
      password: 'password',
    };
    jest
      .spyOn(service, 'create')
      .mockResolvedValue({ id: 1, ...createTeamDto });

    const result = await firstValueFrom(controller.create(createTeamDto));

    expect(result).toEqual({ id: 1, ...createTeamDto });
  });

  it('should find all teams successfully', async () => {
    const mockTeams = [
      {
        id: 1,
        name: 'Team A',
        description: 'Team A description',
        members: [],
        files: [],
      },
    ];
    jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(mockTeams as TeamAllEntity[]);

    const result = await firstValueFrom(controller.findAll());

    expect(result).toEqual(mockTeams);
  });

  it('should find a team by ID successfully', async () => {
    const mockTeam = {
      id: 1,
      name: 'Team A',
      description: 'Team A description',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(mockTeam as TeamEntity);

    const result = await firstValueFrom(controller.findOne(1));

    expect(result).toEqual(mockTeam);
  });

  it('should update a team successfully', async () => {
    const updateTeamDto: UpdateTeamDto = {
      name: 'Team B',
      password: 'password',
      description: 'Team B description',
    };
    jest.spyOn(service, 'update').mockResolvedValue({
      id: 1,
      name: '',
      description: '',
      password: '',
      ...updateTeamDto,
    });

    const result = await firstValueFrom(controller.update(1, updateTeamDto));

    expect(result).toEqual({ id: 1, ...updateTeamDto });
  });

  it('should remove a team successfully', async () => {
    const mockTeam = {
      id: 1,
      name: 'Team A',
      description: 'Team A description',
      password: 'password',
    };
    jest.spyOn(service, 'remove').mockResolvedValue(mockTeam);

    const result = await firstValueFrom(controller.remove(1));

    expect(result).toEqual(mockTeam);
  });
});
