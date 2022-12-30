import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { Response } from 'express';
import { roles, UserRoles } from 'src/auth/user-roles';
import { AllowUnauthorizedRequest } from 'src/app.controller';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService,
    private readonly authService: AuthService) { }

  @Post('register')
  @AllowUnauthorizedRequest()
  async registerUser(@Body() body: CreateVendorDto) {

    body.role = UserRoles.Vendor
    return this.authService.createDB(body)
    // const vendor = await this.authService.register(body);
    
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto,
  @Res() res: Response) {
    userLoginDto.role = UserRoles.Vendor;
    console.log(userLoginDto);
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
  logout(@Session() session: any) {
    session.vendorId = null;
    session.role = null
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