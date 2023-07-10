import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Session, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthStatus } from 'src/auth/authstatus.decorator';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserRoles } from 'src/auth/user-roles';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AllowUnauthorizedRequest } from 'src/app.controller';

@UseGuards(JwtAuthGuard)
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
  @AllowUnauthorizedRequest()
  async login(@Body() userLoginDto: UserLoginDto,
    @Res() res: Response) {

    userLoginDto.role = UserRoles.Customer;
    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, {
      maxAge: 24 * 60 * 60 * 1000,

    }) // max age 24 hours
    res.cookie('Authentication', token,
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,

      }
    )

    return res.send({ success: true })

  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('Authentication');
    res.clearCookie('isAuthenticated');
    return res.status(200).send({ success: true });
  }

  @Get('authstatus')
  authStatus(@AuthStatus() user: User, @Req() req: any) {

    return { status: !!user, user };
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

  @Post('placeorder')
  placeOrder(@Body() orderBody: any, @Session() session: any) {
    return this.customerService.placeOrder(orderBody);
  }

}