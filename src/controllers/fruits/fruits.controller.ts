import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseInterceptors, Query, UploadedFiles, UseGuards } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/auth/user-roles';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) { }

  @Post('createfruit')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      dest: "./uploads"
    }))
  async create(@UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createFruitDto: CreateFruitDto, @Req() req: Request,
  ) {
    console.log(createFruitDto)
    // @ts-ignore
    return this.fruitsService.create(createFruitDto, req.user as User)

  }

  @Post('images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      dest: "./uploads"
    }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

    return this.fruitsService.saveFruitImages(files);

  }
  // Upload Picture to Server
  @Post('upload-vegetables-photo')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFilename =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        error: 'File is not an image, please upload correct format',
      };
    } else {
      const response = {
        filePath: `http://localhost:3000/api/posts/pictures/${file.filename}`,
      };
      return response;
    }
  }

  @Get()
  @Roles(UserRoles.Vendor)
  findAll(@Query() query: any, @Req() req: Request) {
    return this.fruitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateFruitDto: UpdateFruitDto) {
    return this.fruitsService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}