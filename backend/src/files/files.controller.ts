import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { join } from 'path';
import { FileEntity } from './entities/file.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadedFile } from './models/uploaded-file';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: FileEntity, isArray: true })
  @ApiOperation({ summary: 'Upload files' })
  @ApiBody({
    description: 'Files to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'number',
        },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multer.diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFile(
    @UploadedFiles() files: UploadedFile[],
    @Body('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.filesService.uploadFiles(files, teamId);
  }

  @Get('team/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all files for a team' })
  @ApiOkResponse({ type: [FileEntity] })
  findAllForStudent(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findAllForTeam(id);
  }

  @Get(':filename')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Download a file' })
  getFile(@Res() res: Response, @Param('filename') filename: string) {
    const filePath = join(process.cwd(), 'uploads', filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return res.sendFile(filePath);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a file' })
  @ApiOkResponse({ type: FileEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }
}
