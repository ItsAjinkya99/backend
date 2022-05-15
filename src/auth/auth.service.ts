import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { UserRoles } from './user-roles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
    private jwtService: JwtService) {

  }

  async login(loginBody: any) {

    switch (loginBody.role) {
      case 'Customer': {
        const user = await this.customer.createQueryBuilder('customer')
          .addSelect('customer.password')
          .where('customer.email = :email', { email: loginBody.email }).getOne();

        if (!user) {
          throw new UnauthorizedException('Bad credentials');
        } else {
          // verify whether the supplied password hash is matching with the password hash in database
          if (await this.verifyPassword(loginBody.password, user.password)) {
            const token = await this.jwtService.signAsync({
              email: user.email,
              id: user.id
            });
            delete user.password;
            return { token, user };
          } else {
            throw new UnauthorizedException('Bad credentials');

          }
        }
      }

      case 'Vendor': {
        const user = await this.vendor.createQueryBuilder('vendor')
          .addSelect('vendor.password')
          .where('vendor.email = :email', { email: loginBody.email }).getOne();

        if (!user) {
          throw new UnauthorizedException('Bad credentials');
        } else {
          // verify whether the supplied password hash is matching with the password hash in database
          if (await this.verifyPassword(loginBody.password, user.password)) {
            const token = await this.jwtService.signAsync({
              email: user.email,
              id: user.id
            });
            delete user.password;
            return { token, user };
          } else {
            throw new UnauthorizedException('Bad credentials');

          }
        }
      }

    }

  }

  //  Register User
  async register(userBody: any) {
    switch (userBody.role) {
      case 'Customer': {
        const { firstname, lastname, email, address, password, billingAddress, shippingAddress, profilePic } = userBody;
        const customer = new Customer();

        /*Check if the user is already present in database, if yes, throw error */
        const checkCustomer = await this.customer.findOne({ where: { email } });

        if (checkCustomer) {
          throw new BadRequestException('Please enter different email');
        } else {
          customer.firstname = firstname;
          customer.lastname = lastname;
          customer.email = email;
          customer.address = address;
          customer.billingAddress = billingAddress;
          customer.shippingAddress = shippingAddress;
          customer.password = password;
          customer.profilePic = profilePic;
          customer.role = UserRoles.Customer;

          this.customer.create(customer); // this will run any hooks present, such as password hashing
          await this.customer.save(customer);
          delete customer.password;
          return customer;
        }
      }

      case 'Vendor': {
        console.log(userBody);

        const { firstname, lastname, email, address, password, profilePic } = userBody;

        /*Check if the user is already present in database, if yes, throw error */
        const checkVendor = await this.vendor.findOne({ where: { email } });
        const vendor = new Vendor();

        if (checkVendor) {
          throw new BadRequestException('Please enter different email');
        } else {
          vendor.firstname = firstname;
          vendor.lastname = lastname;
          vendor.email = email;
          vendor.address = address;
          vendor.password = password;
          vendor.profilePic = profilePic;
          vendor.role = UserRoles.Vendor;

          this.vendor.create(vendor); // this will run any hooks present, such as password hashing
          await this.vendor.save(vendor);
          delete vendor.password;
          return vendor;
        }
      }

      /* case Admin: {
        const customer = new Customer();

        break;
      } */
    }

  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}
