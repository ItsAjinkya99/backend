import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { logger } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserRoles } from 'src/auth/user-roles';
import { CurrentUser } from 'src/auth/user.decorator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {

  constructor(private readonly customerService: CustomerService,
    private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() body: CreateCustomerDto) {
    logger.info('Hello again distributed logs');
    body.role = UserRoles.Customer
    return this.authService.register(body);
  }

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() customer: Customer) {
    console.log(!!customer);
    return { status: !!customer, customer };
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {

    userLoginDto.role = UserRoles.Customer;

    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 }) // max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    })

    return res.send({ success: true, user })
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id)
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
