import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards, Res, Req, Query, UnauthorizedException, Sse } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request, query } from 'express';
import { BehaviorSubject, Observable, Subject, map, subscribeOn, takeUntil, tap } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';
import { AllowUnauthorizedRequest } from 'src/app.controller';
import { CustomerService } from '../customer/customer.service';

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopController {

  myOrders: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public myOrdersObservable = this.myOrders.asObservable();

  eventData: any
  constructor(private readonly shopService: ShopService,
    private readonly customerService: CustomerService) { }

  @OnEvent('order.created')
  @Sse('ordersEvents')
  handleOrderCreatedEvent(event, @Query('shopId') shopId: string): Observable<any> {
    console.log(shopId);

    this.eventData = event
    this.myOrders.next(event)
    return this.myOrdersObservable.pipe(map(() => ({ data: this.eventData })));

  }

  @Post('register')
  create(@Body() createShopDto: CreateShopDto, @Session() session: any) {
    createShopDto['vendorId'] = session.vendorId
    return this.shopService.create(createShopDto);
  }

  @Get('getShopData')
  getShopData(@Query('shopId') id: string, @Res() res: Response) {

    new Promise(async resolve => {
      let myDAta = await this.shopService.getShopItems(parseInt(id))
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
