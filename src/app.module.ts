import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VegetablesModule } from './controllers/vegetables/vegetables.module';
import { VendorModule } from './controllers/vendor/vendor.module';
import { CustomerModule } from './controllers/customer/customer.module';4
import { FruitsModule } from './controllers/fruits/fruits.module';
import { ShopModule } from './controllers/shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ajinkya',
      password: 'mysql',
      database: 'backend',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VegetablesModule,
    VendorModule,
    CustomerModule,
    FruitsModule,
    ShopModule
    // AccessControlModule.forRoles(roles),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
