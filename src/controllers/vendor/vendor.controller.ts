import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { Response } from 'express';
import { Request } from 'express';
import { UserRoles } from 'src/auth/user-roles';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() body: CreateVendorDto) {
    body.role = UserRoles.Vendor
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {

    userLoginDto.role = UserRoles.Vendor;

    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 }) // max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    })

    return res.send({ success: true, user })
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
