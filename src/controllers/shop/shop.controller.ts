import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, Res, Req, Query, UnauthorizedException, Sse, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request, query } from 'express';
import { BehaviorSubject, Observable, Subject, map, subscribeOn, takeUntil, tap } from 'rxjs';
import { AllowUnauthorizedRequest } from 'src/app.controller';
import { CustomerService } from '../customer/customer.service';
import { session } from 'passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
var fs = require('fs-extra');

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopController {

  myOrders: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public myOrdersObservable = this.myOrders.asObservable();

  eventData: any
  constructor(private readonly shopService: ShopService,
    private readonly customerService: CustomerService) { }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Post('register')
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
  create(@Body() body: any, @UploadedFiles() files: Array<Express.Multer.File>) {

    console.log(files);
    var dir = body.title;
    var images: string[] = [];
    files.forEach(file => {
      let destinationPath = 'uploads/shops/' + dir + '/' + file.filename;
      fs.move('/tmp/' + file.filename, destinationPath, function (err) {
        if (err) {
          return console.error(err);
        } else {
          images.push(destinationPath.replace('uploads/', ''));
        }
      });
    });

    return this.shopService.create(body);
  }

  @Get('getShopData')
  getShopData(@Query('shopId') id: string, @Query('vendorId') vendorId: string, @Res() res: Response) {

    new Promise(async resolve => {
      let myDAta = await this.shopService.getShopItems(parseInt(id), parseInt(vendorId))
      resolve(myDAta);
    }).then((data) => {
      return res.send(data)
    })

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }

}
