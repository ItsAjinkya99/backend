import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Shop } from '../shop/entities/shop.entity';
// import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vendorShop } from './entities/vendorShop.entity';
import { User } from 'src/auth/entities/user.entity';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

@Module({
  controllers: [VendorController],
  imports: [TypeOrmModule.forFeature([User, Shop])
  ],
  providers: [VendorService]
})
export class VendorModule { }

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({ filename: `log/vendor/vendor-%DATE%.log` }),
  ],
  format: combine(
    label({ label: 'backend' }),
    timestamp(),
    myFormat
  ),

});