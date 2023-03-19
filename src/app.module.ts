import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VegetablesModule } from './controllers/vegetables/vegetables.module';
import { VendorModule } from './controllers/vendor/vendor.module';
import { CustomerModule } from './controllers/customer/customer.module';
import { FruitsModule } from './controllers/fruits/fruits.module';
import { ShopModule } from './controllers/shop/shop.module';
import { MulterModule } from '@nestjs/platform-express';
import { VitaminsModule } from './controllers/vitamins/vitamins.module';
import { MineralsModule } from './controllers/minerals/minerals.module';
import { BenefitsModule } from './controllers/benefits/benefits.module';
import { CategoriesModule } from './controllers/categories/categories.module';
import { OrdersModule } from './controllers/orders/orders.module';
import { ColorModule } from './controllers/color/color.module';
import { NoteModule } from './controllers/note/note.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';
import { ResponseHeaders } from './middlewares/ResponseHeaders.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'backend',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..',),
      exclude: ['/api*'],
    }),
    VegetablesModule,
    VendorModule,
    CustomerModule,
    FruitsModule,
    ShopModule,
    MulterModule.register({
      dest: "./uploads"
    }),
    // VitaminsModule,
    // MineralsModule,
    // BenefitsModule,
    // CategoriesModule,
    OrdersModule,
    // ColorModule,
    // NoteModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseHeaders).forRoutes("/")
  }
}

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({ filename: `log/combined-%DATE%.log` }),
  ],
  format: combine(
    label({ label: 'backend' }),
    timestamp(),
    myFormat
  ),

});