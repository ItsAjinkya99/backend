import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session, Sse, Req, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { Response } from 'express';
import { roles, UserRoles } from 'src/auth/user-roles';
import { AllowUnauthorizedRequest } from 'src/app.controller';
import { Observable } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../customer/entities/OrderCreated.event';
import { session } from 'passport';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthStatus } from 'src/auth/authstatus.decorator';
import { User } from 'src/auth/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private readonly authService: AuthService) { }

  @Get('authstatus')
  @AllowUnauthorizedRequest()
  authStatus(@AuthStatus() user: User) {
    return { status: !!user, user };
  }

  @Post('register')
  @AllowUnauthorizedRequest()
  async registerUser(@Body() body: CreateVendorDto) {

    body.role = UserRoles.Vendor
    return this.vendorService.createDB(body)

  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto,
    @Res() res: Response) {
    userLoginDto.role = UserRoles.Vendor;

    const { token, vendorUser } = await this.authService.login(userLoginDto);

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
    return res.status(200).send({ success: true });
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
  async createShop(@Body() body: any) {

    return this.vendorService.createVendorShop(body)

  }

  @Post('createuser')
  createUser(@Body() body: CreateUserDto) {
    return this.vendorService.createVendorUser(body)
  }


}