import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Vendor]),
  JwtModule.register({
    secret:'secretStringThatNoOneCanGuess',
    signOptions:{
      algorithm:'HS512',
      expiresIn:'1d',
    }
  }),
  PassportModule.register({
    defaultStrategy:'jwt'
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule { }
