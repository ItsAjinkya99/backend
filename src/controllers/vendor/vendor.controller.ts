import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { Response } from 'express';
import { UserRoles } from 'src/auth/user-roles';
import { AllowUnauthorizedRequest } from 'src/app.controller';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private readonly authService: AuthService) { }

  @Post('register')
  @AllowUnauthorizedRequest()
  async registerUser(@Body() body: CreateVendorDto,@Session() session: any) {
    
    body.role = UserRoles.Vendor
    const vendor = await this.authService.register(body);
    
    session.vendorId = vendor.id;
    return vendor
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto,@Session() session: any) {

    userLoginDto.role = UserRoles.Vendor;

    const vendor = await this.authService.login(userLoginDto);
    
    session.vendorId = vendor.id;
    return vendor
    
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
}
