import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async registerUser(@Body() body: CreateCustomerDto) {
    body.role = UserRoles.Customer
    return this.authService.register(body);

  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto,
    @Res() res: Response) {

    userLoginDto.role = UserRoles.Customer;
    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, {
      maxAge: 2 * 60 * 60 * 1000,
      // sameSite: 'none',
      // secure: true,
      // path: "/api"
    },) // max age two hours
    res.cookie('Authentication', token,
      {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        // sameSite: 'none',
        // secure: true,
        // path: "/api"
      }
    )

    return res.send({ success: true })

  }

  @Post('/logout')
  logout(@Res() res: Response) {
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
