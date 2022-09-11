import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { AllowUnauthorizedRequest } from 'src/app.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { UserRoles } from 'src/auth/user-roles';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {

  constructor(private readonly customerService: CustomerService,
    private readonly authService: AuthService) { }

  @Post('register')
  @AllowUnauthorizedRequest()
  async registerUser(@Body() body: CreateCustomerDto, @Session() session: any) {
    body.role = UserRoles.Customer
    const customer = await this.authService.register(body);
    session.customerId = customer.id;
    session.role = UserRoles.Customer
    return customer
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto, @Session() session: any) {

    userLoginDto.role = UserRoles.Customer;
    const customer = await this.authService.login(userLoginDto);

    session.customerId = customer.id;
    session.role = UserRoles.Customer
    return customer
  }

  @Post('/logout')
  @AllowUnauthorizedRequest()
  logout(@Session() session: any, @Res() res: Response) {
    delete session.customerId;
    delete session.role;
    return res.json('Customer successfully logged out')
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

}
