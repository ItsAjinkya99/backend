import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';


export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Customer) private readonly customer: Repository<Customer>) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
    });
  }

  async validate(payload: any, req: Request) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.customer.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;
    return req.user;
  }
}
