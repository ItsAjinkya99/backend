import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, Res } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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
  async findAll(@Res() res: Response) {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8100");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

    var shops = await this.shopService.findAll();

    return res.send(shops)

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
