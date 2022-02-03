import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { Express } from 'express';
import { Request } from 'express';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Post()
  create(@Body() createFruitDto: CreateFruitDto, @Req() req: Request) {
    return this.fruitsService.create(createFruitDto);
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
  findAll(@Query() query: any) {
    return this.fruitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFruitDto: UpdateFruitDto) {
    return this.fruitsService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}