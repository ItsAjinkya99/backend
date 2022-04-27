import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerLoginDto } from 'src/controllers/customer/dto/customer-login.dto';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { CreateCustomerDto } from 'src/controllers/customer/dto/create-customer.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
    private jwtService: JwtService) {
        
    }
    
    async login(loginDto: UserLoginDto){
        const user = await this.customer.createQueryBuilder('customer')
        .addSelect('customer.password')
        .where('customer.email = :email', {email: loginDto.email}).getOne();

        if(!user){
            console.log("reached here")
            throw new UnauthorizedException('Bad credentials');
        } else {
            // verify whether the supplied password hash is matching with the password hash in database
            if(await this.verifyPassword(loginDto.password, user.password)){
                const token = this.jwtService.signAsync({
                    email:user.email,
                    id:user.id
                });
                delete user.password;
                return {token, user};
            } else {
            throw new UnauthorizedException('Bad credentials');

            }
        }
    
    }

    //  Register User
  async register(createCustomerDto: CreateCustomerDto) {
    const { firstname, lastname, email, address, password, billingAddress, shippingAddress, profilePic } = createCustomerDto;

    /*Check if the user is already present in database, if yes, throw error */
    const checkCustomer = await this.customer.findOne({ where: { email } });
    if (checkCustomer) {
      throw new BadRequestException('Please enter different email');
    } else {
      const customer = new Customer();
      customer.firstname = firstname;
      customer.lastname = lastname;
      customer.email = email;
      customer.address = address;
      customer.billingAddress = billingAddress;
      customer.shippingAddress = shippingAddress;
      customer.password = password;
      customer.profilePic = profilePic;

      this.customer.create(customer); // this will run any hooks present, such as password hashing
      await this.customer.save(customer);
      delete customer.password;
      return customer;
    }
  }

    async verifyPassword(password: string, hash: string){
        return await bcrypt.compare(password, hash)
    }
}
