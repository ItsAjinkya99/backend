import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Res, UploadedFile, UseInterceptors, UploadedFiles, Header, UseGuards, Query } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { spawn } from 'child_process';
import { AllowUnauthorizedRequest } from 'src/app.controller';
var fs = require('fs-extra');
var path = require('path');

@Controller('vegetables')
export class VegetablesController {
  constructor(private readonly vegetablesService: VegetablesService) { }

  @Post('createvegetable')
  create(@Body() createVegetableDto: CreateVegetableDto) {
    return this.vegetablesService.create(createVegetableDto);
  }

  @Post('uploadvegetable')
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
          images.push();
        }

      });
      let vegetable = {
        name: body.title,
        images: images,
        mainImage: destinationPath,
        vitaminsId: null,
        mineralsId: null,
        categoriesId: null
      }
      this.vegetablesService.create(vegetable);

    });
    return true;

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vegetablesService.findOne(parseInt(id));
  }

  @Get()
  findAll(@Query('isAuth') isAuth: string,) {
    return this.vegetablesService.findAll(isAuth);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVegetableDto: UpdateVegetableDto) {
    return this.vegetablesService.update(+id, updateVegetableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vegetablesService.remove(+id);
  }

  @Post('authorize')
  authorize(@Body() data: any) {
    return this.vegetablesService.authorize(data)
  }
}
