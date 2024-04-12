import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';
import { from, map } from 'rxjs';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeamAllEntity } from './entities/team-all.entity';

@Controller('teams')
@ApiTags('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiCreatedResponse({
    type: TeamEntity,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: 'Create new team' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return from(this.teamsService.create(createTeamDto)).pipe(
      map((team: TeamEntity) => new TeamEntity(team)),
    );
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all teams with members and files.' })
  @ApiOkResponse({ type: [TeamAllEntity], description: 'List of all teams' })
  findAll() {
    return from(this.teamsService.findAll()).pipe(
      map((teams: TeamEntity[]) =>
        teams.map((team: TeamEntity) => new TeamEntity(team)),
      ),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TeamEntity, description: 'Get a team by ID' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get team by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return from(this.teamsService.findOne(id)).pipe(
      map((team: TeamEntity) => new TeamEntity(team)),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: TeamEntity,
    description: 'The record has been successfully updated.',
  })
  @ApiOperation({ summary: 'Update team by ID' })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return from(this.teamsService.update(id, updateTeamDto)).pipe(
      map((team: TeamEntity) => new TeamEntity(team)),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: TeamEntity,
    description: 'The record has been deleted',
  })
  @ApiOperation({ summary: 'Delete team and all related files and members' })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return from(this.teamsService.remove(id)).pipe(
      map((team: TeamEntity) => new TeamEntity(team)),
    );
  }
}
