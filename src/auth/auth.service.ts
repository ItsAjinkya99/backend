import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>) {
        
    }

    async userLogin(){

    }
    async vendorLogin(){

    }
    async customerLogin(){
        
    }
}
