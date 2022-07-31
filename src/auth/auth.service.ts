import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { UserRoles } from './user-roles';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

  user: any;
  constructor(
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
  ) {

  }

  async login(loginBody: any) {
    switch (loginBody.role) {
      case 'Customer': {
        this.user = await this.customer.createQueryBuilder('customer')
          .addSelect('customer.password')
          .where('customer.email = :email', { email: loginBody.email }).getOne();
        break;
      }

      case 'Vendor': {
        this.user = await this.vendor.createQueryBuilder('vendor')
          .addSelect('vendor.password')
          .where('vendor.email = :email', { email: loginBody.email }).getOne();
        break;
      }

      case 'Admin': {
      }

      case 'VendorUser': {

      }
    }
        if (!this.user) {
          throw new NotFoundException('User not found');
        }

        const [salt, storedHash] = this.user.password.split('.');
        const hash = (await scrypt(loginBody.password, salt, 32)) as Buffer;
        
        console.log(storedHash)
        console.log(hash.toString('hex'))
        
        if (storedHash !== hash.toString('hex')) {
          throw new BadRequestException('Bad password');
        }

        return this.user;

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
          customer.password = await this.generateHash(userBody.password)

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
