import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, Res, Req, Query, UnauthorizedException } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { map, takeUntil, tap } from 'rxjs';

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @Post('register')
  create(@Body() createShopDto: CreateShopDto, @Session() session: any) {
    createShopDto['vendorId'] = session.vendorId
    return this.shopService.create(createShopDto);
  }

  @Get()
  findAll(@Res() res: Response, @Req() req: Request, @Query() query: any) {
    console.log(typeof query)
    if (query.role !== 'Customer') {
      new Promise(resolve => {
        let myDAta = this.shopService.findAll()
        resolve(myDAta);
      }).then((data) => {
        return res.send(data)
      })
    } else {
      throw new UnauthorizedException("Shops only visible to vendors")
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
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
