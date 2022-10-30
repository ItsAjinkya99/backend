import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
var fs = require('fs-extra');

@Controller('vegetables')
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) { }

  @Post()
  create(@Body() createVegetableDto: CreateVegetableDto) {
    return this.vegetablesService.create(createVegetableDto);
  }

  @Post('uploadVegetable')
  @UseInterceptors(
    FilesInterceptor('files[]', 20, {
      storage: diskStorage({
        destination: '/tmp',
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
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any) {
    console.log(files);
    // console.log(body.title);
    var dir = body.title;
    files.forEach(file => {
      fs.move('/tmp/' + file.filename, './upload/vegetables/' + dir + '/' + file.filename, function (err) {
        if (err) {
          return console.error(err);
        }

      });
    });

    return true;

  }

  @Get('images')
  getFile(@Res() res: Response) {

    const file = createReadStream(join(process.cwd(), 'img1.png'));
    file.pipe(res);

  }

  @Get()
  findAll() {
    return this.vegetablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vegetablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVegetableDto: UpdateVegetableDto) {
    return this.vegetablesService.update(+id, updateVegetableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vegetablesService.remove(+id);
  }
}
