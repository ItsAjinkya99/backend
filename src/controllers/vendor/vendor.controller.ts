import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthService } from '../../auth/auth.service';
import { UserLoginDto } from '../../auth/dto/user-login.dto';
import { Response } from 'express';
import { UserRoles } from '../../auth/user-roles';
import { AllowUnauthorizedRequest } from '../../app.controller';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { AuthStatus } from '../../decorators/authstatus.decorator';
import { User } from '../../auth/entities/user.entity';
import { CreateShopDto } from '../shop/dto/create-shop.dto';
import { ShopService } from '../shop/shop.service';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private readonly authService: AuthService,
    private shopService: ShopService) { }

  @Get('getAllUsers')
  getAllUsers() {
    return this.vendorService.findAll()
  }

  @Get('authstatus')
  authStatus(@AuthStatus() user: User, @Req() req: any) {
    return { status: !!user, user };
  }

  @Post('register')
  @AllowUnauthorizedRequest()
  async registerVendor(@Body() body: CreateVendorDto) {

    body.role = UserRoles.Vendor
    return this.vendorService.createDB(body)

  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto,
    @Res() res: Response) {
    userLoginDto.role = UserRoles.Vendor;

    const { token, user } = await this.authService.login(userLoginDto);
    res.cookie('isAuthenticated', true, {
      maxAge: 24 * 60 * 60 * 1000,

    },) // max age 24 hours
    res.cookie('Authentication', token,
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,

      }
    )

    return res.send({ success: true })

  }

  @Post('/logout')
  @AllowUnauthorizedRequest()
  logout(@Res() res: Response) {
    res.clearCookie('Authentication');
    res.clearCookie('isAuthenticated');
    return res.status(200).send({ success: true });
  }

  @Get('findMyShops')
  findMyShops(@Res() res: Response, @Query() query: any) {

    new Promise(resolve => {
      let myDAta = this.shopService.findVendorShops()
      resolve(myDAta);
    }).then((data) => {
      return res.send(data)
    })

  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }

  @Post('createshop')
  async createShop(@Body() body: CreateShopDto) {
    return this.vendorService.createVendorShop(body)
  }

  @Post('createuser')
  createUser(@Body() body: CreateUserDto) {
    return this.vendorService.createVendorUser(body)
  }

}