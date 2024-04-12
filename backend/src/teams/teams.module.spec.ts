import { Test, TestingModule } from '@nestjs/testing';
import { TeamsModule } from './teams.module';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaModule } from '../prisma/prisma.module';

describe('TeamsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TeamsModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have TeamsService', () => {
    const service = module.get<TeamsService>(TeamsService);
    expect(service).toBeDefined();
  });

  it('should have TeamsController', () => {
    const controller = module.get<TeamsController>(TeamsController);
    expect(controller).toBeDefined();
  });

  it('should have PrismaModule', () => {
    const prismaModule = module.get<PrismaModule>(PrismaModule);
    expect(prismaModule).toBeDefined();
  });
});
