import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Vendor]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule { }
