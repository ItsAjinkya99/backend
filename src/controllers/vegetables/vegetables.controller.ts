import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res, UploadedFile, UseInterceptors, UploadedFiles, Header, UseGuards } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { spawn } from 'child_process';
import { Readable } from 'stream';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
var fs = require('fs-extra');
var path = require('path');
// var Readable = require('stream').Readable

@Controller('vegetables')
@UseGuards(JwtAuthGuard)
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) { }

  @Post('createvegetable')
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
    var dir = body.title;
    var images: string[] = [];
    files.forEach(file => {
      let destinationPath = 'uploads/vegetables/' + dir + '/' + file.filename;
      fs.move('/tmp/' + file.filename, destinationPath, function (err) {
        if (err) {
          return console.error(err);
        } else {
          images.push(destinationPath.replace('uploads/', ''));
        }
      });
    });

    let vegetable = {
      name: body.title,
      images: images,
      mainImage: null,
      vitaminsId: null,
      mineralsId: null,
      categoriesId: null
    }

    this.vegetablesService.create(vegetable);
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
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id') id: string, @Res() res: Response) {

    var data = await this.vegetablesService.findOne(+id);

    var img1 = []
    for (let i = 0; i < data[1].length; i++) {

      var relativeFilePath = data[1][i].vi_imageName;

      img1[i] = relativeFilePath

    }
    res.send(img1);

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
