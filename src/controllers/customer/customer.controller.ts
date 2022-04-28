import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { User } from 'src/auth/entities/user.entity';
import { CurrentUser } from 'src/auth/user.decorator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

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

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@CurrentUser() customer: Customer) {
    console.log(!!customer);
    return { status: !!customer, customer };
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

  

  @Post()
  logout(@Req() req: Request, @Res() res: Response){
    res.clearCookie('Authentication')
    res.clearCookie('IsAuthenticated')
    return res.status(200).send({ success: true });

  }
}
