import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService,
    private readonly authService: AuthService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const {token, user} = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, {maxAge:2*60*60*1000}) // max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly:true,
      maxAge:2*60*60*1000
    })

    return res.send({success:true, user})
  }

  @Post('register')
  registerUser(@Body() body: CreateCustomerDto) {
    // console.log(body);
    return this.authService.register(body);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
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
