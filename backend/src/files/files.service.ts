import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadedFile } from './models/uploaded-file';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  remove(id: number) {
    return this.prismaService.file.delete({
      where: {
        id,
      },
    });
  }

  findAllForTeam(id: number) {
    return this.prismaService.file.findMany({
      where: {
        teamId: id,
      },
    });
  }

  async uploadFiles(files: UploadedFile[], teamId: number) {
    const createdFiles: FileEntity[] = [];

    for (const file of files) {
      const createdFile = await this.prismaService.file.create({
        data: {
          size: file.size,
          name: file.originalname,
          filename: file.filename,
          teamId,
        },
      });

      createdFiles.push(createdFile);
    }

    return createdFiles;
  }
}
