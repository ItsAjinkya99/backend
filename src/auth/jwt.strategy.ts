import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Order } from 'src/controllers/orders/entities/order.entity';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { ShopFruits } from 'src/controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from 'src/controllers/shop/entities/shopVegetables.entity';
import { VendorShops } from 'src/controllers/vendor/entities/vendorShop.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {

  user: object;

  constructor(@InjectRepository(User) private readonly repo: Repository<User>,
    private authService: AuthService, private jwt: JwtService) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'secretStringThatNoOneCanGuess',
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        const decodedJwtAccessToken: any = this.jwt.decode(request?.cookies?.Authentication);
        return request?.cookies?.Authentication;
      }]),
    });
  }

  async validate(payload: any, req: Request) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    if (typeof payload.vendorId !== "undefined") {
      const options: DataSourceOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'mysql',
        database: "vendor_db_" + payload.vendorId,
        // autoLoadEntities: true,
        synchronize: true,
        entities: [User, VendorShops, Order, ShopFruits, ShopVegetables]
      };

      const dataSource = new DataSource(options);
      await dataSource.initialize()

      this.authService.setDataSource(dataSource);

      const vendorDB = dataSource.getRepository(User);

      this.user = await vendorDB.createQueryBuilder('Users')
        .addSelect('Users.password')
        // .where('Users.role = :role', { role: payload.role })
        .where('Users.email = :email', { email: payload.email }).getOne();
    } else {
      this.user = await this.repo.findOne({ where: { email: (payload.email) } });
    }

    if (!this.user) {
      throw new BadRequestException('User not found');
    }
    req.user = this.user;

    return req.user;
  }
}