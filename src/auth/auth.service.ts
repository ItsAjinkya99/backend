import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { UserRoles } from './user-roles';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
var user: any;

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
    private jwt: JwtService
  ) {

  }

  async login(loginBody: any) {
    switch (loginBody.role) {
      case 'Customer': {
        user = await this.customer.createQueryBuilder('customer')
          .addSelect('customer.password')
          .where('customer.email = :email', { email: loginBody.email }).getOne();
        break;
      }

      case 'Vendor': {
        user = await this.vendor.createQueryBuilder('vendor')
          .addSelect('vendor.password')
          .where('vendor.email = :email', { email: loginBody.email }).getOne();
        break;
      }

      case 'Admin': {
      }

      case 'VendorUser': {

      }
    }

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      if (await this.verifyPassword(loginBody.password, user.password)) {
        const token = await this.jwt.signAsync({
          email: user.email,
          id: user.id
        })
        delete user.password
        return { token, user }
      } else {
        throw new UnauthorizedException("Bad credentials")
      }
    }
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }

  //  Register User
  async register(userBody: any) {
    switch (userBody.role) {
      case 'Customer': {

        /*Check if the user is already present in database, if yes, throw error */
        const checkCustomer = await this.customer.findOne({ where: { email: userBody.email } });

        if (checkCustomer) {

          throw new BadRequestException('Please enter different email');
        } else {
          const customer = new Customer();

          Object.assign(customer, userBody);
          customer.role = UserRoles.Customer;

          this.customer.create(customer); // this will run any hooks present, such as password hashing
          await this.customer.save(customer);

          delete customer.password;
          return customer;
        }
      }

      case 'Vendor': {

        /*Check if the user is already present in database, if yes, throw error */
        const checkVendor = await this.vendor.findOne({ where: { email: userBody.email } });

        if (checkVendor) {
          throw new BadRequestException('Please enter different email');
        } else {
          const vendor = new Vendor();

          Object.assign(vendor, userBody)
          vendor.role = UserRoles.Vendor
          vendor.password = await this.generateHash(userBody.password)

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

  async generateHash(password: string) {
    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const hashedPassword = salt + '.' + hash.toString('hex');
    return hashedPassword;
  }
}
