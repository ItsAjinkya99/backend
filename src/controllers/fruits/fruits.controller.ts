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
import { AllowUnauthorizedRequest } from 'src/app.controller';
var fs = require('fs-extra');

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) { }

  @Post('uploadfruit')
  @AllowUnauthorizedRequest()
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
      let destinationPath = 'uploads/fruits/' + dir + '/' + file.filename;
      fs.move('/tmp/' + file.filename, destinationPath, function (err) {
        if (err) {
          return console.error(err);
        } else {
          images.push(destinationPath);
        }

      });
      let fruit = {
        name: body.title,
        images: images,
        mainImage: destinationPath,
        vitaminsId: null,
        mineralsId: null,
        categoriesId: null
      }
      this.fruitsService.create(fruit);

    });
    return true;

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