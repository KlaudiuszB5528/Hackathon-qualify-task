import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TeamEntity } from '../teams/entities/team.entity';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            team: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should login successfully with valid credentials', async () => {
    const team = {
      id: 1,
      name: 'test',
      password: await bcrypt.hash('test', 10),
    };
    const loginDto = { name: 'test', password: 'test' };

    jest
      .spyOn(prismaService.team, 'findUnique')
      .mockResolvedValue(team as TeamEntity);
    jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');

    const result = await service.login(loginDto.name, loginDto.password);

    expect(result).toEqual({ accessToken: 'testToken' });
  });

  it('should throw NotFoundException when team does not exist', async () => {
    const loginDto = { name: 'test', password: 'test' };

    jest.spyOn(prismaService.team, 'findUnique').mockResolvedValue(null);

    await expect(
      service.login(loginDto.name, loginDto.password),
    ).rejects.toThrow();
  });

  it('should throw UnauthorizedException when password is invalid', async () => {
    const team = {
      id: 1,
      name: 'test',
      password: await bcrypt.hash('test', 10),
    };
    const loginDto = { name: 'test', password: 'wrong' };

    jest
      .spyOn(prismaService.team, 'findUnique')
      .mockResolvedValue(team as TeamEntity);

    await expect(
      service.login(loginDto.name, loginDto.password),
    ).rejects.toThrow();
  });
});
