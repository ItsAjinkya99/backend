import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseInterceptors, Query, UploadedFiles } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { Express } from 'express';
import { Request } from 'express';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      dest: "./uploads"
    }))
  create(@UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createFruitDto: CreateFruitDto, @Req() req: Request,
  ) {
    // return this.fruitsService.saveFruitImages(files);

    return this.fruitsService.create(createFruitDto).then(() => {
      this.fruitsService.saveFruitImages(files);
    })
  }


  @Post('images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      dest: "./uploads"
    }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

      /* const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response; */

      // console.log("request has files");
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