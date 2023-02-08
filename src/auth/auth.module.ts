import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Order } from 'src/controllers/orders/entities/order.entity';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { ShopFruits } from 'src/controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from 'src/controllers/shop/entities/shopVegetables.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Shop, Vegetable, Vendor]),
  JwtModule.register({
    secret: 'secretStringThatNoOneCanGuess',
    signOptions: {
      algorithm: 'HS512',
      expiresIn: '1d',
    }
  }),
  PassportModule.register({
    defaultStrategy: 'jwt'
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
