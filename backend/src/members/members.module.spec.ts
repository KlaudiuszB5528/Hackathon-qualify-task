import { Test, TestingModule } from '@nestjs/testing';
import { MembersModule } from './members.module';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaModule } from '../prisma/prisma.module';

describe('MembersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MembersModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have MembersService', () => {
    const service = module.get<MembersService>(MembersService);
    expect(service).toBeDefined();
  });

  it('should have MembersController', () => {
    const controller = module.get<MembersController>(MembersController);
    expect(controller).toBeDefined();
  });

  it('should have PrismaModule', () => {
    const prismaModule = module.get<PrismaModule>(PrismaModule);
    expect(prismaModule).toBeDefined();
  });
});
