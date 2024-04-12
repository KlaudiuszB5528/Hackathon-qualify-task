import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, password: string): Promise<AuthEntity> {
    const team = await this.prisma.team.findUnique({ where: { name } });

    if (!team) {
      throw new NotFoundException(`No team found for name: ${name}`);
    }

    const isPasswordValid = await bcrypt.compare(password, team.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ teamId: team.id }),
    };
  }
}
