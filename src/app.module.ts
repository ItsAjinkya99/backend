import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VegetablesModule } from './controllers/vegetables/vegetables.module';
import { VendorModule } from './controllers/vendor/vendor.module';
import { CustomerModule } from './controllers/customer/customer.module';4
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
    VegetablesModule,
    VendorModule,
    CustomerModule,
    FruitsModule,
    ShopModule,
    MulterModule.register({
      dest: "./uploads"
    }),
    VitaminsModule,
    MineralsModule,
    BenefitsModule,
    CategoriesModule,
    OrdersModule,
    ColorModule,
    NoteModule
    // AccessControlModule.forRoles(roles),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
